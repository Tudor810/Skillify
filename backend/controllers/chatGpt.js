import mongoose from 'mongoose'
const User = mongoose.model('User');
import openAi from 'openai'

import dotenv from 'dotenv'

dotenv.config()

const Configuration = openAi.Configuration

const openai = new openAi.OpenAIApi(new Configuration({
    apiKey: process.env.API_KEY
}))



const handleChatCompletion = async (res, req, category, type, value, message, secondaryMessage, switchOn) => {

    
    const user = await User.findById(req.userId)
   
    if((user.planType === "Lesson" || user.planType === "Lesson Premium") && type === "lesson")
        user.credits += 2 * value
    else if((user.planType === "Tool" || user.planType === "Tool Premium") && type === "tool")
        user.credits += 2 * value
    else if(user.planType === "Full" || user.planType === "Full Premium")
        user.credits += 2 * value 

    if(user.credits - 2 * value < 0 && !switchOn)
        return res.status(401).json("Insufficient credits, come back tommorow to continue learning")
    
    if((user.planType === "Lesson" || user.planType === "Lesson Premium") && type === "lesson")
        user.credits -= 2 * value
    else if((user.planType === "Tool" || user.planType === "Tool Premium") && type === "tool")
        user.credits -= 2 * value
    else if(user.planType === "Full" || user.planType === "Full Premium")
        user.credits -= 2 * value 
    
    let model

    if(user.planType === "Free" || user.planType === "Lesson" || user.planType === "Tool" || user.planType === "Full")
        model = 'gpt-3.5-turbo-16k'
    else 
        model = "gpt-4"

    if(user.superCredits <= 0 && switchOn && user.planType !== "Lesson Premium" && user.planType !== "Tool Premium" && user.planType !== "Full Premium")
        return res.status(401).json("Insufficient super credits, upgrade your plan to get unlimited")
    
    if(switchOn)
    {
        model = "gpt-4"
    }
        
        
    try {
      const completion = await openai.createChatCompletion({
          model: model,
          messages:[
              {role: "system", content: secondaryMessage},
              {role:"user", content: message}
          ],     
          stream: true,
      }, { responseType: 'stream' })

  const stream = completion.data;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Transfer-Encoding', 'chunked');

  stream.on('data', (chunk) => {
    const payloads = chunk.toString().split("\n\n");
    for (const payload of payloads) {
      if (payload.includes('[DONE]')) return;
      if (payload.startsWith("data:")) {
        try {
          const data = JSON.parse(payload.replace("data: ", ""));
          const chunk = data.choices[0].delta?.content;
          if (chunk) {
              res.write(chunk)
          }
        } catch (error) {
           
          console.log(`Error with JSON.parse and ${payload}.\n${error}`);  
        }
      }
    }
  });

  stream.on('end', async () => {

    try {
        
        
        user.credits -= 2 * value

        if((user.planType === "Lesson" || user.planType === "Lesson Premium") && type === "lesson")
            user.credits += 2 * value
        else if((user.planType === "Tool" || user.planType === "Tool Premium") && type === "tool")
            user.credits += 2 * value
        else if(user.planType === "Full" || user.planType === "Full Premium")
            user.credits += 2 * value    
        
        if(switchOn && user.planType !== "Lesson Premium" && user.planType !== "Tool Premium" && user.planType !== "Full Premium")
            user.superCredits --;
        await user.save()
        
        res.end()
    } catch (err) {
        console.log(err);
        res.end()
    }
    setTimeout(() => {
      console.log('\nStream done');
      res.end()
    }, 10);
  });

  stream.on('error', (err) => {
    console.log(err);
    res.status(500).json("Something went wrong, if the problem persists please contact us");
  });
  } catch (err) {
  console.log(err);
  res.status(500).json("Something went wrong, if the problem persists please contact us");
  }
}


