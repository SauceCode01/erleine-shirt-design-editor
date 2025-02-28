import React, { useContext, useRef } from 'react'

import { ToolContext } from '../../ToolManager'

export const ToolBarButton = ({tool, className, children}) => {
  const toolContext = useContext(ToolContext)
  const selfRef = useRef(null)

  console.log("this is from tool button", tool)

  return (
    <div ref={selfRef} onClick={toolContext.handleToolButtonClick(selfRef, tool)} className={className}>{children}{tool}</div>
  )
}
