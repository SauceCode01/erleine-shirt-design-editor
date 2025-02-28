import React, { useRef, useState, useEffect, createContext } from "react";
import ContainerDirectional from "../../components/ContainerDirectional/ContainerDirectional";
import CanvasComponent from "./components/CanvasComponent";

export const CanvasContext = createContext();
import { ToolBar, ToolBarButton, ToolBarButtonContainer, ToolBarTool, ToolBarToolContainer, ToolContainer, ToolManager } from "./components/ToolManager";
import ElementTool from "./components/ElementTool";

const Editor = ({ className = "border-black border not-first:" }) => {
	const [canvas, setCanvas] = useState(null);

	const canvasWidth = 500;
	const canvasHeight = 500;

	return (
		<CanvasContext.Provider
			value={{ canvas, setCanvas, canvasWidth, canvasHeight }}
		>
			<ToolManager>
				<div className={` w-full h-full ${className}`}>
					<div className="wrapper w-full h-full flex flex-row  ">
						{/* left panel  */}
						<ContainerDirectional naked className="shadow-2xl z-30">
							<ToolBar>
								<ToolBarButtonContainer>
									<ToolBarButton>
										elements
									</ToolBarButton>
									<ToolBarButton>
										layers
									</ToolBarButton>
								</ToolBarButtonContainer>
								<ToolBarToolContainer>
									<ToolBarTool>
										<ElementTool canvas={canvas}></ElementTool>
									</ToolBarTool>
									<ToolBarTool>
										<div>some random tool</div>
									</ToolBarTool>
								</ToolBarToolContainer>
							</ToolBar>

							{/* TOOL CONTAINER  */}
							<div className="h-full w-full flex flex-row bg-gray-100 "></div>

							<ToolContainer></ToolContainer>
							{/* <ToolContainer
								tool={tool}
								toolFolded={toolFolded}
								setToolFolded={setToolFolded}
							/>
							</div> */}
						</ContainerDirectional>

						{/* right panel */}
						<div className="canvas-container  w-full relative">
							{/* <PopUpBar changeTool={changeTool} canvas={canvas} /> */}

							<div className="absolute w-full h-full top-0 left-0">
								<CanvasComponent />
							</div>
						</div>
					</div>
				</div>
			</ToolManager>
		</CanvasContext.Provider>
	);
};

export default Editor;