const chat = (req, res) => {

    const {message, skill, userLanguage, category, prevMessages} = req.body

    console.log(prevMessages);

    const secondaryMessage = `You are ${skill} teacher and these ${prevMessages.map(item => item.role === "User" ? `User message:${item.message}` : `Teacher message:${item.message}`)} are previous messages in the same conversation`

    const sendMessage = message + `Please respond in the following language: ${userLanguage}`
    handleChatCompletion(res, req, category, "lesson", 10, sendMessage, secondaryMessage)
   
}

const lesson = (req, res) => {

    const {skill, level, numberOfLessons, specification, userLanguage, category} = req.body

    const message = `Write ${numberOfLessons} lessons in order for me to learn ${specification ? `${specification} included in ${skill}` : skill} 
P.S. I am a ${level}, make sure the lessons don't contain the same information, 
don't go over the ${numberOfLessons} and provide ONLY the titles of the lessons WITHOUT any extra information in the format: Lesson 1: 
Please provide the lessons in the following language: ${userLanguage}`

    const secondaryMessage = `You are a ${category} teacher specialized in ${skill}`

    handleChatCompletion(res, req, category, "lesson", 50, message, secondaryMessage )
    
}

const lessonContent = (req, res) => {
    const {skill, specification, level, title, userLanguage, category, switchOn} = req.body

    const message = `Generate a lesson with the Title ${title} in order for me to learn ${specification ? `${specification} included in ${skill}` : skill} 
    I am a ${level}
    , make the lesson as detailed as possible, explain everything step-by-step( instead of step 1 name it part 1 and so on) 
    and provide 10 tips and 10 resources at the end
    Include everything you know about this topic and make it simple to understand and learn from it
    P.S: Bold all the key words/expressions and titles that might need further explanaiton using ** and write all math or code examples using ${"```"}
Please provide the lesson in the following language: ${userLanguage}`
    

    const secondaryMessage = `You are an expert at ${skill} in ${specification}`


   handleChatCompletion(res, req, category, "lesson", 100, message, secondaryMessage, switchOn)
}


const essayOutline = (req, res) => {
    const { number, essayPrompt, userLanguage, category} = req.body

    const message = `Write an essay outline about ${essayPrompt}, the outline should contain ${number} 
paragraphs from which one introduction and one conclusion 
P.S. write a very well structured essay plan, Make it as detailed as you can
Please provide the outline in the following language: ${userLanguage}`
    
    const secondaryMessage = "You are a master at writing essays and a skilled teacher"
    handleChatCompletion(res, req, category, "tool", 50, message, secondaryMessage)
}

const essay = (req, res) => {
  const { number, essayPrompt, outline, userLanguage, category, switchOn} = req.body

  const message = `Expand the ${outline} and write a thoroughly, detailed essay
  The essay prompt is ${essayPrompt} and it needs to contain ${number} paragraphs from which one introduction and one conclusion 
  Please provide the essay in the following language: ${userLanguage}`

  const secondaryMessage = "You are a master at writing essays and a skilled teacher"

  handleChatCompletion(res, req, category, "tool", 0, message, secondaryMessage, switchOn)
}

const bookSummary = (req, res) => {
    const {bookTitle, authorName, userLanguage, length, category, switchOn} = req.body

  const message = `Write a ${length} summary for the book ${bookTitle} writen by ${authorName}

  Please provide the summary in the following language: ${userLanguage}`


  const secondaryMessage = "You are a librarian knowing all the books"

  handleChatCompletion(res, req, category, "tool", 100, message, secondaryMessage, switchOn)
}

const tests = (req, res) => {
    const  {userLanguage, subject, level, moreInfo, category} = req.body

    const message = `Provide 10 exercises for me to revise ${moreInfo} in ${subject}
    P.S: I am in the grade ${level}, the question should follow the format: Question 1:, the exercise needs to be on the same line
    Please provide the test in the following language: ${userLanguage}`

    const secondaryMessage = "You are a skilled examinator"
    handleChatCompletion(res, req, category, "tool", 50, message, secondaryMessage)
}

const answear = (req, res) => {
    const {title, userLanguage, category, switchOn} = req.body

    const message = `Provide the answear for the following question ${title}, with a detailed explanation
    Please provide the answear in the following language: ${userLanguage}`
    
    const secondaryMessage = "You are great teacher and can explain anything"

    handleChatCompletion(res, req, category, "tool", 100, message, secondaryMessage, switchOn)
}

const completion = (req, res) => {
    const {userLanguage, description, language, category, switchOn} = req.body

    const message = `Generate code in ${language} that ${description}, also provide comments so the code is easy to understand
    Write all code inside a code block 
    Provide the comments in the following language: ${userLanguage}`

    const secondaryMessage = `You are a coding expert specialized in ${language}`
    handleChatCompletion(res, req, category, "tool", 100, message, secondaryMessage, switchOn)
}

const revision = (req, res) => {
    const { userLanguage, description, language, code, category, switchOn} = req.body 

    const message = `This is my ${language} code: ${code}, that is supposed to ${description}, but it is not working
    
    Please revise the code and change it in order for it to work, also provide comments so the code is easy to understand
    Write all code using a code block with ${"```"}
    Provide the comments in the following language: ${userLanguage}`

    const secondaryMessage = `You are a coding expert specialized in ${language}`

    handleChatCompletion(res, req, category, "tool", 100, message, secondaryMessage, switchOn)
}

const email = (req, res) => {
    
    const {from, to, value, help, userLanguage, words, category, switchOn} = req.body

    const message = `Generate an email from ${from}, to ${to} offering ${value}, also mention in the email ${help}
    P.S: be polite, profesional while writing it, make sure the email has around ${words} words
    Provide the email in the following language: ${userLanguage}`

    const secondaryMessage = "You are great with words"
    handleChatCompletion(res, req, category, "tool", 100, message, secondaryMessage, switchOn)
}

const businessSteps = (req, res) => {
    const {userLanguage, information, category, switchOn} = req.body

    const message = `Create a step by step business plan for ${information}
    P.S: It is a startup, make is as detailed as you can, with  resourses
    Provide the plan in the following language: ${userLanguage}`

    const secondaryMessage = "You are a rich entrepreneur"
    handleChatCompletion(res, req, category, "tool", 100, message, secondaryMessage, switchOn)
}


const allRecipes = (req, res) => {

    const {ingredients, userLanguage, foodOrDrink, category} = req.body

    let message
    let secondaryMessage

    if(foodOrDrink === "Food")
    {
        message = `Write 10 dishes I can cook using ${ingredients}, the recipe doesn't need to include all the ingredients
        Write ONLY the dishes name without any other information in the following format Recipe 1:
        Provide the recipes in the following language: ${userLanguage}`
        secondaryMessage = "You are a master chef"
    }  
    else 
    {
         message = `Write 10 drink I can make using ${ingredients}, the drink doesn' need to include all the ingredients
         Write ONLY the drink name without any other information in the following format Drink 1:
         Provide the drinks in the following language: ${userLanguage}`
         secondaryMessage = "You are a master bartender"
    }
       

    handleChatCompletion(res, req, category, "tool", 50, message, secondaryMessage)
}

const recipe = (req, res) => {
    const {title, userLanguage, foodOrDrink, category, switchOn} = req.body

    let message 
    let secondaryMessage
    if(foodOrDrink === "Food")
    {
        message = `Describe how to cook ${title} as detailed as possible, with resourses so I can learn faster, provide some tips
        P.S: Provide the cooking in the following language: ${userLanguage}`
        secondaryMessage = "You are a master chef"
    } else 
    {
        message = `Describe how to make ${title} as detailed as possible, with resourses so I can learn faster, provide some tips
        P.S: Provide the process in the following language: ${userLanguage}`
        secondaryMessage = "You are a master bartender"
    }


    handleChatCompletion(res, req, category, "tool", 100, message, secondaryMessage, switchOn)
}

const chef = (req, res) => {
    const {recipeName, restrictions, preferences, foodOrDrink, userLanguage, category, switchOn} = req.body
    
    let message
    let secondaryMessage

    if(foodOrDrink === "Food")
    {
        message = `Explain step by step how to cook ${recipeName}, with detailed explanations and include weight for all ingredients
        P.S: I am alergic at ${restrictions}, and I preffer ${preferences} and provide the recipe in the following language: ${userLanguage}`
        secondaryMessage = "You are a master chef"
    }
    else 
    {
        message = `Explain step by step how to make ${recipeName}, with detailed explanations, and include volume for all ingredients
        P.S: I am alergic at ${restrictions}, nd I preffer ${preferences} and provide the recipe in the following language: ${userLanguage}`
        secondaryMessage = "You are a master bartender"
    }
    
    handleChatCompletion(res, req, category, "tool", 100, message, secondaryMessage, switchOn)

}

const split = (req, res) => {

    const {userLanguage, days, focus, number, muscle, type, moreInfo, category, switchOn} = req.body

    let message;

    if(type === "weekly" || type === "")
    {
        if(focus === 'lower body')
        {
            if(days === 3)
            {
                message = `Generate a gym split for me. I want to go to the gym ${days} days, so the rest will be rest days.
                Include 2 leg days and 1 full body day, include cardio everyday and abs
                P.S: ${moreInfo} and provide the split in the following language: ${userLanguage}`
            }
            else if(days === 4)
            {
                message = `Generate a gym split for me. I want to go to the gym ${days}, so the rest will be rest days.
                Include 2 leg days, 1 push day and 1 pull day include cardio everyday and abs
                P.S: ${moreInfo} and provide the split in the following language: ${userLanguage}`
            } 
        }
        else 
        {
            if(days === 3)
            {
                message = `Generate a gym split for me. I want to go to the gym ${days} days, so the rest will be rest days.
                Include 1 push day, 1 pull day, 1 leg day (PPL), include cardio everyday and abs
                P.S: ${moreInfo} and provide the split in the following language: ${userLanguage}`
            } else if(days === 4)
            {
                message = `Generate a gym split for me. I want to go to the gym ${days} days, so the rest will be rest days.
                Include 3, upper body days, structured on push, pull and arms days, upper body days and 1 leg day, include cardio everyday and abs
                P.S: ${moreInfo} and provide the split in the following language: ${userLanguage}`
            } else {
                message = `Generate a gym split for me. I want to go to the gym ${days} days, so the rest will be rest days.
                Include ${days - 2} upper body days, structured on push, pull and arm days, and 2 leg days, include cardio everyday and abs
                P.S: ${moreInfo} and provide the split in the following language: ${userLanguage}`
            }
        }
    } else {
        message = `Generate ${number} exercises for training ${muscle}, also explain how the exercises are done
        P.S: ${moreInfo} and provide the exercises in the following language: ${userLanguage}`
    } 
   

    const secondaryMessage = "You are personal gym trainer"
    handleChatCompletion(res, req, category, "tool", 100, message, secondaryMessage, switchOn)
}

const diet = (req, res) => {
    const {userLanguage, weight, height, reason, moreInfo, category, switchOn} = req.body

    const message = `Generate a heathy diet for me, include something for everyday so it won't repeat it's meals, the diet should be for 7 days if a day time is not specified
    I'm ${height}m tall and I weight ${weight}kg and I want ${reason}, please include the Weight for each ingredient and the nutritional facts for every meal
    P.S: ${moreInfo} and provide the diet in the following language: ${userLanguage}`

    const secondaryMessage = "You are specialized nutrionist"
    handleChatCompletion(res, req, category, "tool", 100, message, secondaryMessage, switchOn)
}

const allStreching = (req, res) => {
    const {muscle, number, userLanguage, category} = req.body

    const message = `I just trained my ${muscle} tell me ${number} streching or recovery exercies
    Please provide ONLY the name of the exercise in the format: Exercise 1:
    P.S: Provide the exercises names in the following format: ${userLanguage}`

    const secondaryMessage = `You are a personal trainer`

    handleChatCompletion(res, req, category, "tool", 50, message, secondaryMessage)
}

const streching = (req, res) => {
    const {title, userLanguage, period, moreInfo, category, switchOn} = req.body

    const message = `Explain how ${title} exercise is done in a detailed step by step plan, the exercise should be done in ${period}
    P.S: ${moreInfo} and prove the exercise explanaition in the following language: ${userLanguage}`

    const secondaryMessage = `You are a personal trainer`

    handleChatCompletion(res, req, category, "tool", 100, message, secondaryMessage, switchOn)
}

const sportEquipment = (req, res) => {
    const {sport, age, size, level, budget, moreInfo, userLanguage, category, switchOn} = req.body

    const message = `Please provide the needed equipment for ${sport} with details about it, I am ${age} years old, with a size of ${size}
I'm a ${level} and my budget is ${budget}. Provide at least 15 equipments, also include an aproximated price for each equipment .
P.S: ${moreInfo} and provide the equipment in the following language: ${userLanguage}`

    const secondaryMessage = `You are an expert at equipment for ${sport}`

    handleChatCompletion(res, req, category, "tool", 100, message, secondaryMessage, switchOn)
}

const exercises = (req, res) => {
    const {sport, level, userLanguage, moreInfo, time, category, switchOn} = req.body

    const message = `Generate a training plan for me to improve at ${sport} with details for each exercise, provide at least 10 exercises I am a ${level} and I want to spend ${time} daily for practice
    P.S: ${moreInfo} and provide the training plan in the following language: ${userLanguage}`

    const secondaryMessage = `You are an expert at ${sport}`

    handleChatCompletion(res, req, category, "tool", 100, message, secondaryMessage, switchOn)
}

const practiceFighting = (req, res) => {
    const {sport, level, userLanguage, moreInfo, time, category, switchOn} = req.body

    const message = `Generate a training plan for me to improve at ${sport} with details for each exercise, provide at least 10 exercises I am ${level} and I want to spend ${time} daily for practice
    P.S: ${moreInfo} and provide the training plan in the following language: ${userLanguage}`

    const secondaryMessage = `You are an expert at ${sport}`

    handleChatCompletion(res, req, category, "tool", 100, message, secondaryMessage, switchOn)
}

const fightEquipment = (req, res) => {
    const {sport, age, size, level, budget, moreInfo, userLanguage, category, switchOn} = req.body

    const message = `Please provide the needed equipment for ${sport} with details about it, I am ${age} years old, with a size of ${size}
I'm a ${level} and my budget is ${budget}. Provide at least 15 equipments, also include an aproximated price for each equipment .
P.S: ${moreInfo} and provide the equipment in the following language: ${userLanguage}`

    const secondaryMessage = `You are an expert at equipment for ${sport}`

    handleChatCompletion(res, req, category, "tool", 100, message, secondaryMessage, switchOn)
}

const survivalEquipment = (req, res) => {
    const {trip, age, size, period, budget, moreInfo, userLanguage, category, switchOn} = req.body

    const message = `Please provide the needed equipment for a ${trip} that takes ${period} days with details about the needed equipment, I am ${age} years old, with a size of ${size}
    and my budget is ${budget}. Provide at least 15 equipments, including food and drinks, also include an aproximated price for each equipment 
    P.S: ${moreInfo} and provide the equipment in the following language: ${userLanguage}`
    
    const secondaryMessage = `You are an expert at survival skills and at ${trip}`

    handleChatCompletion(res, req, category, "tool", 100, message, secondaryMessage, switchOn)
}

const survive = (req, res) => {
    const {situation, userLanguage, category, switchOn} = req.body

    const message = `I am in the following situatuin: ${situation}, what should I do to survive, provide a detailed survival plan with steps and guidelines,
    P.S: Provide the survival plan in the following language: ${userLanguage}`

    const secondaryMessage = `You are survival skills expert`

    handleChatCompletion(res, req, category, "tool", 100, message, secondaryMessage, switchOn)
}

const practice = (req, res) => {
    const {videoGame, rank, period, moreInfo, userLanguage, category, switchOn} = req.body

    const message = `Generate a very detailed, step-by-step training plan for improving at ${videoGame}, I have the rank: ${rank},
    I want to spend ${period} daily P.S: ${moreInfo} and Provide the training plan in the following language: ${userLanguage}`
    
    const secondaryMessage = `You are a professional gamer, with the max rank in ${videoGame}`

    handleChatCompletion(res, req, category, "tool", 100, message, secondaryMessage, switchOn)
}

const level = (req, res) => {
    const {videoGame, difficulty, level, moreInfo, userLanguage, category, switchOn} = req.body

    const message = `Generate a detailed way for me to pass ${level} in ${videoGame}, I'm playing on the difficulty ${difficulty}
    Provide some tips at the end
    P.S: ${moreInfo} and provide the way in the following language: ${userLanguage}`

    const secondaryMessage = "You are a professional gamer"

    handleChatCompletion(res, req, category, "tool", 100, message, secondaryMessage, switchOn)
}

const description = (req, res) => {
    const {post, hashtags, length, userLanguage, category, switchOn} = req.body

    const message = `Generate a description in ${length} words, not including the hashtags, for my social media post, the post is about ${post} 
    Please use relevant ${hashtags} hashtags and provide 5 different possible descriptions 
    P.S: Provide the description in the following language: ${userLanguage}`

    const secondaryMessage = `You are an influencer, specialized in writing thoroughly posts description`

    handleChatCompletion(res, req, category, "tool", 100, message, secondaryMessage, switchOn)
}

const posts = (req, res) => {
    const {content, followers, moreInfo, userLanguage, postsDay, category, switchOn} = req.body

    const message = `Generate a posting plan, that is at least one week long, on social media for my ${content} page with ${followers} followers, I want to post ${postsDay} videos a day, make sure to include and describe every video as detailed as you can 
    P.S: ${moreInfo} and provide the plan in the following language: ${userLanguage}`

    const secondaryMessage = 'You are an influencer with 100M followers on social media'

    handleChatCompletion(res, req, category, "tool", 100, message, secondaryMessage, switchOn)
}
 

const icebreakers = (req, res) => {
    const {situation, age, intention, gender, otherGender, moreInfo, userLanguage, category} = req.body

    const message = `Generate 10 possible icebreakers for this situation: ${situation} I'm a ${age} years old ${gender}, the person I'm talking to is a ${otherGender}
    My intention is ${intention}, try to be charming and use some humor, provide the icebreakers in the following format: Icebreaker 1: 
    P.S.${moreInfo}, provide the icebreakers in the following language: ${userLanguage}`

    const secondaryMessage = 'You are an expert in social skills'

    handleChatCompletion(res, req, category, "tool", 50, message, secondaryMessage)
}

const icebreakerContent = (req, res) => {
    const {title, userLanguage, category, switchOn} = req.body

    const message = `I started a conversation using ${title}, what is a possible way to continue that conversation explain all the steps
    P.S. Provide the continuation in the following language: ${userLanguage}`

    const secondaryMessage = "You are an expert in social skills"

    handleChatCompletion(res, req, category, "tool", 100, message, secondaryMessage, switchOn)
}
const message = (req, res) => {
    const {situation, age, intention, gender, otherGender, moreInfo, userLanguage, category, switchOn} = req.body
    
    const message = `Generate 10 possible instagram dms with in maximum 25 words for this situation: ${situation} I'm ${age} years old ${gender}, the person I'm talking to is a ${otherGender}
    My intention is ${intention}, try to be more charming and use some humor, after each dm leave an empty line
    P.S.${moreInfo}, provide the message in the following language: ${userLanguage}`

    const secondaryMessage = "You are an expert in social skills"

    handleChatCompletion(res, req, category, "tool", 100, message, secondaryMessage, switchOn)
}

const habits = (req, res) => {
    const {intention, age, habit, period, moreInfo, userLanguage, category, switchOn} = req.body

    let message 
    const secondaryMessage = "You are an expert at self improvement"

    if(intention === "Obtain good habit")
        message = `Generate a step-by-step very detailed plan for me to start ${habit} in ${period} days, I'm ${age} years old
        Also write possible ways to keep me motivated and don't give up
        P.S: ${moreInfo} and provide the plan in the following language: ${userLanguage}` 
    else 
        message = `Generate a step-by-step very detailed plan for me to stop ${habit} in ${period} days, I'm ${age} years old
        Also write possible ways to keep me motivated and don't give up
        P.S: ${moreInfo} and provide the plan in the following language: ${userLanguage}` 

    handleChatCompletion(res, req, category, "tool", 100, message, secondaryMessage, switchOn)
}

const allBooks = (req, res) => {
    const {learn, moreInfo, userLanguage, category} = req.body

    const message = `Write me 10 different books I could read in order for me to improve ${learn}
    Write ONLY the book titles in the following format: Book 1: 
    P.S: ${moreInfo} and provide the books in the following language: ${userLanguage}`

    const secondaryMessage = "You are a librarin with knowledge about all books"

    handleChatCompletion(res, req, category, "tool", 50, message, secondaryMessage)
}

const bookDescription = (req, res) => {
    const {title, userLanguage, category, switchOn} = req.body

    const message = `Write a short to medium length summary for the book ${title}, also explain why I would want to buy that book
    Provide the summary in the following language: ${userLanguage}`

    const secondaryMessage = "You are a librarin with knowledge about all books"

    handleChatCompletion(res, req, category, "tool", 100, message, secondaryMessage, switchOn)
}

const allYoga = (req, res) => {
    const {number, level, moreInfo, userLanguage, category} = req.body

    const message = `Generate ${number} of yoga exercises for a ${level}
    Provide only the exersice name in the following format: Exercise 1:
    P.S: ${moreInfo} and provide the exercises in the following language: ${userLanguage}`

    const secondaryMessage = "You are a yoga expert"

    handleChatCompletion(res, req, category, "tool", 50, message, secondaryMessage)

}

const yoga = (req, res) => {
    const {title, userLanguage, category, switchOn} = req.body

    const message = `Provide a step by step detailed explanation on how to do the following yoga exercise ${title}, make it easy to understand 
    and provide some tips
    P.S: Provide the explanation in the following language: ${userLanguage}`

    const secondaryMessage = "You are a yoga expert"

    handleChatCompletion(res, req, category, "tool", 100, message, secondaryMessage, switchOn)
}

const meditation = (req, res) => {
    const {time, level, moreInfo, userLanguage, category, switchOn} = req.body

    const message = `Generate a detailed step by step plan on how to meditate each day for ${time} minutes, I'm a ${level}
    P.S: ${moreInfo} and provide the meditation plan in the following language: ${userLanguage}`

    const secondaryMessage = "You are an expert at meditating"

    handleChatCompletion(res, req, category, "tool", 100, message, secondaryMessage, switchOn)
}

const homework = (req, res) => {
    const {level, skill, userLanguage, specification, category, switchOn} = req.body

    const message = `provide 10 exercises for me to revise ${specification ? `${specification} included in ${skill}` : skill} , I am a ${level}
Please provide all the answers at the end
P.S: Provide the homework in the following language: ${userLanguage}`

    const secondaryMessage = `You are a personal teacher specialized in ${category}, with experience in ${specification ? `${specification} included in ${skill}` : skill}`
    
    handleChatCompletion(res, req, category, "lesson", 100, message, secondaryMessage, switchOn)
}

const flashcards = (req, res) => {
    const {level, skill, userLanguage, specification, category, switchOn} = req.body

    const message = `Generate 10 multiple answears questions for me to revise ${specification ? `${specification} included in ${skill}` : skill}, I'm a ${level}
    Make sure to always give 3 possible answears, and also mention the correct one
    Please provide the questions and the answears in the following format: Question 1: \n Answear 1: \n Anwear 2: \n Answear 3: \n Correct answear is: 
    P.S: Provide the flashcards in the following language: ${userLanguage}`
    
    const secondaryMessage = `You are a personal teacher specialized in ${category}, with experience in ${specification ? `${specification} included in ${skill}` : skill}`

    handleChatCompletion(res, req, category, "lesson", 100, message, secondaryMessage, switchOn)
}

const testLesson = (req, res) => {
    const {level, skill, userLanguage, specification, category, switchOn} = req.body

   
    const message = `write a test including 9 exercises based on ${specification ? `${specification} included in ${skill}` : skill} , I am a ${level}
Please make sure you provide all the answers at the end, don't make a multiple choice test P.S: Provide the test in the following language: ${userLanguage}`

    const secondaryMessage = `You are a personal teacher specialized in ${category}`

    handleChatCompletion(res, req, category, "lesson", 100, message, secondaryMessage, switchOn)
}

