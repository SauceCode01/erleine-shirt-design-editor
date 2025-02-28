import React from "react";

import {
	defaultGap,
	defaultPadding,
	containerDirectionalVerticalByDefault,
} from "../../config/constants";

const ContainerPadded = ({
	children,
	className,
	padding = defaultPadding,
	center = false,
	naked = false,
}) => {
	if (naked) {
		padding = 0
	}

	return (
		<>
		<div
			style={{
				padding: `calc(var(--spacing) * ${padding})`,
			}}
			className={`flex bg-blue-200 ${className} ${
				center ? "justify-center items-center" : ""
			}`}
		>
			{children}
		</div>
		</>
	);
};

export default ContainerPadded;
