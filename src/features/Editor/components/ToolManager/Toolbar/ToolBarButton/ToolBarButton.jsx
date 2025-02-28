import React, { useContext, useRef } from 'react'

import { ToolContext } from '../../ToolManager'

export const ToolBarButton = ({tool, className, children}) => {
  const toolContext = useContext(ToolContext)
  const selfRef = useRef(null)


  return (
    <div ref={selfRef} onClick={toolContext.handleToolButtonClick(selfRef, tool)} className={className}>{children}</div>
  )
}
