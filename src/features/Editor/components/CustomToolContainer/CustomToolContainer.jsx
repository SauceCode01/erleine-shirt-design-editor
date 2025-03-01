import React, { useContext } from "react";
import ContainerPadded from "../../../../components/ContainerPadded";

import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

import { ToolContainer, ToolContext } from "../ToolManager";

const CustomToolContainer = () => {
	const toolContext = useContext(ToolContext);

	return (
		<>
			<>
				<div
					className={`relative h-full  overflow-clip transition-all w-0 duration-500 ${
						toolContext.foldToolContainer ? "w-0" : "w-100"
					}`}
				>
					<div className="w-100 h-full p-5">
						<ToolContainer doNotFold/>
					</div>
				</div>

				{toolContext.activeTool ? (
					<div className="relative w-0 h-full">
						<div
							className="absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2 h-10 p-2 rounded-full bg-white z-10 hover:shadow-2xl hover:shadow-black"
							onClick={() => {
								toolContext.setFoldToolContainer((prev) => !prev);
							}}
						>
							<div
								className={`flex  items-center justify-center w-full h-full transition-all duration-500 delay-400 ${
									toolContext.foldToolContainer ? "" : "rotate-180"
								}`}
							>
								<LuChevronRight />
							</div>
						</div>
					</div>
				) : (
					""
				)}
			</>
		</>
	);
};
export default CustomToolContainer;
