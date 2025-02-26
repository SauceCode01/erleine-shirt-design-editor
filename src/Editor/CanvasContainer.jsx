import React, { useEffect, useRef, useState } from "react";
import { Canvas, Rect, InteractiveFabricObject } from "fabric";
import { EnableSnapping } from "./SnappingHelpers";

const canvasWidth = 500;
const canvasHeight = 500;

const CanvasContainer = ({canvas, setCanvas}) => {
	const containerElement = useRef(null);
	const contentElement = useRef(null);

	const canvasElement = useRef(null);

	const canvasRef = useRef(null)

	const [zoom, setZoom] = useState(1);

	useEffect(() => {
		if (canvasElement.current) {
			var newCanvas = createCanvas(canvasElement);

			setCanvas(newCanvas);

			canvasRef.current = newCanvas

			EnableSnapping(newCanvas, canvasWidth, canvasHeight);

			return () => {
				newCanvas.dispose();
			};
		}
	}, []);

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



	/////////////////////////
	//  HANDLE EVENTS
	/////////////////////////

	const handleScrollWheel = (e) => {
		if (!e.ctrlKey) return;

		e.preventDefault();
		e.stopPropagation();

		let delta = -e.deltaY / 100;
		setZoom((prevZoom) => {
			// canvasRef.current.setZoom(prevZoom * 1.1 ** delta)
			return prevZoom * 1.1 ** delta});
		// var newzoom = prevZoom * 1.1 ** step

		return

		if (delta > 0) handleZoomIn(Math.abs(delta));
		else handleZoomOut(Math.abs(delta));
	};

	const handleZoomIn = ({step = 1}) => {
		setZoom((prevZoom) => prevZoom * 1.1 ** step, 3);
	};

	const handleZoomOut = ({step = 1}) => {
		setZoom((prevZoom) => prevZoom / 1.1 ** step, 0.5);
	};

	return (
		<>
			<div className="p-2 bg-amber-400 shadow-2xl m-2 flex flex-row gap-1">
				<button className="p-2 bg-gray-400" onClick={handleZoomIn}>
					+
				</button>
				<button className="p-2 bg-gray-400" onClick={handleZoomOut}>
					-
				</button>
				<div>ZOOM: {zoom.toFixed(2)}</div>
			</div>

			<div
				ref={containerElement}
				className="w-[50%] m-auto h-[80vh] overflow-auto bg-gray-100 text-center flex items-center"
			>
				<div
					ref={contentElement}
					style={{ zoom: `${zoom}` }}
					className="p-5 m-auto  inline-block"
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

export default CanvasContainer;

// const useResizeWatcher = (onResize, elementRef) => {
// 	useEffect(() => {
// 		const observer = new ResizeObserver(() => {
// 			if (!elementRef.current) return;
// 			onResize(elementRef.current);
// 		});
// 		observer.observe(elementRef.current);
// 		return () => observer.disconnect();
// 	}, []);
// };

// var containerRef = useRef();

// useResizeWatcher((elem) => {
// 	if (canvas.current) {
// 		var ratio = elem.offsetHeight / canvas.current.height

// 		// var multiplier = 1 + 1/ratio

// 		// 2 / 1 => from 1 to 2 => enlarge them you zoom by ratio = 1+1/ratio

// 		canvas.current.setWidth(elem.offsetWidth);
// 		canvas.current.setHeight(elem.offsetHeight);

// 		// canvas.current.setZoom(canvas.current.getZoom() * multiplier)

// 		canvas.current.renderAll();
// 	}
// }, containerRef);

// const viewportRect = containerRef.current.getBoundingClientRect();
// const contentRect = contentRef.current.getBoundingClientRect();
// const mGlobalX = e.clientX;
// const mGlobalY = e.clientY;

// console.log(contentRect)

// const bg = new Rect({
// 	left: 0,
// 	top: 0,
// 	fill: "#ffffff",
// 	width: canvasWidth,
// 	height: canvasHeight,
// 	selectable: false,
// 	evented: false,
// });
// bg.id = "background-";
// canvas.add(bg);

// canvas.on("mouse:wheel", function (opt) {
// 	console.log("mousewheel");
// 	var delta = opt.e.deltaY;
// 	var zoom = canvas.getZoom();
// 	zoom *= 0.999 ** delta;
// 	if (zoom > 20) zoom = 20;
// 	if (zoom < 0.01) zoom = 0.01;
// 	canvas.setZoom(zoom);
// 	opt.e.preventDefault();
// 	opt.e.stopPropagation();
// });

// canvas.on("mouse:down", function (opt) {
// 	var evt = opt.e;
// 	if (evt.ctrlKey === true) {
// 		this.isDragging = true;
// 		this.selection = false;
// 		this.lastPosX = evt.clientX;
// 		this.lastPosY = evt.clientY;
// 	}
// });
// canvas.on("mouse:move", function (opt) {
// 	if (this.isDragging) {
// 		var e = opt.e;
// 		var vpt = this.viewportTransform;
// 		vpt[4] += e.clientX - this.lastPosX;
// 		vpt[5] += e.clientY - this.lastPosY;
// 		this.requestRenderAll();
// 		this.lastPosX = e.clientX;
// 		this.lastPosY = e.clientY;
// 	}
// });
// canvas.on("mouse:up", function (opt) {
// 	this.setViewportTransform(this.viewportTransform);
// 	this.isDragging = false;
// 	this.selection = true;
// });
