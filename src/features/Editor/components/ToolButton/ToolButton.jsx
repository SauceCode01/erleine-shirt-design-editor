import React, { useContext } from "react";

import { ToolContext } from "../../Editor";
const ToolButton = ({ children, className = "", toolComponent, toolName }) => {
	const toolContext = useContext(ToolContext);

	return (
		<div
			className={`${className} `}
			onClick={toolContext.changeTool(toolComponent, toolName)}
		>
			{children}
		</div>
	);
};

export default ToolButton;
