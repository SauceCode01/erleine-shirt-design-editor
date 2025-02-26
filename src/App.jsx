import React from 'react'
import Canvas from './Canvas'
import Editor from './Editor/Editor'
import CanvasContainer from './Editor/CanvasContainer'

const App = () => {
  return (
    <>
    <div className='w-full h-[100vh] p-5 bg-gray-300'>
    {/* <Editor></Editor> */}
    <CanvasContainer></CanvasContainer>
        </div>
    </>
  )
}

export default App