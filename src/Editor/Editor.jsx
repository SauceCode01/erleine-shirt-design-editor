import React, { useEffect, useRef, useState } from "react";
import { Canvas, Rect, Circle, Triangle } from "fabric";
import Settings from "./Settings";
import CanvasSettings from "./CanvasSettings";

import { handleObjectMoving, clearGuidelines } from "./SnappingHelpers";
import LayersList from "./LayerList";
import LayerManager from "./LayerManager";


const Editor = () => {
	const canvasRef = useRef(null);
	const [canvas, setCanvas] = useState(null);
	const [guidelines, setGuidelines] = useState([])

	useEffect(() => {
		if (canvasRef.current) {
			const initialCanvas = new Canvas(canvasRef.current, {
				backgroundColor: "#f8f8f8",
				width: 600,
				height: 400,
				preserveObjectStacking: true,
			});

			initialCanvas.renderAll();
			setCanvas(initialCanvas);


			initialCanvas.on("object:moving", (event)=> handleObjectMoving(initialCanvas,event.target, guidelines, setGuidelines))

			initialCanvas.on("object:modified", (event)=> clearGuidelines(initialCanvas, guidelines, setGuidelines))


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


	const handleBringObjectForward = () => {
		const selected = canvas.getActiveObjects().reverse();
		selected.forEach((obj,index)=>canvas.bringObjectForward(obj))
		
		canvas.renderAll()
	}

	const handleSendObjectBackward = () => {
		
		const selected = canvas.getActiveObjects();
		selected.forEach((obj,index)=>canvas.sendObjectBackwards(obj))
		
		canvas.renderAll()
	}

	const handleBringObjectToFront = () => {
		const selected = canvas.getActiveObjects();
		selected.forEach((obj,index)=>canvas.bringObjectToFront(obj))
		
		canvas.renderAll()
	}
	const handleSendObjectToBack = () => {
		const selected = canvas.getActiveObjects().reverse();
		selected.forEach((obj,index)=>canvas.sendObjectToBack(obj))
		
		canvas.renderAll()
	}


	return (
		<div className="w-full h-full flex flex-col items-center justify-center">
			<div>
				<button
					className="border-2 border-black rounded-full m-2 p-1"
					onClick={handleBringObjectForward}
				>
					FORWARD
				</button>
				<button
					className="border-2 border-black rounded-full m-2 p-1"
					onClick={handleSendObjectBackward}
				>
					BACKWARD
				</button>
				<button
					className="border-2 border-black rounded-full m-2 p-1"
					onClick={handleBringObjectToFront}
				>
					FRONT
				</button>
				<button
					className="border-2 border-black rounded-full m-2 p-1"
					onClick={handleSendObjectToBack}
				>
					BACK
				</button>
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
		</div>
	);
};

export default Editor;
