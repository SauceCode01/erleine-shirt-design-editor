import React, { useContext } from "react";

import { useEffect } from "react";
import { useState } from "react";

import { Rect } from "fabric";

import { CanvasContext } from "../../Editor";
import { useRef } from "react";
import { clamp } from "../../../../utils/utilities";
import { EnableSnapping } from "../CanvasComponent/utils/snapper";

import { createCanvas } from "./utils/createCanvas";

const CanvasComponent = ({}) => {
	const canvasContext = useContext(CanvasContext);

	const [zoom, setZoom] = useState(1);
	const containerElement = useRef(null);
	const contentElement = useRef(null);

	const selectionActivate = () => {
		canvasContext.setHaveActiveSelection(true);
		console.log("hello world");
	};
	const clearSelection = () => {
		canvasContext.setHaveActiveSelection(false);
	};

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


 const rr = new Rect({
	left: 50,
	top: 50,
	fill: "#00eeee",
	width: 100,
	height: 100,
	selectable: true,
	stroke: "black",
	strokeWidth: 1,
	strokeUniform: true,
})
			newCanvas.add(rr);

			// const c =  newCanvas.getActiveObject().clone();
			// 	c.left += 100;
			// 	newCanvas.add(c);
			// 	newCanvas.renderAll();

			newCanvas.on("selection:created", selectionActivate);
			newCanvas.on("selection:updated", selectionActivate);
			newCanvas.on("selection:cleared", clearSelection);

			return () => {
				newCanvas.dispose();

				newCanvas.off("selection:created", selectionActivate);
				newCanvas.off("selection:updated", selectionActivate);
				newCanvas.off("selection:cleared", clearSelection);
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
						<canvas ref={canvasElement}></canvas>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CanvasComponent;
