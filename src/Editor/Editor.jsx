import React, { useEffect, useRef, useState } from "react";
import {
	Canvas,
	Rect,
	InteractiveFabricObject,
} from "fabric";
import Toolbar from "./Toolbar";
import Uwu from "./test";
import { EnableSnapping } from "./SnappingHelpers";

const Editor = () => {
	const canvasRef = useRef(null);
	const [canvas, setCanvas] = useState(null);


	useEffect(() => {
		if (canvasRef.current) {
			const initialCanvas = createCanvas(canvasRef);

			setCanvas(initialCanvas);
			EnableSnapping(initialCanvas);

			return () => {
				initialCanvas.dispose();
			};
		}
	}, []);

	return (
		<>
			<div className="w-full h-full flex flex-col items-center justify-center border-5 border-red-500 p-10">
				<div className="flex border-1 border-black">
					<div className="w-full bg-black">
						<canvas ref={canvasRef} className="" />
					</div>
					<Toolbar canvas={canvas}></Toolbar>
				</div>
			</div>

			<p>mousewheel to zoom in and out. ALT + DRAG to pan.</p>
			<Uwu canvas={canvas}></Uwu>
		</>
	);
};

const createCanvas = (canvasRef) => {
	const initialCanvas = new Canvas(canvasRef.current, {
		backgroundColor: "#aaaaaa",
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

	const bg = new Rect({
		left: 0,
		top: 0,
		fill: "#ffffff",
		width: 500,
		height: 500,
		selectable: false,
		evented: false,
	});
	bg.id = "background-";
	initialCanvas.add(bg);

	initialCanvas.renderAll();

	initialCanvas.on("mouse:wheel", function (opt) {
		console.log("mousewheel");
		var delta = opt.e.deltaY;
		var zoom = initialCanvas.getZoom();
		zoom *= 0.999 ** delta;
		if (zoom > 20) zoom = 20;
		if (zoom < 0.01) zoom = 0.01;
		initialCanvas.setZoom(zoom);
		opt.e.preventDefault();
		opt.e.stopPropagation();
	});

	initialCanvas.on("mouse:down", function (opt) {
		var evt = opt.e;
		if (evt.ctrlKey === true) {
			this.isDragging = true;
			this.selection = false;
			this.lastPosX = evt.clientX;
			this.lastPosY = evt.clientY;
		}
	});
	initialCanvas.on("mouse:move", function (opt) {
		if (this.isDragging) {
			var e = opt.e;
			var vpt = this.viewportTransform;
			vpt[4] += e.clientX - this.lastPosX;
			vpt[5] += e.clientY - this.lastPosY;
			this.requestRenderAll();
			this.lastPosX = e.clientX;
			this.lastPosY = e.clientY;
		}
	});
	initialCanvas.on("mouse:up", function (opt) {
		this.setViewportTransform(this.viewportTransform);
		this.isDragging = false;
		this.selection = true;
	});

	return initialCanvas;
};

export default Editor;
