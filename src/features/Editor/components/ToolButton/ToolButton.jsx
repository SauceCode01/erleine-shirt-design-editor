import React, { useContext, useRef } from "react";

import { ToolContext } from "../../Editor";
const ToolButton = ({ children, className = "", toolComponent, toolName }) => {
	const toolContext = useContext(ToolContext);

  const selfRef = useRef(null);

  const handleOnClick = () => {
    toolContext.changeTool(toolComponent, toolName, selfRef)
  }

	return (
		<div
      ref={selfRef}
			className={`${className} `}
			onClick={handleOnClick}
		>
			{children}
		</div>
	);
};

export default ToolButton;
