import React, { useContext } from "react";

import { ElementTool } from "../../Tools";


import { CanvasContext } from "../../../Editor";

import {
	ToolBar,
	ToolBarButtonContainer,
	ToolBarButton,
	ToolBarToolContainer,
	ToolBarTool,
} from "../../ToolManager";

export const SideBar = ({ children }) => {
	const canvasContext = useContext(CanvasContext);
	const canvas = canvasContext.canvas;

	return (
		<>
			<ToolBar className="bg-gray-300 pt-2 pb-2 flex flex-col gap-2">
				<ToolBarButtonContainer>
					<ToolBarButton className="min-h-8 p-2 hover:bg-gray-200 cursor-pointer transition-all duration-200">
						elements
					</ToolBarButton>
					<ToolBarButton className="min-h-8 p-2 hover:bg-gray-200 cursor-pointer transition-all duration-200">
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
		</>
	);
};

