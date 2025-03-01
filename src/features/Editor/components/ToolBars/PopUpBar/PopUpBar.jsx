import React from "react";
import { useContext } from "react";



import { ElementTool } from "../../Tools";

import { CanvasContext } from "../../../Editor";

import {
	ToolBar,
	ToolBarButtonContainer,
	ToolBarButton,
	ToolBarToolContainer,
	ToolBarTool,
} from "../../ToolManager";
export function PopUpBar() {
	const canvasContext = useContext(CanvasContext);
	const canvas = canvasContext.canvas;
	return (

			<>
			<div className="z-20 border border-green-500 w-[90%] absolute top-5 left-1/2 -translate-x-1/2 bg-white">
			<ToolBar  className="flex flex-row justify-center gap-2 p-2">
					<ToolBarButtonContainer>
						<ToolBarButton className="h-10 min-w-15 shadow-2xs border">
							elements
						</ToolBarButton>
						<ToolBarButton className="h-10 min-w-15 shadow-2xs border">
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
			</div>
			
			</>
	);
}
