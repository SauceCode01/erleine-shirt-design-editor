import { Input } from "@headlessui/react";
import React, { useEffect, useState } from "react";

const CanvasSettings = ({ canvas }) => {
	const [canvasHeight, setCanvasHeight] = useState(500);
	const [canvasWidth, setCanvasWidth] = useState(500);

	useEffect(
		() => {
			if (canvas) {
				canvas.setWidth(canvasWidth);
				canvas.setHeight(canvasHeight);
				canvas.renderAll();
			}
		},
		[canvasHeight,
		canvasWidth,
		canvas]
	);

	const handleWidthChange = (e) => {
		const value = e.target.value;
		const intValue = parseInt(value, 10);
		if (intValue >= 0) {
			setCanvasWidth(intValue);
		}
	};

	const handleHeightChange = (e) => {
		const value = e.target.value;
		const intValue = parseInt(value, 10);
		if (intValue >= 0) {
			setCanvasHeight(intValue);
		}
	};

	return (
		<>
			<div
				className="flex flex-col p-6 border-1 border-black rounded-2xl"
			>
        Canvas Settings
				Canvas Width
				<input className="border-1 border-black" value={canvasWidth} type="text" onChange={handleWidthChange}></input>
				Canvas Height
				<input className="border-1 border-black" value={canvasHeight} type="text" onChange={handleHeightChange}></input>
			</div>
		</>
	);
};

export default CanvasSettings;
