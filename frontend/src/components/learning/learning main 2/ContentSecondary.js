import React from 'react'

export default function ContentSecondary({summary}) {

  const downloadLesson = () => {

    const link = document.createElement("a")

    const file = new Blob([summary], {type: 'text/plain'})

    link.href = URL.createObjectURL(file)

    link.download = "lesson.txt"

    link.click()

    URL.revokeObjectURL(link.href)
  }
  return (
    <section className='right-section'>
      <div className='result-text'>
        {summary.trim() !== "" &&
        <div className='lesson'>
            <span className='lesson-content'>{summary}</span>
        </div>}
      </div>
        <button onClick={downloadLesson} className='download-lesson'>Download Lesson</button>
    </section>
  )
}
