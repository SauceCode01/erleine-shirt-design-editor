import ToolContainer from "./components/ToolContainer/ToolContainer";

import PopUpBar from "./components/PopUpBar/PopUpBar";
import  SideBar  from "./components/SideBar/SideBar";
import React, { useRef, useState, useEffect, createContext } from "react";
import ContainerDirectional from "../../components/ContainerDirectional/ContainerDirectional";
import CanvasComponent from "./components/CanvasComponent";
import ElementTool from "./components/ElementTool";

export const CanvasContext = createContext();
export const ToolContext = createContext();

const Editor = ({ className = "border-black border not-first:" }) => {
	const [toolFolded, setToolFolded] = useState(true);
	const [tool, setTool] = useState(null);
	const toolName = useRef(null);
	const buttonRef = useRef(null)

	const [canvas, setCanvas] = useState(null);

	const canvasWidth = 500;
	const canvasHeight = 500;

	// button behavior
	const changeTool = (p_tool, p_buttonRef) => () => {
		if (buttonRef.current = p_buttonRef) {
			setToolFolded((p) => !p); // toggle fold
		} else {
			setTool((p) => p_tool);
			setToolFolded((p) => false);
			buttonRef.current = p_buttonRef;
		}
	};

	return (
		<CanvasContext.Provider
			value={{ canvas, setCanvas, canvasWidth, canvasHeight }}
		>
			<ToolContext.Provider value={{ changeTool,  }}>
				<div className={` w-full h-full ${className}`}>
					<div className="wrapper w-full h-full flex flex-row  ">
						{/* left panel  */}
						<ContainerDirectional naked className="shadow-2xl z-30">
							<Sidebar>
								
								<ElementTool />
								<ElementTool />
							</Sidebar>

							{/* TOOL CONTAINER  */}
							<div className="h-full w-full flex flex-row bg-gray-100 ">

							<ToolContainer
								tool={tool}
								toolFolded={toolFolded}
								setToolFolded={setToolFolded}
							/>
							</div>
						</ContainerDirectional>

						{/* right panel */}
						<div className="canvas-container  w-full relative">
							<PopUpBar changeTool={changeTool} canvas={canvas} />

							<div className="absolute w-full h-full top-0 left-0">
								<CanvasComponent />
							</div>
						</div>
					</div>
				</div>
			</ToolContext.Provider>
		</CanvasContext.Provider>
	);
};

export default Editor;
