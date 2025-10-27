import Lesson from '../models/lesson.js'
import Plan from '../models/plan.js'

const saveLesson = async (req, res) => {

    const {title, category, lessonOrTool, chapters, content, level, homework, test, flashcards} = req.body
    
    let testTitle = title
    try {
        let lesson = await Lesson.findOne({title: title, user: req.userId})
        let counter = 1;
        
        while(lesson)
        {
            counter++;
            testTitle = title + ' ' + counter
            lesson = await Lesson.findOne({title: testTitle, user: req.userId})
        }
            
    } catch(err) {
        res.status(500).json({succes: false, error: err})  
    }

    try {
        const lesson = await Lesson.findOne({chapters: chapters})

        if(lesson)
        {
            lesson.content = [...content]
            
            lesson.homework = homework
            lesson.test = test
            lesson.flashcards = [...flashcards]
    
            await lesson.save()

            return res.status(200).json({succes: true})
        }
        else 
        {
            const newLesson = new Lesson({
                title: testTitle,
                homework: homework,
                flashcards: flashcards,
                test: test,
                level: level,
                category: category,
                type: lessonOrTool,
                chapters: chapters,
                content: content,
                user: req.userId
            })
        
            try {
                await newLesson.save()
                return res.status(200).json({succes: true})
            } catch (err) {
                return res.status(500).json({succes: false, error: err})  
            }
        }
    } catch (err) {
        res.status(500).json({succes: false, error: err})  
    }
       
}

const getLessonTitles = async (req, res) => {

    const category = req.query.category

    try {
        const lessons = await Lesson.find({category: category, user: req.userId, type: "lesson"})
        
        const lessonsTitle = lessons.map(item => item.title)

        res.status(200).json({succes: true, lessons: lessonsTitle})
    } catch (err){
        res.status(500).json({succes: false, err: err})
    }

}

const getLessonNumber = async (req, res) => {
    try {
    

        const lessons = await Lesson.find({user: req.userId})

    
        let categoryCounts = {}
        for (const item of lessons) {
            const category = item.category;
            if (categoryCounts[category]) {
              categoryCounts[category]++;
            } else {
              categoryCounts[category] = 1;
            }
          }
          
          console.log(categoryCounts);

          res.status(200).json({succes: true, categoryCounts: categoryCounts})
    } catch (err) {
        console.log(err);
        res.status(500).json({succes: false, err: "Something went wrong"})
    }
}
const getLesson = async (req, res) => {
    
    const title = req.query.title

    try {
        const lesson = await Lesson.findOne({title: title, user: req.userId})
        

        if(!lesson)
            return res.status(404).json({succes: false, err: "Can't find lesson"})
        
        if(lesson.type === "lesson")
        {
            const secondaryLesson = {homework: lesson.homework, test: lesson.test, flashcards: lesson.flashcards, level: lesson.level}
            return res.status(200).json({succes: true, content:lesson.content, chapters: lesson.chapters, secondaryLesson: secondaryLesson, type: lesson.type })
        } else if(lesson.toolType === "Long")
        {
            return res.status(200).json({succes: true, content:lesson.content, chapters: lesson.chapters, type:lesson.type, toolType: lesson.toolType})
        } else 
        {
            return res.status(200).json({succes: true, chapters:lesson.chapters, type: lesson.type, toolType: lesson.toolType})
        }
            
    } catch (err){
        res.status(500).json({succes: false, err: err})
    }
}

const editLesson = async (req, res) => {
        const {title, content, homework, test, flashcards} = req.body


        try {
            const lesson = await Lesson.findOne({title: title})
            

            lesson.content = [...content]
            
            lesson.homework = homework
            lesson.test = test
            lesson.flashcards = [...flashcards]


            await lesson.save()

            res.status(200).json({succes: true})
        } catch (err){
            res.status(500).json({succes: false, err: err})
        }
}

const editTool = async (req, res) => {
    const {title, content} = req.body

    try {
        let tool
        if(title)
            tool = await Lesson.findOne({title: title})

        if(title && content)
        {
            tool.content = [...content]
            await tool.save()
        }
            

        res.status(200).json({succes: true})
    } catch (err){
        res.status(500).json({succes: false, err: err})
    }
}

const saveTool = async (req, res) => {
    const {title, category, lessonOrTool, chapters, content} = req.body
    
    let testTitle = title
    
    try {
        let tool = await Lesson.findOne({title: title, user: req.userId})
        let counter = 1;
        
        while(tool)
        {
            counter++;
            testTitle = title + ' ' + counter
            tool = await Lesson.findOne({title: testTitle, user: req.userId})
        }
            
    } catch(err) {
        res.status(500).json({succes: false, error: err})  
    }
    
    let newTool;

    try {
        if(content)
        {   
            const tool = await Lesson.findOne({chapters: chapters})

            if(tool) 
            {
                tool.content = [...content]
                await tool.save()

                return res.status(200).json({succes: true})

            } else {
                newTool = new Lesson({
                    title: testTitle,
                    category: category,
                    type: lessonOrTool,
                    chapters: chapters,
                    content: content,
                    user: req.userId,
                    toolType: "Long"
                })

                await newTool.save()
                return res.status(200).json({succes: true})
            }
        } else 
        {   
            newTool = new Lesson({
                title: testTitle,
                category: category,
                type: lessonOrTool,
                chapters: chapters,
                user: req.userId,
                toolType: "Short"
            })
            await newTool.save() 
            return res.status(200).json({succes: true})   
        } 
    } catch (err) {
        return res.status(500).json({succes: false, err: err})
    }

}
    



const getToolTitles = async (req, res) => {
    const category = req.query.category

    try {
        const tools = await Lesson.find({ user: req.userId, category: category, type: "tool"})
        
        const toolsTitle = tools.map(item => item.title)

        res.status(200).json({succes: true, tools: toolsTitle})
    } catch (err){
        res.status(500).json({succes: false, err: err})
    }
}

const getPlanTitles = async (req, res) => {
    

    try {
        const plans = await Plan.find({user: req.userId})
        
        const plansTitle = plans.map(item => item.skill)

        res.status(200).json({succes: true, plans: plansTitle})
    } catch (err){
        res.status(500).json({succes: false, err: err})
    }

}

const deleteLesson = async (req, res) => {
    const {category, title} = req.query

    try {
        await Lesson.findOneAndDelete({category: category, title: title})

        await Plan.findOneAndDelete({title: title})

        return res.status(200).json({succes: true})
    } catch (err) {
        console.log(err);
        return res.status(500).json({succes: false, err: err})
    }
}

export {
    saveLesson,
    saveTool,
    getLesson,
    getLessonTitles,
    editLesson,
    getToolTitles,
    editTool,
    getPlanTitles,
    deleteLesson,
    getLessonNumber
}