const getDefinition = (req, res) => {
    const {word, lesson, category, userLanguage} = req.body


    const message = `Provide a clear, concise, easy to understand explanation for ${word.split(" ").length === 1 ? "the word" : "the expression"} ${word} in 50 words maximum, 
    this comes from a lesson that tries to teach you ${lesson} 
    P.S: Provide the definition in the following language: ${userLanguage} `

    const secondaryMessage = `You are a personal teacher specialized in ${category}`

    handleChatCompletion(res, req, category, "lesson", 0, message, secondaryMessage)
}

const getDocumentSummary = (req, res) => {
    const {transcript, userLanguage, category, switchOn, type} = req.body

    let message = ""
    if(type === summary)
        message = `Generate a summary for this text(I want to learn from it): ${transcript}
        Divide the summary in parts, including the most important things and significant details. 
        P.S: PROVIDE the answear in the following language: ${userLanguage}`
    else 
        message = `Generetate a lesson using this text: ${transcript} 
            please define everything as detailed as possible and divide the lessons in parts, 
            make it as easy to learn as you can by explaining every aspect very detailed, also include examples
            P.S: PROVIDE the answear in the following language: ${userLanguage}`

    const secondaryMessage = `Act like a private tutor teaching me this subject`

    handleChatCompletion(res, req, category, "tool", 100, message, secondaryMessage, switchOn)
}

