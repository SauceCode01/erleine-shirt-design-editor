import React, { useState } from "react";
import ContainerDirectional from "../../components/ContainerDirectional/ContainerDirectional";
import ContainerPadded from "../../components/ContainerPadded";
import ToolButton from "./components/ToolButton";
import ToolContainer from "./components/ToolContainer";

const Editor = ({ className = "" }) => {
	const [toolFolded, setToolFolded] = useState(false);
	const [tool, setTool] = useState(null);
	const [toolName, setToolName] = useState(null);

	// button behavior
	// 	no tool open
	// 		click to open
	// 	tool open
	// 		click same button to close
	const handleButtonOnClick =
		(p_tool, p_toolName, toolName, toolFolded) => () => {
			if (toolName == p_toolName) {
				if (toolFolded) setToolFolded(false);
				else {
					setToolFolded(true);
				}
			} else {
				setTool((p) => p_tool);
				setToolName((p) => p_toolName);
				setToolFolded((p) => false);
			}
		};

	return (
		<div className={className}>
			<div className="wrapper w-full h-[80vh] flex flex-row border border-amber-300">
				{/* left panel  */}
				<ContainerDirectional naked>
					<ContainerDirectional className="bg-gray-300 border" vertical>
						<ToolButton
							className="aspect-square w-15 shadow-2xs border"
							onClick={handleButtonOnClick(
								<div>hello world</div>,
								"tool1",
								toolName,
								toolFolded
							)}
						>
							1
						</ToolButton>
						<ToolButton className="aspect-square w-15 shadow-2xs border">
							2
						</ToolButton>
					</ContainerDirectional>
					<ToolContainer
						folded={toolFolded}
						setFolded={setToolFolded}
						className="bg-orange w-100"
					>
						{tool ? tool : ""}
					</ToolContainer>
				</ContainerDirectional>

				{/* right panel */}
				<div className="canvas-container border border-red-400 bg-red-400 w-full relative">
					<ContainerDirectional
						className="border border-green-500 w-[90%] absolute top-5 left-1/2 -translate-x-1/2 bg-white"
						center
					>
						<ToolButton className="h-10 min-w-15 shadow-2xs border">
							1
						</ToolButton>
						<ToolButton className="h-10 min-w-15 shadow-2xs border">
							2
						</ToolButton>
					</ContainerDirectional>

					<div className="w-full bg-gray-800 h-full">actual canvas</div>
				</div>
			</div>
		</div>
	);
};

export default Editor;
