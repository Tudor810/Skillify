import React, {useState} from 'react'
import {FormControl, InputLabel, MenuItem, Select, TextField} from '@mui/material'
import {createTheme, ThemeProvider} from '@mui/material' 
import TextArea from '../TextArea'
import { selectStyle} from '../../../home/data';


export default function Recipe({recipes, placeholder, handleChange, userLanguage, category, changeValue, foodOrDrink, handleFoodOrDrinkChange, subtractCredits, categories, planType, toggleSaved, width, setCookie}) {


    const [ingredients, setIngredients] = useState("")
   
    const [error, setError] = useState("")
    const [writing, setWriting] = useState(false)


    const example =   
    `900 g potatoes
sunflower oil , for deep-frying
225 g white fish fillets , skin off, pin-boned, from sustainable sources
225 g plain flour , plus extra for dusting
285 ml cold beer
3 heaped teaspoons baking powder
MUSHY PEAS
a few sprigs of fresh mint
1 knob of unsalted butter
4 handfuls of podded peas
½ a lemon`

    const theme = createTheme({
        components: {
          MuiTextField: {
            styleOverrides: {
              root: {
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(255, 255, 255, 0.3)', // Customize the border color
                  },
                  '&:hover fieldset': {
                    borderColor: 'var(--primary-color)', // Customize the active border color on hover
                  },
                  '&.Mui-focused fieldset': {
                    borderColor:'var(--primary-color)' // Customize the active border color
                  },
                },
              },
            },
          },
        },
      });

      
  const generateRecipes = async () => {
    if(writing === true) return 

    changeValue("")
    setWriting(true)
    setError("")

    if(ingredients.trim() === "") 
    {
      setError("You need to provide your ingredients")
      setWriting(false)
      return
    } else if(foodOrDrink === "")
    {
      setError("You need to specify if you want a food or a drink")
      setWriting(false)
      return
    }

    try {
      const resp = await fetch("https://api.skillify-ai.com/chatgpt/all-recipes", {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({ category: category,
          skill: category,
          ingredients: ingredients,
          foodOrDrink: foodOrDrink,
          userLanguage: userLanguage
        }), 
        headers: {
          "Content-Type": "application/json"
        },
      }) 
      const reader = resp.body.getReader()
  
      let recipeTitles = ""
      const processStream = async () => {
        const { done, value } = await reader.read();
    
        if (done) {
          setCookie("recipes", JSON.stringify({titles: recipeTitles, content: [], open: []}))
          setWriting(false)
          toggleSaved()
          if(categories.includes(category))
            return
          else if(planType === "Tool" || planType === "Full")
            return
          else
            subtractCredits(50)
         
          return;
        }
  
        const chunk = new TextDecoder().decode(value);
        recipeTitles += chunk
        changeValue(chunk)
        return processStream();
      };
  
      processStream();
      
    } catch (err) {
      setWriting(false)
      setError("Something went wrong")
      console.log(err);
    }
  }

    
  return (
    <section className='recipe-section'>
        <ThemeProvider theme={theme}>
          <h3 className='tool-description'>Type in the ingredients you have and our chef will suggest the most delicious dishes and drinks you can prepare </h3>

            <FormControl className='select-container '>
                <InputLabel htmlFor="food-or-drink" sx={{
                    color: "white"
                  }}>Food or drink</InputLabel>
                <Select 
                  id='food-or-drink'
                  className='select'
                  sx={selectStyle}
                  placeholder='Food or drink'
                  label = "Food or drink"
                  name = "foodOrDrink"
                  value={foodOrDrink}
                  onChange={handleFoodOrDrinkChange}
                  MenuProps={{
                  PaperProps: {
                    sx: {
                      backgroundColor: 'var(--card-background)',
                      paddingInline: '15px'
                    },
                  }}}
                > 
                  <MenuItem className='mui-menu-item' value = "Food">Food <i className="fa-solid fa-burger"></i></MenuItem>
                  <MenuItem className='mui-menu-item' value = "Drink">Drink <i className="fa-solid fa-wine-bottle"></i></MenuItem>
                </Select>
              </FormControl>

            <TextField 
                placeholder={example}
                multiline
                className='text-input'
                rows={8}
                value={ingredients}
                onChange={(event) => setIngredients(event.target.value)}
            />

        <button onClick = {generateRecipes} className='generate-button'><i className="fa-solid fa-circle-down"></i>Generate Recipes<i className="fa-solid fa-circle-down"></i></button>
        {error && <span className='error'>{error}</span>}
          <TextArea 
            value={recipes}
            handleChange={handleChange}
            placeholder = {placeholder}
         />
        </ThemeProvider>
    </section>
  )
}