const explanationFlashcard = (req, res) => {
    const {question, answear, correct, userLanguage} = req.body

    const message = ` ${answear !== correct ? `Explain why this answear ${answear} is wrong for the following question ${question}
    and then explain why the answear ${correct} is the correct one` : `explain why the answear ${correct} is the correct one for the following question: `} 
   make it easy to understand and to learn from IN 25-50 words
    P.S: PROVIDE the explanation in the following language: ${userLanguage}`

    const secondaryMessage = `You are a great teacher`

    handleChatCompletion(res, req, "school","lesson", 0, message, secondaryMessage, false)
}

export {
    chat,
    lesson,
    lessonContent,
    essayOutline,
    essay,
    bookSummary,
    tests,
    answear,
    revision,
    completion,
    email,
    businessSteps,
    recipe,
    allRecipes,
    split,
    diet,
    sportEquipment,
    exercises,
    survivalEquipment,
    survive,
    chef,
    practice,
    level,
    description,
    posts,
    message,
    icebreakers,
    icebreakerContent,
    habits,
    allBooks, 
    bookDescription,
    streching,
    allStreching,
    allYoga, 
    yoga,
    meditation,
    homework, 
    flashcards,
    testLesson,
    practiceFighting,
    fightEquipment,
    getDefinition,
    getDocumentSummary,
    explanationFlashcard
}