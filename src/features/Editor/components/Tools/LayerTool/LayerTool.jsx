import React, { useContext } from "react";

import { useState, useEffect } from "react";

import { CanvasContext } from "../../../Editor";

import { generateId } from "../../../../../utils";

import { ActiveSelection } from "fabric";

export const LayerTool = () => {
	const canvasContext = useContext(CanvasContext);
	const canvas = canvasContext.canvas;

	const [layers, setLayers] = useState([]);
	const [selection, setSelection] = useState([]);

	const [lastCakeIndexClicked, setLastCakeIndexClicked] = useState(null);

	const updateLayers = () => {
		if (!canvas) return;

		const objects = canvas
			.getObjects()
			.filter((obj) =>
				obj.id
					? !(
							obj.id.startsWith("vertical-") ||
							obj.id.startsWith("horizontal-") ||
							obj.id.startsWith("background-")
					  )
					: true
			);



		setLayers([...objects]);

	};

	const checkSelection = () => {
		const objects = canvas.getActiveObjects() 
		if (!objects) return;
		setSelection(objects);
	}

	const updateSelection = () => {
		setSelection(canvas.getActiveObjects())
		// if (e.selected) {

		// 	setSelection((prev)=>{
		// 		if (prev) return [...prev, ...e.selected]
		// 		else return [...e.selected]
		// 	});
		// }
		// else {
		// 	setSelection([])
		// }
	};

	const clearSelection = () => {
		setSelection([]);
		setLastCakeIndexClicked(null);
	};

	useEffect(() => {
		if (!canvas) return;

		canvas.on("object:added", updateLayers);
		canvas.on("object:removed", updateLayers);
		canvas.on("object:modified", updateLayers);

		canvas.on("selection:created", updateSelection);
		canvas.on("selection:updated", updateSelection);
		canvas.on("selection:cleared", clearSelection);

		updateLayers();
		checkSelection();

		return () => {
			canvas.off("object:added", updateLayers);
			canvas.off("object:removed", updateLayers);
			canvas.off("object:modified", updateLayers);

			canvas.off("selection:created", updateSelection);
			canvas.off("selection:updated", updateSelection);
			canvas.off("selection:cleared", clearSelection);
		};
	}, [canvas]);


	const handleLayerCakeOnClick = (index) => (e) => { 

		if (e.ctrlKey) {
			if (selection.includes(layers[index])) {
				canvas.setActiveObject(
					new ActiveSelection(
						[...selection.filter((obj) => obj != layers[index])],
						{
							canvas: canvas,
						}
					)
				);
			} else {
				canvas.setActiveObject(
					new ActiveSelection([...selection, layers[index]], {
						canvas: canvas,
					})
				);
			}

			if (!selection) {
				setLastCakeIndexClicked(index);
			}
		} else if (e.shiftKey) {
			let min = Math.min(index, lastCakeIndexClicked);
			let max = Math.max(index, lastCakeIndexClicked);
			canvas.setActiveObject(
				new ActiveSelection([...layers.slice(min, max + 1)], {
					canvas: canvas,
				})
			);
		} else {
			canvas.setActiveObject(
				new ActiveSelection([layers[index]], {
					canvas: canvas,
				})
			);

			setLastCakeIndexClicked(index);
		}

		canvas.renderAll();
	};



	const moveObjectUpToIndex =(obj, index) => {
		for (let i = layers.indexOf(obj); i < index; i++) {
			console.log("mm")
			canvas.bringObjectForward(obj)
		}
	}

	const handleBringSelectionUp = () => {
		if (!selection) return

		let maxIndex = layers.indexOf(selection[selection.length-1]);
		let toindex = Math.min(layers.length-1, maxIndex+1)

		selection.reverse().forEach((obj, index) => {
			moveObjectUpToIndex(obj, toindex)
			toindex -= 1
		})

		updateLayers();
		updateSelection();
		canvas.renderAll()
	};

	return (
		<>
			<div className=" w-full h-full">
				<div>LAYERS</div>
				<hr></hr>

				<div className="w-full flex flex-row p-2 gap-2 justify-center">
					<button className="bg-blue-50 p-2 rounded-2xl cursor-pointer select-none" onClick={handleBringSelectionUp}>up</button>
					<button className="bg-blue-50 p-2 rounded-2xl cursor-pointer select-none">down</button>
					<button className="bg-blue-50 p-2 rounded-2xl cursor-pointer select-none">front</button>
					<button className="bg-blue-50 p-2 rounded-2xl cursor-pointer select-none">back</button>
				</div>

				<ul className="flex flex-col gap-1">
					{layers.map((layer, index) => (
						<li
							key={generateId()}
							className={`cursor-pointer flex items-center justify-between p-2 mb-1 rounded-2xl  ${
								selection.includes(layer) ? "bg-blue-300" : "bg-gray-200 "
							}`}
							onClick={handleLayerCakeOnClick(index)}
						>
							<span className={`text-sm truncate select-none`}>
								{layer.type}
							</span>
						</li>
					))}
				</ul>
			</div>
		</>
	);
};
