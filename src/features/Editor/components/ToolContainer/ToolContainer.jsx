import React from "react";

import ContainerPadded from "../../../../components/ContainerPadded";

const ToolContainer = ({ children, folded, setFolded }) => {
	const handleToggleOnClick = () => {
		setFolded((prev) => !prev);
	};

	return (
		<>
			<div>
				{children ? (
					<div className="relative h-full">
						{folded ? (
							""
						) : (
							<ContainerPadded className="bg-orange w-100">
								{children}
							</ContainerPadded>
						)}

						<div
							className="absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2 w-20 h-20 bg-amber-300 z-10"
							onClick={handleToggleOnClick}
						>
							toggle
						</div>
					</div>
				) : (
					""
				)}
			</div>
		</>
	);
};

export default ToolContainer;
