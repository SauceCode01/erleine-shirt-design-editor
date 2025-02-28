import React, {
	useEffect,
	useRef,
	useState,
	useContext,
} from "react";
import { ToolContext } from "../ToolManager";

export const ToolBar = ({ children, className }) => {
	const toolContext = useContext(ToolContext);

	const toolBarButtonsRef = useRef(null);
	const toolBarToolsRef = useRef(null);

	const [toolBarButtons, setToolBarButtons] = useState(null);
	const [toolBarTools, setToolBarTools] = useState(null);

	useEffect(() => {
		if (toolBarButtonsRef.current) {
			setToolBarButtons(toolBarButtonsRef.current);
		}
		if (toolBarToolsRef.current) {
			setToolBarTools(toolBarButtonsRef.current);
		}
	}, []);

	return (
		<>
			{/* GETTING GRANDCHILDREN  */}
			{React.cloneElement(children[0], {
				toolBarButtonsRef: toolBarButtonsRef,
			})}

			{React.cloneElement(children[1], {
				toolBarToolsRef: toolBarToolsRef,
			})}

			{/* INSERTING BUTTON WHILE GIVING THEM REFERENCE TO THEIR TOOL  */}
			{toolBarButtons ? (
				<>
					<div className={className}>
						{toolBarButtons.map((button, index) => {
							const tool = toolBarButtons[index];

							return React.cloneElement(button, {
								tool: tool,
							});
						})}
					</div>
				</>
			) : (
				""
			)}
		</>
	);
};
