import React, { useContext } from "react";

import { useEffect } from "react";
import { useState } from "react";

import { CanvasContext } from "../../Editor";
import { useRef } from "react";
import { clamp } from "../../../../utils/Utilities/utilities";
import { Canvas, InteractiveFabricObject } from "fabric";
import { EnableSnapping } from "../CanvasComponent/utils/snapper";

import { createCanvas } from "./utils/createCanvas";

const CanvasComponent = ({}) => {
	const canvasContext = useContext(CanvasContext);

	const [zoom, setZoom] = useState(1);
	const containerElement = useRef(null);
	const contentElement = useRef(null);

	// canvas window behaviour
	useEffect(() => {
		// had to add the event listener here because:
		// "Unable to preventDefault inside passive event listener invocation."
		const container = containerElement.current;
		if (!container) return;

		container.addEventListener("wheel", handleScrollWheel);

		return () => {
			container.removeEventListener("wheel", handleScrollWheel);
		};
	}, []);

	// canvas window
	const handleScrollWheel = (e) => {
		if (!e.ctrlKey) return;

		e.preventDefault();
		e.stopPropagation();

		let delta = -e.deltaY / 100;
		setZoom((prevZoom) => {
			return clamp(prevZoom * 1.1 ** delta, 0.5, 1.5);
		});
	};

	const canvasElement = useRef(null);

	useEffect(() => {
		if (canvasElement.current) {
			var newCanvas = createCanvas(
				canvasElement,
				canvasContext.canvasWidth,
				canvasContext.canvasHeight
			);

			canvasContext.setCanvas(newCanvas);

			EnableSnapping(
				newCanvas,
				canvasContext.canvasWidth,
				canvasContext.height
			);

			return () => {
				newCanvas.dispose();
			};
		}
	}, []);

	return (
		// fill the entire container
		<div className="w-full bg-gray-800 h-full">
			<div
				ref={containerElement}
				className="w-full m-auto h-full overflow-auto bg-gray-100 text-center flex items-center"
			>
				<div
					ref={contentElement}
					style={{
						zoom: `${zoom}`,
					}}
					className="p-20 m-auto  inline-block"
				>
					<div className="shadow-2xl relative block">
						<canvas ref={canvasElement}></canvas>;
					</div>
				</div>
			</div>
		</div>
	);
};


export default CanvasComponent;
