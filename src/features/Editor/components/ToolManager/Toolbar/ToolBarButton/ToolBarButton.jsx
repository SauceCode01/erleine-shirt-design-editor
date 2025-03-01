import React, { useContext, useRef } from "react";

import { ToolContext } from "../../ToolManager";

import { generateId } from "../../../../../../utils";

export const ToolBarButton = ({ tool, children }) => {
	const toolContext = useContext(ToolContext);
	const selfRef = useRef(null);

	return (
		<>
			{children ? (
				<>
					{React.Children.map(children, (child) =>
						React.isValidElement(child) ? (
              // valid element and has a container we can clone
							React.cloneElement(child, {
								key: generateId(),
								ref: selfRef,
								onClick: toolContext.handleToolButtonClick(selfRef, tool),
							})
						) : (
              // invalid element. plain text. we need to add container div to add event listener
							<div
								key={generateId()}
								ref={selfRef}
								onClick={toolContext.handleToolButtonClick(selfRef, tool)}
							>
								{child}
							</div>
						)
					)}
				</>
			) : (
				""
			)}
		</>
	);
};
