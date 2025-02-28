import React, { useContext } from "react";
import TestComponent from "../components/TestComponent";
import Editor from "../features/Editor";

import {
	ToolBar,
	ToolManager,
	ToolBarButtonContainer,
	ToolBarToolContainer,
	ToolBarButton,
	ToolContainer,
	ToolBarTool,
	ToolContext,
} from "../features/Editor/components/ToolManager";

const App = () => {
	const toolContext = useContext(ToolContext);

	return (
		<>
			<div className="bg-white w-[100vw] h-[100vh]  ">
				<ToolManager>
					<div className="flex flex-row">
						<ToolBar className="flex flex-col w-30 bg-orange-200 gap-1 p-2">
							<ToolBarButtonContainer>
								<ToolBarButton className="border-1 border-black">
									tool btnn 1
								</ToolBarButton>
								<ToolBarButton className="border-1 border-black">
									tool btn 2
								</ToolBarButton>
								<ToolBarButton className="border-1 border-black">
									tool btn 3
								</ToolBarButton>
							</ToolBarButtonContainer>
							<ToolBarToolContainer>
								<ToolBarTool>tool 1</ToolBarTool>
								<ToolBarTool>tool 2</ToolBarTool>
								<ToolBarTool>tool 3</ToolBarTool>
							</ToolBarToolContainer>
						</ToolBar>

						<ToolContainer></ToolContainer>
					</div>
				</ToolManager>
			</div>
			{/* <div className="w-[100vw] h-[100vh]">

			<Editor></Editor>
			</div> */}
		</>
	);
};

export default App;
