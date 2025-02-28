import React, { useContext } from "react";

import ContainerDirectional from "../../../../components/ContainerDirectional/ContainerDirectional";
import ToolButton from "../ToolButton";
import FileSettings from "../../../old-editor/FileSettings";
import ElementTool from "../ElementTool";
import LayersTool from "../LayersTool/LayersTool";


import { CanvasContext } from "../../Editor";
import { ToolContext } from "../../Editor";

 const SideBar = ({children}) => {
	const canvasContext = useContext(CanvasContext)
	const toolContext = useContext(ToolContext);

	const buttonOnClick = toolContext.changeTool;
	const canvas = canvasContext.canvas;

	
	return (
		<>
		
		<div className="bg-gray-300 pt-2 pb-2 flex flex-col gap-2">
		
		{children.map((child)=>(
			<ToolButton
				className="min-h-8 p-2 hover:bg-gray-200 cursor-pointer transition-all duration-200  "
			>
				Elements 
			</ToolButton>
		))}

		
			<ToolButton
				className="min-h-8 p-2 hover:bg-gray-200 cursor-pointer transition-all duration-200  "
				toolComponent={<ElementTool canvas={canvas}/>}
				toolName="LayersTool"
			>
        Layerss
			</ToolButton>
		</div>
		</>
	);
}

export default SideBar;