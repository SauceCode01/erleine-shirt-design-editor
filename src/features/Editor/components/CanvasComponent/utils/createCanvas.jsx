

import { Canvas, InteractiveFabricObject,ActiveSelection } from "fabric";


export const createCanvas = (canvasRef, width, height) => {
	const canvas = new Canvas(canvasRef.current, {
		backgroundColor: "#ffffff",
		width: width,
		height: height,
		preserveObjectStacking: true,
	});

	InteractiveFabricObject.ownDefaults = {
		...InteractiveFabricObject.ownDefaults,
		cornerStyle: "circle",
		cornerStrokeColor: "blue",
		cornerColor: "blue",
		transparentCorners: false,
		borderColor: "blue",
		// borderDashArray: [5, 2],
	};

	ActiveSelection.ownDefaults = {
		...ActiveSelection.ownDefaults,
		borderColor: "gray",
		borderStroke:"black",
		borderDashArray: [2,6],
	};

	canvas.renderAll();

	return canvas;
};