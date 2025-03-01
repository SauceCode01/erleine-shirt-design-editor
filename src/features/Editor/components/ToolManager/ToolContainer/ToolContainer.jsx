import React, { useContext } from "react";

import { ToolContext } from "../ToolManager";

export const ToolContainer = ({ doNotFold = false }) => {
	const toolContext = useContext(ToolContext);

	return (
		<>
			{toolContext.activeTool ? (
				doNotFold ? (
					<>{toolContext.activeTool}</>
				) : (
					<>
						{toolContext.foldToolContainer ? (
							<></>
						) : (
							<>{toolContext.activeTool}</>
						)}
					</>
				)
			) : (
				""
			)}
		</>
	);
};
