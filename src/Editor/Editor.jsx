import React, { useEffect, useRef, useState } from "react";
import { Canvas, Rect, Circle, Triangle, InteractiveFabricObject } from "fabric";
import Settings from "./Settings";
import CanvasSettings from "./CanvasSettings";

import { handleObjectMoving, clearGuidelines } from "./SnappingHelpers";
import LayersList from "./LayerList";
import LayerManager from "./LayerManager";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

const Editor = () => {
	const canvasRef = useRef(null);
	const [canvas, setCanvas] = useState(null);
	const [guidelines, setGuidelines] = useState([]);

	const [zoomLevel, setZoomLevel] = useState(1)

	useEffect(() => {
		if (canvasRef.current) {
			const initialCanvas = new Canvas(canvasRef.current, {
				backgroundColor: "#aaaaaa",
				width: 600,
				height: 400,
				preserveObjectStacking: true,
			});

			InteractiveFabricObject.ownDefaults = {
				...InteractiveFabricObject.ownDefaults,
				cornerStyle: 'round',
				cornerStrokeColor: 'blue',
				cornerColor: 'blue',
				cornerStyle: 'circle',
				transparentCorners: false,
				borderColor: 'blue',
				borderDashArray: [5,2],
		}

			const bg = new Rect({
				left: 0,
				top: 0,
				fill: "#ffffff",
				width: 500,
				height: 500,
				selectable: false,
				evented:false,
			});
			bg.id = "background-"
			initialCanvas.add(bg);


			initialCanvas.renderAll();
			setCanvas(initialCanvas);

			initialCanvas.on("object:moving", (event) =>
				handleObjectMoving(
					initialCanvas,
					event.target,
					guidelines,
					setGuidelines
				)
			);

			initialCanvas.on("object:modified", (event) =>
				clearGuidelines(initialCanvas, guidelines, setGuidelines)
			);


			initialCanvas.on('mouse:wheel', function(opt) {
				console.log("mousewheel")
				var delta = opt.e.deltaY;
				var zoom = initialCanvas.getZoom();
				zoom *= 0.999 ** delta;
				if (zoom > 20) zoom = 20;
				if (zoom < 0.01) zoom = 0.01;
				setZoomLevel(zoom)
				initialCanvas.setZoom(zoom);
				opt.e.preventDefault();
				opt.e.stopPropagation();
			})

			initialCanvas.on('mouse:down', function(opt) {
				var evt = opt.e;
				if (evt.ctrlKey === true) {
					this.isDragging = true;
					this.selection = false;
					this.lastPosX = evt.clientX;
					this.lastPosY = evt.clientY;
				}
			});
			initialCanvas.on('mouse:move', function(opt) {
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
			initialCanvas.on('mouse:up', function(opt) {
				// on mouse up we want to recalculate new interaction
				// for all objects, so we call setViewportTransform
				this.setViewportTransform(this.viewportTransform);
				this.isDragging = false;
				this.selection = true;
			});

			return () => {
				initialCanvas.dispose();
			};
		}
	}, []);

	const addRectangle = () => {
		if (canvas) {
			const rect = new Rect({
				left: 50,
				top: 50,
				fill: "#00eeee",
				width: 100,
				height: 100,
				selectable: true,
				stroke: "black",
				strokeWidth: 1,
				strokeUniform: true,
			});
			canvas.add(rect);
		}
	};

	const addCircle = () => {
		if (canvas) {
			const circle = new Circle({
				left: 150,
				top: 50,
				fill: "#00eeee",
				radius: 50,
				selectable: true,
				stroke: "black",
				strokeWidth: 1,
				strokeUniform: true,
			});
			canvas.add(circle);
		}
	};

	const addTriangle = () => {
		if (canvas) {
			const triangle = new Triangle({
				left: 250,
				top: 50,
				fill: "#00eeee",
				width: 100,
				height: 100,
				selectable: true,
				stroke: "black",
				strokeWidth: 1,
				strokeUniform: true,
			});
			canvas.add(triangle);
		}
	};

	return (
		<div className="w-full h-full flex flex-col items-center justify-center">
			<p>
				mousewheel to zoom in and out. 
				ALT + DRAG to pan.
			</p>
			<p>ZOOM: {zoomLevel}</p>
			<div>
				<button
					className="border-2 border-black rounded-full m-2 p-1"
					onClick={addRectangle}
				>
					Add Rectanglee
				</button>
				<button
					className="border-2 border-black rounded-full m-2 p-1"
					onClick={addCircle}
				>
					Add Circle
				</button>
				<button
					className="border-2 border-black rounded-full m-2 p-1"
					onClick={addTriangle}
				>
					Add Triangle
				</button>
			</div>
			<canvas ref={canvasRef} className=" border-1 border-black" />

			<div className="flex">
				<Settings canvas={canvas}></Settings>
				<CanvasSettings canvas={canvas}></CanvasSettings>
				{/* <LayersList canvas={canvas}></LayersList> */}
				<LayerManager canvas={canvas}></LayerManager>
			</div>

			<TabGroup vertical className="flex flex-row-reverse">
				<TabList className="flex flex-col p-3 bg-white">
					<Tab className="bg-blue-300 p-2 rounded-2xl data-[selected]:bg-white/10">Tab 1</Tab>
					<Tab className="bg-blue-300 p-2 rounded-2xl data-[selected]:bg-white/10">Tab 2</Tab>
					<Tab className="bg-blue-300 p-2 rounded-2xl data-[selected]:bg-white/10">Tab 3</Tab>
				</TabList>
				<TabPanels className="bg-gray-200 w-full aspect-square p-5">
					<TabPanel className="bg-white shadow-2xl">Content 1</TabPanel>
					<TabPanel className="bg-white shadow-2xl">Content 2</TabPanel>
					<TabPanel className="bg-white shadow-2xl">Content 3</TabPanel>
				</TabPanels>
			</TabGroup>
		</div>
	);
};

export default Editor;
