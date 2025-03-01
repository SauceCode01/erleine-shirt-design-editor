import React, { useContext } from "react";

import { ElementTool, LayerTool } from "../../Tools";

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
			<div className="bg-gray-300 pt-2 pb-2 flex flex-col gap-2">
				<ToolBar>
					<ToolBarButtonContainer>
						<ToolBarButton>
							<div className="min-h-8 p-2 hover:bg-gray-200 cursor-pointer transition-all duration-200">
								elements
							</div>
						</ToolBarButton>
						<ToolBarButton>
							<div className="min-h-8 p-2 hover:bg-gray-200 cursor-pointer transition-all duration-200">
								layers
							</div>
						</ToolBarButton>
					</ToolBarButtonContainer>
					<ToolBarToolContainer>
						<ToolBarTool>
							<ElementTool></ElementTool>
						</ToolBarTool>
						<ToolBarTool>
							<LayerTool></LayerTool>
						</ToolBarTool>
					</ToolBarToolContainer>
				</ToolBar>
			</div>
		</>
	);
};
