import React from 'react'


export const ToolBarToolContainer = ({children, toolBarToolsRef}) => {
  // GIVES CHILDREN AND RENDERS NOTHING
  toolBarToolsRef.current = children
  return <><div>toolbar tool container {children}</div></>
}
