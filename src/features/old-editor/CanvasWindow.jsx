import React from "react";
import { EnableSnapping } from "./SnappingHelpers";
import { useEffect } from "react";
import { Canvas, Rect, InteractiveFabricObject } from "fabric";

const CanvasWindow = ({
	containerElement,
	zoom,
	canvasElement,
	contentElement,
	setCanvas,
	canvasRef,
  width,height
}) => {
	useEffect(() => {
		if (canvasElement.current) {
			var newCanvas = createCanvas(canvasElement);

			setCanvas(newCanvas);

			canvasRef.current = newCanvas;

			EnableSnapping(newCanvas, width, height);

			return () => {
				newCanvas.dispose();
			};
		}
	}, []);

	return (
		<>
			<div
				ref={containerElement}
				className="w-full m-auto h-full overflow-auto bg-gray-100 text-center flex items-center"
			>
				<div
					ref={contentElement}
					style={{ zoom: `${zoom}` }}
					className="p-20 m-auto  inline-block"
				>
					<div className="shadow-2xl relative block">
						<canvas ref={canvasElement}></canvas>
					</div>
				</div>
			</div>
		</>
	);
};

const createCanvas = (canvasRef) => {
	const canvas = new Canvas(canvasRef.current, {
		backgroundColor: "#ffffff",
		width: 500,
		height: 500,
		preserveObjectStacking: true,
	});

	InteractiveFabricObject.ownDefaults = {
		...InteractiveFabricObject.ownDefaults,
		cornerStyle: "round",
		cornerStrokeColor: "blue",
		cornerColor: "blue",
		cornerStyle: "circle",
		transparentCorners: false,
		borderColor: "blue",
		borderDashArray: [5, 2],
	};

	canvas.renderAll();

	return canvas;
};

export default CanvasWindow;
