import { Input } from "@headlessui/react";
import { Group } from "fabric";
import React, { useContext, useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";

import { CanvasContext } from "../../../Editor";
import { LayerTool } from "../LayerTool";

export const PropertiesTool = () => {
	const canvasContext = useContext(CanvasContext);
	const canvas = canvasContext.canvas;

	const [selection, setSelection] = useState(null);

	const handleSelection = (e) => {
		const selection = canvas.getActiveObjects();

		if (selection.length > 0) {
			setSelection(selection);
		} else setSelection(null);
		// console.log("selection", selection);
		updateFieldValues();
	};

	useEffect(() => {
		if (canvas) {
			canvas.on("selection:created", handleSelection);
			canvas.on("selection:updated", handleSelection);
			canvas.on("selection:cleared", handleSelection);
			canvas.on("object:modified", handleSelection);
			canvas.on("object:scaling", handleSelection);

			handleSelection();
		}

		return () => {
			canvas.off("selection:created", handleSelection);
			canvas.off("selection:updated", handleSelection);
			canvas.off("selection:cleared", handleSelection);
			canvas.off("object:modified", handleSelection);
			canvas.off("object:scaling", handleSelection);
		};
	}, [canvas]);

	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);
	const [left, setLeft] = useState(0);
	const [top, setTop] = useState(0);
	const [angle, setAngle] = useState(0)

	const updateFieldValues = () => {
		const activeobject = canvas.getActiveObject();
		if (activeobject) {
			const width = parseInt(activeobject.width * activeobject.scaleX, 10);
			const height = parseInt(activeobject.height * activeobject.scaleY, 10);
			const left = parseInt(activeobject.left, 10);
			const top = parseInt(activeobject.top, 10);
			const angle = parseInt(activeobject.angle, 10);

			setWidth(width);
			setHeight(height);
			setLeft(left);
			setTop(top);
			setAngle(angle)
		} else {
			setWidth(0);
		}
	};

	const handleChangeWidthField = (e) => {
		const value = e.target.value;
		const intValue = parseInt(value, 10);

		const activeobject = canvas.getActiveObject();
		if (activeobject) {
			console.log("detials", activeobject.width, activeobject.scaleX);
			activeobject.set({ width: intValue / activeobject.scaleX }); // Apply the scale
			activeobject.setCoords(); // Update coordinates

			canvas.requestRenderAll();
			setWidth(intValue);
		} else {
			setWidth(0);
		}
	};

	
	const handleChangeHeightField = (e) => {
		const activeobject = canvas.getActiveObject();
		if (activeobject) {
			const newHeight = parseInt(e.target.value, 10)
			activeobject.set({ height: newHeight / activeobject.scaleY }); 
			activeobject.setCoords(); 

			canvas.renderAll();
			setHeight(newWidth);
		} else {
			setHeight(0);
		}
	};


	const handleChangeLeftField = (e) => {
		const activeobject = canvas.getActiveObject();
		if (activeobject) {
			const value = parseInt(e.target.value, 10)
			activeobject.set({left:value }); 
			activeobject.setCoords(); 

			canvas.renderAll();
			setLeft(value);
		} else {
			setLeft(0);
		}
	};

	
	const handleChangeTopField = (e) => {
		const activeobject = canvas.getActiveObject();
		if (activeobject) {
			const value = parseInt(e.target.value, 10)
			activeobject.set({top:value }); 
			activeobject.setCoords(); 

			canvas.renderAll();
			setTop(value);
		} else {
			setTop(0);
		}
	};

	
	const handleChangeAngleField = (e) => {
		const activeobject = canvas.getActiveObject();
		if (activeobject) {
			const value = parseInt(e.target.value, 10)
			activeobject.set({
				originX: "center",
				originY: "center",
			});
			activeobject.set({angle:value }); 
			activeobject.setCoords(); 

			canvas.renderAll();
			setAngle(value);
		} else {
			setAngle(0);
		}
	};

	return (
		<>
			<div className="w-full h-full flex flex-col p-2">
				<div>properties tool</div>
				{selection ? (
					<>
						<div className="flex flex-row w-full">
							<div className="p-2 grow">
								<label>Width</label>
								<input
									value={width}
									type="text"
									onChange={handleChangeWidthField}
									className="w-full p-1 rounded-2xl bg-gray-100"
								></input>
							</div>
							<div className="p-2 grow">
								<label>Height</label>
								<input
									value={height}
									type="text"
									onChange={handleChangeHeightField}
									className="w-full p-1 rounded-2xl bg-gray-100"
								></input>
							</div>
						</div>

						
						<div className="flex flex-row w-full">
							<div className="p-2 grow">
								<label>X</label>
								<input
									value={left}
									type="text"
									onChange={handleChangeLeftField}
									className="w-full p-1 rounded-2xl bg-gray-100"
								></input>
							</div>
							<div className="p-2 grow">
								<label>Y</label>
								<input
									value={top}
									type="text"
									onChange={handleChangeTopField}
									className="w-full p-1 rounded-2xl bg-gray-100"
								></input>
							</div>
						</div>




						
						<div className="flex flex-row w-[50%]">
							<div className="p-2 grow">
								<label>Rotation</label>
								<input
									value={angle}
									type="text"
									onChange={handleChangeAngleField}
									className="w-full p-1 rounded-2xl bg-gray-100"
								></input>
							</div>
						</div>
					</>
				) : (
					<LayerTool></LayerTool>
				)}
			</div>
		</>
	);
};
