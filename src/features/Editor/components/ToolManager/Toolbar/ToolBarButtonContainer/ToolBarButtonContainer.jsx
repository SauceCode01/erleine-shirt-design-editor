import React from 'react'



export const ToolBarButtonContainer = ({children, toolBarButtonsRef}) => {
  // GIVES CHILDREN AND RENDERS NOTHING
  toolBarButtonsRef.current = children
  return <></>;
}
