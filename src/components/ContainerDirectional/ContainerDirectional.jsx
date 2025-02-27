import React from "react";

import {
	defaultGap,
	defaultPadding,
	containerDirectionalVerticalByDefault,
} from "../../config/constants";

const ContainerDirectional = ({
	children,
	className,
	vertical = containerDirectionalVerticalByDefault,
	padding = defaultPadding,
	gap = defaultGap,
	center = false,
	naked = false,
}) => {
	if (naked) {
		padding = 0
		gap = 0
	}

	return (
		<div
			style={{
				padding: `calc(var(--spacing) * ${padding})`,
				gap: `calc(var(--spacing) * ${gap})`,
			}}
			className={`flex ${className} ${vertical ? "flex-col" : "flex-row"} ${
				center ? "justify-center" : "justify-start"
			}`}
		>
			{children}
		</div>
	);
};

export default ContainerDirectional;
