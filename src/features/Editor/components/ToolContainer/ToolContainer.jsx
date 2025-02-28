import React from "react";
import ContainerPadded from "../../../../components/ContainerPadded";

import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const ToolContainer = ({ tool, toolFolded, setToolFolded, defaultTool }) => {
	return (
		<>
			<>
				<div
					className={`relative h-full  overflow-clip transition-all w-0 duration-500 ${
						toolFolded ? "w-0" : "w-100"
					}`}
				>
					<div className="w-100 h-full">
						<ContainerPadded className=" ">{tool}</ContainerPadded>
					</div>
				</div>

				{tool ? (
					<div className="relative w-0 h-full">
						<div
							className="absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2 h-10 p-2 rounded-full bg-white z-10 hover:shadow-2xl hover:shadow-black"
							onClick={() => {
								setToolFolded((prev) => !prev);
							}}
						>
							<div
								className={`flex  items-center justify-center w-full h-full transition-all duration-500 delay-400 ${
									toolFolded ? "" : "rotate-180"
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
export default ToolContainer;
