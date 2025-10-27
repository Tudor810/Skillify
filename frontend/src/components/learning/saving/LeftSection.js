import React, { useEffect, useState } from 'react'
import { FormControl, InputLabel, MenuItem, Select} from '@mui/material'
import { selectStyle, categories} from '../../home/data';
import httpClient from '../../../httpClient';

export default function LeftSection({selectCategory, handleChange, lessonTitles, toolTitles, handleLessonClick, selectedTitle}) {

    const [lessonOrTool, setLessonOrTool] = useState({
        lesson: false,
        tool: false
    })
    const [lessonNumber, setLessonNumber] = useState({})
    useEffect(() => {
      const getLessonNumber = async () => {
        try {
          const resp = await httpClient.get("https://api.skillify-ai.com/plans/lesson-number")
          
          setLessonNumber(resp.data.categoryCounts)
        } catch (err) {
          console.log(err)
        }
      }

      getLessonNumber()
    },[])

  return (
    <div className='left-section'>
         <FormControl className='select-container'>
              <InputLabel htmlFor="my-select" sx={{
                color: "white"
              }}>Category</InputLabel>
                <Select  
                  id="my-select"
                  label="Category"
                  className='select'
                  sx={selectStyle}
                  value={selectCategory}
                  onChange={handleChange}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        backgroundColor: 'var(--card-background)',
                        paddingInline: '15px'
                      },
                    }}}
                >
                  {categories.map((item, index) => {
                  return <MenuItem key = {index} className = "mui-menu-item" value = {item.secondaryTitle === "Summary" ? item.secondaryTitle : item.title}><i className={`fa-solid ${item.icon}`}></i>   {item.secondaryTitle === "Summary" ? item.secondaryTitle : item.title} (you have {lessonNumber[item.secondaryTitle === "Summary" ? item.secondaryTitle.toLowerCase() : item.title.toLowerCase().replace(" ","-")] ? lessonNumber[item.secondaryTitle === "Summary" ? item.secondaryTitle.toLowerCase() : item.title.toLowerCase().replace(" ","-")] : 0}  saved) </MenuItem>
                })}
              </Select>  
            </FormControl>
            <div className='choose-plan'>
                <div className='choose-lesson'>
                    <p onClick={() => setLessonOrTool({lesson: true, tool: false})} className={`${lessonOrTool.lesson ? 'active' : ""}`}>Lessons</p>
                    {/* <p onClick={() => setLessonOrTool({lesson: false, tool: true})} className={`${lessonOrTool.tool ? 'active' : ""}`}>Tools</p> */}
                </div>
                <div className='choose-tool'>
                    {/* <p onClick={() => setLessonOrTool({lesson: true, tool: false})} className={`${lessonOrTool.lesson ? 'active' : ""}`}>Lessons</p> */}
                    <p onClick={() => setLessonOrTool({lesson: false, tool: true})} className={`${lessonOrTool.tool ? 'active' : ""}`}>Tools</p>
                </div>
            </div>
            <div className='save-title-container'>
                <ul className='save-lesson-container'>
                    {lessonTitles && lessonTitles.map((item, index) => {
                        return <li onClick = {handleLessonClick} key={index}className = {`${selectedTitle === item ? 'active' : ""} save-title`}>{item}</li>
                    })}
                </ul>
                <ul className='save-tool-container'>
                    {toolTitles && toolTitles.map((item, index) => {
                        return <li className = {`${selectedTitle === item ? 'active' : ""} save-title`} onClick = {handleLessonClick} key={index}>{item}</li>
                    })}
                </ul>
            </div>
    </div>
  )
}
