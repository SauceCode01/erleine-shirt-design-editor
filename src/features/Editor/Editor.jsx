import React, { useRef, useState, useEffect, createContext } from "react";
import CanvasComponent from "./components/CanvasComponent";

export const CanvasContext = createContext();
import { ToolManager } from "./components/ToolManager";

import CustomToolContainer from "./components/CustomToolContainer/CustomToolContainer";

import { PopUpBar, SideBar } from "./components/ToolBars";

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
						<div className="flex flex-row">
							<SideBar></SideBar>

							<CustomToolContainer></CustomToolContainer>
						</div>

						{/* right panel */}
						<div className="canvas-container  w-full relative">
							<PopUpBar></PopUpBar>

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
