import React, { useState } from 'react'
import {createTheme, ThemeProvider} from '@mui/material' 
import TextArea from '../TextArea';
import Tesseract from 'tesseract.js'
import httpClient from '../../../../httpClient'
import Switch from '../Switch';
import { FormControl, InputLabel, MenuItem, Select} from '@mui/material'
import { selectStyle } from '../../../home/data';

export default function Image({handleGenerate, summaryError, width, planType}) {

  const [switchOn, setSwitchOn] = useState(false)
  const [wordCount, setWordCount] = useState(0)
  const [type, setType] = useState("")

  const toggleSwitch = () => setSwitchOn(prevState => !prevState)

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
      const [value, setValue] = useState(null)
      
      const [error, setError] = useState("")
      const [transcript, setTranscript] = useState("")
      const [load, setLoad] = useState(false)


      const handleChangeTranscript = (e) => {
        const {value} = e.target
        setTranscript(value)
        if(value)
          setWordCount(() => {
            let count = 0
            const split = value.split(" ")

            split.forEach(item => {
              if(item !== "")
                count += 1
            })
            return count
        })
          else 
            setWordCount(0)
      }

      

      const inputRef = React.useRef(null);

      const [dragActive, setDragActive] = useState("")

      const handleDrag = (e) => {
        
        
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
          setDragActive(true);
        } else if (e.type === "dragleave") {
          setDragActive(false);
        }
        
      }
      const handleDrop = function(e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setValue(e.dataTransfer.files[0])
        }
      };

      const handleChange = (e ) => {
        e.preventDefault();
        

        if (e.target.files && e.target.files[0]) {
          setValue(e.target.files[0])
        }
      }
      function isImage(url) {
        return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
      }
      
      function isDocument(url) {
        return /\.(pdf|txt|pptx|docx|xlsx)/.test(url)
      }
      
      const onButtonClick = () => {
        inputRef.current.click();
      };
      const handleTranscript = () => {

        setError("")
        if(value === null)
          {
            setError("You need to select a document")
            return
          }
        if(isImage(value.name))
           handleSelectImage()
        else if(isDocument(value.name))
          handleSelectDocument()
        else 
          setError("Invalid file type")
      }

      const handleSelectDocument = async () => {
        const formData = new FormData()

        formData.append("file", value)
        setLoad(true)
         
        setTranscript("")
        try {
          const resp = await httpClient.post(`https://api.skillify-ai.com/chatgpt/pdf`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          
          setTranscript(resp.data.trim())
          setWordCount(() => {
            let count = 0
            const split = resp.data.split(" ")

            split.forEach(item => {
              if(item !== "")
                count += 1
            })
            return count
        })
          setLoad(false)
        } catch (err) {
          console.log(err);
          setLoad(false)

        }

      }
      
      
      const handleSelectImage = async () => {
        try {
          setLoad(true)
         
          setTranscript("")
          
            // const resp = httpClient.get(`https://api.skillify-ai.com/chatgpt/photo?photo=${URL.createObjectURL(value)}`)
            const data = await Tesseract.recognize(
              URL.createObjectURL(value),
              'eng',
            )

            setTranscript(data.data.text)
            setWordCount(() => {
              let count = 0
              const split = data.data.text.split(" ")
  
              split.forEach(item => {
                if(item !== "")
                  count += 1
              })
              return count
          })
            setLoad(false)
        } catch (err) {
          setError("Something went wrong, if this problem persists please contact us")
          setLoad(false)
          console.log(err);
        }
      }
      
      const handleChangeType = (e) => {
        setType(e.target.value)
      }
  return (
    <div className='image-section'>
         <ThemeProvider theme={theme}>
          <div>
            <h3 className='tool-description'>Document or image summary tool</h3>
            <p style={{color: '#bbb', fontSize: '0.8rem', textAlign: 'center'}}>Valid documents extensions (.docx, .pptx, .txt, .pdf, .xlsx, images)</p>
          </div>
            
            <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
              <input accept = ".xlsx,image/*,.docx,.pptx,.txt,.pdf" ref = {inputRef} type="file" id="input-file-upload" multiple={true} onChange={handleChange}/>
               <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : "" }>
                   {!value && <div>
                    <p>Drag and drop your file here or</p>
                    <i className="fa-solid fa-file-circle-plus"></i>
                    <button className="upload-button" onClick={onButtonClick}>Upload a file</button>
                    </div> }
                    {value && <div className='image-selected'>
                        {isImage(value.name) && <img alt = "Selected" src={URL.createObjectURL(value)} />}
                        <p>{value.name}</p> 
                    </div> }
                </label>
                { dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
            </form>
            
            <FormControl className='select-container '>
                <InputLabel htmlFor="level-equipment" sx={{
                    color: "white"
                    }}>Type</InputLabel>
                <Select 
                    name='type'
                    id='my-select2'
                    className='select'
                    sx={selectStyle}
                    placeholder='Type'
                    label = "Type"
                    value={type}
                    onChange={handleChangeType}
                    MenuProps={{
                    PaperProps: {
                    sx: {
                        backgroundColor: 'var(--card-background)',
                        paddingInline: '15px'
                    },
                    }}}
                > 
                    <MenuItem className = "mui-menu-item" value = "Lesson">Lesson (long for learning)</MenuItem>
                    <MenuItem className = "mui-menu-item" value = "Summary">Summary (short)</MenuItem>
                </Select>
                </FormControl> 
            <button  className='generate-button' onClick={handleTranscript}><i className="fa-solid fa-circle-down"></i>Get Text<i className="fa-solid fa-circle-down"></i></button>
            {error && <span className='error'>{error}</span>}
            {load && <p className='wait-text'>Wait while the text is getting processed</p>}
            <div className='word-container'>
              <TextArea
                  value={transcript}
                  handleChange = {handleChangeTranscript}
                  // placeholder={visibleLetters}
              />
              <p className='word-count'>Words: {wordCount}/3500</p>
            </div>
            <div className='generate-button-container'>
              <button className='generate-button' onClick={() => handleGenerate(transcript.replace(/\s/g, " "), switchOn, wordCount, "document", type)}><i className="fa-solid fa-circle-down"></i>{type === "Lesson" ? "Generate Lesson" : "Generate Key Points"}<i className="fa-solid fa-circle-down"></i></button>
              {planType && planType.split(" ")[1] !== "Premium" && <div className='rocket-container'>
                <Switch rocket = {true} width = {width} switchOn={switchOn} toggleSwitch={toggleSwitch}/>
              </div>}
            </div>
            {summaryError && <span className='error'>{summaryError}</span>}
        </ThemeProvider>
    </div>

  )
}
