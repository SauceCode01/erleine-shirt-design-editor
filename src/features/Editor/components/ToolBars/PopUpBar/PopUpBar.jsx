import React from "react";
import { useContext } from "react";

import { ElementTool, LayerTool,  } from "../../Tools";

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
				<div className="flex flex-row justify-center gap-2 p-2">
					<ToolBar>
						<ToolBarButtonContainer>
							<ToolBarButton>
								<div className="h-10 min-w-15 shadow-2xs border">elements</div>
							</ToolBarButton>
							<ToolBarButton>
								<div className="h-10 min-w-15 shadow-2xs border">layers</div>
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
			</div>
		</>
	);
}
