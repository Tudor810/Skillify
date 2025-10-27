import React, { useState } from 'react'
import { CodeBlock, irBlack} from "react-code-blocks";



export default function MyCodeBlock({block}) {

    const [copy, setCopy] = useState(false)

    function removeFirstLine(inputString) {
        const lines = inputString.split('\n');
        lines.shift(); // Remove the first line
        return lines.join('\n');
      }


    const copyCode = () => {

        // if(copy === true) return


        navigator.clipboard.writeText(removeFirstLine(block));

        setCopy(true)

        setTimeout(() => {
            setCopy(false)
        }, [3000])
        
    }
    
return (
    <div className='code-block'>
        <div className='programming-language'>
          <p className='language-text'>{block.split('\n')[0]}</p>
          <div onClick = {copyCode} className='copy-code'>
            <i className={`${copy ? 'fa-solid fa-check' : "fa-regular fa-clipboard"}`}></i>
            <p>{`${copy ? "Copied!" : "Copy code"}`}</p>
          </div>
        </div>
        <CodeBlock 
            text = {removeFirstLine(block)}
            language = {block.split('\n')[0]}
            showLineNumbers = {true}
            theme = {irBlack}
            customStyle={{
                borderRadius: 'var(--border-radius)'
            }}
        />
      </div>
  )
}
