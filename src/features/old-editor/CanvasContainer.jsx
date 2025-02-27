import React, { useEffect, useRef, useState } from "react";
import ZoomControls from "./ZoomControls";
import CanvasWindow from "./CanvasWindow";
import Toolbar from "./Toolbar";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

const canvasWidth = 500;
const canvasHeight = 500;

const CanvasContainer = ({ canvas, setCanvas }) => {
	const containerElement = useRef(null);
	const contentElement = useRef(null);

	const canvasElement = useRef(null);

	const canvasRef = useRef(null);

	const [zoom, setZoom] = useState(1);

	const [selectedIndex, setSelectedIndex] = useState(0);
	const [showPanel, setShowPanel] = useState(false);

	return (
		<>
			<ZoomControls
				zoom={zoom}
				setZoom={setZoom}
				containerElement={containerElement}
			></ZoomControls>

			<div className="w-[80%] m-auto h-[80vh] relative">
				{/* TOOLBAR */}
				<div className="absolute left-0 top-0 h-full z-10">
					<TabGroup
						className="h-full flex flex-row   "
						selectedIndex={selectedIndex}
						onChange={() => {
							setSelectedIndex();
							setShowPanel(true);
						}}
					>
						<TabList className="w-20 h-full bg-white flex flex-col gap-1">
							<Tab className="w-full h-15 bg-gray-200 mb-2">Tab 1</Tab>
							<Tab className="w-full h-15 bg-gray-200 mb-2">Tab 2</Tab>
							<Tab className="w-full h-15 bg-gray-200 mb-2">Tab 3</Tab>
						</TabList>
						<TabPanels
							className={`w-50 h-full relative ${
								showPanel ? "relative" : "hidden"
							}`}
						>
							<TabPanel className="w-full h-full rounded-2xl shadow-2xl bg-yellow-300">
								Content 1
							</TabPanel>
							<TabPanel className="w-full h-full rounded-2xl shadow-2xl bg-yellow-300">
								Content 2
							</TabPanel>
							<TabPanel className="w-full h-full rounded-2xl shadow-2xl bg-yellow-300">
								Content 3
							</TabPanel>
						</TabPanels>
						<button
							className="bg-blue-400 absolute right-0 top-[50%]"
							onClick={() => setShowPanel((a) => !a)}
						>
							<div className="relative right-[-50%] top-[-50%] w-20 h-20">
								toggle
							</div>
						</button>
					</TabGroup>
				</div>

				<CanvasWindow
					containerElement={containerElement}
					zoom={zoom}
					canvasElement={canvasElement}
					contentElement={contentElement}
					setCanvas={setCanvas}
					canvasRef={canvasRef}
					width={canvasWidth}
					height={canvasHeight}
				></CanvasWindow>
			</div>

			{/* <Toolbar canvas={canvas}></Toolbar> */}
		</>
	);
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
