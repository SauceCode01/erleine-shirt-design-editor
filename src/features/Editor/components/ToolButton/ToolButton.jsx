import React from 'react'
import { generateId } from '../../../../utils/generateId/generateId'

const defaultHandleOnClick = (id) => () => {console.log(`toolButton ${id} Clicked`)}

const ToolButton = ({children, className="", onClick=null}) => {
  if (!onClick) onClick = defaultHandleOnClick
  

  return (
    <div className={`${className}`} onClick={onClick}>
      {children}
    </div>
  )
}

export default ToolButton