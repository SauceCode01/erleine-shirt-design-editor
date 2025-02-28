import React, { useContext } from "react";

import { ToolContext } from "../ToolManager";

export const ToolContainer = ({
	className="",
	classFolded = "hidden",
	classNotFolded = "",
	overrideDefaultFolding=false
}) => {
	const toolContext = useContext(ToolContext);
	if (overrideDefaultFolding) {
		classFolded=""
		classNotFolded=""
	}
	
	return (
		<>
			<div
				className={`${className} ${
					toolContext.foldToolContainer ? classFolded : classNotFolded
				}`}
			>
				{toolContext.activeTool ? <>have active tool {toolContext.activeTool}</> : <></>}
			</div>
		</>
	);
};
 
