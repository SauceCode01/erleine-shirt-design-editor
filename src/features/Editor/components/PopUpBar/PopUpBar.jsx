import React from "react";

import ContainerDirectional from "../../../../components/ContainerDirectional/ContainerDirectional";
import ToolButton from "../ToolButton";
import PropertiesTool from "../PropertiesTool/PropertiesTool";



export default function PopUpBar({ changeTool, canvas }) {
	return (
		<ContainerDirectional
			className="z-20 border border-green-500 w-[90%] absolute top-5 left-1/2 -translate-x-1/2 bg-white"
			center
		>
			<ToolButton
				className="h-10 min-w-15 shadow-2xs border"
				onClick={changeTool(
					<PropertiesTool canvas={canvas}></PropertiesTool>,
					"PropertiesTool"
				)}
			>
				Properties
			</ToolButton>
			<ToolButton
				className="h-10 min-w-15 shadow-2xs border"
				onClick={changeTool(<div>adsfasd</div>, "tool4")}
			>
				4
			</ToolButton>
		</ContainerDirectional>
	);
}
