import React from 'react'
import Canvas from './Canvas'
import Editor from './Editor/Editor'

const App = () => {
  return (
    <>
    <h1>This is app.jsx</h1>
    <div className='bg-red-900'>App</div>
    <Editor></Editor>
    {/* <Canvas></Canvas> */}
    </>
  )
}

export default App