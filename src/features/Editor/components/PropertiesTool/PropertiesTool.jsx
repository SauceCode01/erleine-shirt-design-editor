import { Input } from "@headlessui/react";
import { Group } from "fabric";
import React, { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";

const PropertiesTool = ({ canvas }) => {
	const [selectedObject, setSelectedObject] = useState(null);
	const [width, setWidth] = useState("");
	const [height, setHeight] = useState("");
	const [color, setColor] = useState("");

	useEffect(() => {
		if (canvas) {
			// const curSelected = canvas.getActiveObjects()
			// if (curSelected) {setSelectedObject(curSelected)}

			canvas.on("selection:created", (event) => {
				handleObjectSelection(event.selected[0]);
			});

			canvas.on("selection:updated", (event) => {
				handleObjectSelection(event.selected[0]);
			});

			canvas.on("selection:cleared", () => {
				setSelectedObject(null);
				clearSettings();
			});

			canvas.on("object:modified", (event) => {
				handleObjectSelection(event.target);
			});

			canvas.on("object:scaling", (event) => {
				handleObjectSelection(event.target);
			});
		}
	}, [canvas]);

	const handleObjectSelection = (object) => {
		if (!object) return;
		setSelectedObject(object);
		setWidth(Math.round(object.width * object.scaleX));
		setHeight(Math.round(object.height * object.scaleY));
		setColor(object.fill);
	};

	const clearSettings = () => {
		setWidth("");
		setHeight("");
		setColor("");
	};

	const handleWidthChange = (e) => {
		const value = e.target.value;
		const intValue = parseInt(value, 10);

		if (selectedObject) {
			selectedObject.set({ width: intValue / selectedObject.scaleX });
			setWidth(intValue);
			selectedObject.setCoords();
			canvas.renderAll();
		}
	};

	const handleHeightChange = (e) => {
		const value = e.target.value;
		const intValue = parseInt(value, 10);

		if (selectedObject) {
			selectedObject.set({ height: intValue / selectedObject.scaleY });
			setHeight(intValue);
			selectedObject.setCoords();
			canvas.renderAll();
		}
	};

	const handleColorChange = (e) => {
		if (selectedObject) {
			selectedObject.set({ fill: e });
			setColor(e);
			canvas.renderAll();
		}
	};

	return (
		<>
			<div
				className={
					selectedObject
						? "flex flex-col p-6 border-1 border-black rounded-2xl"
						: "hidden"
				}
			>
				Width
				<input
					className="border-1 border-black"
					value={width}
					type="text"
					onChange={handleWidthChange}
				></input>
				Height
				<input
					className="border-1 border-black"
					value={height}
					type="text"
					onChange={handleHeightChange}
				></input>
				Color
				<label>{color}</label>
				<HexColorPicker
					color={color}
					onChange={handleColorChange}
				></HexColorPicker>
			</div>
		</>
	);
};

export default PropertiesTool;
