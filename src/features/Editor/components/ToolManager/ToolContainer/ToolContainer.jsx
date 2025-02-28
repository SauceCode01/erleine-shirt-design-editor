import React, { useContext } from "react";

import { ToolContext } from "../ToolManager";

export const ToolContainer = ({
	className = "",
	classFolded = "hidden",
	classNotFolded = "",
	overrideDefaultFolding = false,
}) => {
	const toolContext = useContext(ToolContext);
	if (overrideDefaultFolding) {
		classFolded = "";
		classNotFolded = "";
	}

	return (
		<>
			{toolContext.activeTool ? (
				<>{toolContext.activeTool}</>
				// <>
				// 	{React.cloneElement(toolContext.activeTool, {
				// 		className: `${className} ${
				// 			toolContext.foldToolContainer ? classFolded : classNotFolded
				// 		}`,
				// 	})}
				// </>
			) : (
				""
			)}
		</>
	);
};
