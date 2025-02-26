import React, { useEffect, useRef, useState } from "react";
import { Canvas, Rect, InteractiveFabricObject } from "fabric";
import Toolbar from "./Toolbar";
import { EnableSnapping } from "./SnappingHelpers";
import { Popover, PopoverButton, PopoverGroup, PopoverPanel } from '@headlessui/react'

const canvasWidth = 500
const canvasHeight = 500;

const useResizeWatcher = (onResize, elementRef) => {
	useEffect(() => {
		const observer = new ResizeObserver(() => {
			if (!elementRef.current) return;
			onResize(elementRef.current);
		});
		observer.observe(elementRef.current);
		return () => observer.disconnect();
	}, []);
};

const Editor = () => {
	const canvasRef = useRef(null);
	const canvas = useRef(null);

	const [canvasState, setCanvasState] = useState(null)

	useEffect(() => {
		if (canvasRef.current) {
			canvas.current = createCanvas(canvasRef);

			setCanvasState(canvas.current)

			EnableSnapping(canvas.current, canvasWidth, canvasHeight);

			return () => {
				canvas.current.dispose();
			};
		}
	}, []);

	var containerRef = useRef();

	useResizeWatcher((elem) => {
		if (canvas.current) {
			var ratio = elem.offsetHeight / canvas.current.height 

			// var multiplier = 1 + 1/ratio

			// 2 / 1 => from 1 to 2 => enlarge them you zoom by ratio = 1+1/ratio

			canvas.current.setWidth(elem.offsetWidth);
			canvas.current.setHeight(elem.offsetHeight);

			
			// canvas.current.setZoom(canvas.current.getZoom() * multiplier)

			canvas.current.renderAll();
		}
	}, containerRef);

	return (
		<>
			<div className="w-full">
				<div
					ref={containerRef}
					className="w-full aspect-4/2 bg-black overflow-clip relative"
				>
					<div className="absolute top-0 left-0">
						<canvas ref={canvasRef} />
					</div>

					<div className="absolute top-0 right-0 h-full">
						<Toolbar canvas={canvas.current}></Toolbar>
					</div>
				</div>
			</div>

		<PopoverGroup className="flex flex-col">

		<Popover className="relative">
      <PopoverButton>Solutions</PopoverButton>
      <PopoverPanel className="flex flex-col">
        <a href="/analytics">Analytics</a>
        <a href="/engagement">Engagement</a>
        <a href="/security">Security</a>
        <a href="/integrations">Integrations</a>
      </PopoverPanel>
    </Popover>
		
		<Popover className="relative">
      <PopoverButton>Solutions</PopoverButton>
      <PopoverPanel anchor="left" className="flex flex-col">
        <a href="/analytics">Analytics</a>
        <a href="/engagement">Engagement</a>
        <a href="/security">Security</a>
        <a href="/integrations">Integrations</a>
      </PopoverPanel>
    </Popover>
		
		<Popover className="relative">
      <PopoverButton>Solutions</PopoverButton>
      <PopoverPanel anchor="left" className="flex flex-col">
        <a href="/analytics">Analytics</a>
        <a href="/engagement">Engagement</a>
        <a href="/security">Security</a>
        <a href="/integrations">Integrations</a>
      </PopoverPanel>
    </Popover>
		</PopoverGroup>

		</>
	);
};

const createCanvas = (canvasRef) => {
	const canvas = new Canvas(canvasRef.current, {
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
		width: canvasWidth,
		height: canvasHeight,
		selectable: false,
		evented: false,
	});
	bg.id = "background-";
	canvas.add(bg);

	canvas.renderAll();

	canvas.on("mouse:wheel", function (opt) {
		console.log("mousewheel");
		var delta = opt.e.deltaY;
		var zoom = canvas.getZoom();
		zoom *= 0.999 ** delta;
		if (zoom > 20) zoom = 20;
		if (zoom < 0.01) zoom = 0.01;
		canvas.setZoom(zoom);
		opt.e.preventDefault();
		opt.e.stopPropagation();
	});

	canvas.on("mouse:down", function (opt) {
		var evt = opt.e;
		if (evt.ctrlKey === true) {
			this.isDragging = true;
			this.selection = false;
			this.lastPosX = evt.clientX;
			this.lastPosY = evt.clientY;
		}
	});
	canvas.on("mouse:move", function (opt) {
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
	canvas.on("mouse:up", function (opt) {
		this.setViewportTransform(this.viewportTransform);
		this.isDragging = false;
		this.selection = true;
	});

	return canvas;
};

export default Editor;
