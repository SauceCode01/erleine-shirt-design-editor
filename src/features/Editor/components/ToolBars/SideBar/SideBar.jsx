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
import { TextTool } from "../../Tools/TextTool/TextTool";
import { LuLayers, LuLetterText, LuShapes } from "react-icons/lu";

export const SideBar = ({ children }) => {
	const canvasContext = useContext(CanvasContext);
	const canvas = canvasContext.canvas;

	return (
		<>
			<div className="bg-gray-300 pt-2 pb-2 flex flex-col gap-2">
			
				<ToolBar>
					<ToolBarButtonContainer>
						<ToolBarButton>
							<div className="min-h-8 p-2 select-none hover:bg-gray-200 cursor-pointer items-center transition-all duration-200 flex flex-col text-3xl">
								<LuShapes></LuShapes>
								<div className="flex items-center justify-center text-xs">

								Elements
								</div>
							</div>
						</ToolBarButton>
						<ToolBarButton>
						<div className="min-h-8 p-2 select-none hover:bg-gray-200 cursor-pointer items-center transition-all duration-200 flex flex-col text-3xl">
								<LuLayers></LuLayers>
								<div className="flex items-center justify-center text-xs">

								Layers
								</div>
							</div>
						</ToolBarButton>
						<ToolBarButton>
						<div className="min-h-8 p-2 select-none hover:bg-gray-200 cursor-pointer items-center transition-all duration-200 flex flex-col text-3xl">
								<LuLetterText></LuLetterText>
								<div className="flex items-center justify-center text-xs">

								Text
								</div>
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
						<ToolBarTool>
							<TextTool></TextTool>
						</ToolBarTool>
					</ToolBarToolContainer>
				</ToolBar>
			</div>
		</>
	);
};
