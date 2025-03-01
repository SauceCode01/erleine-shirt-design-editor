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

	const updateSelection = (e) => {
		setSelection(e.selected);
		console.log("NEW SLECTION" , e.selected, canvas.getActiveObjects())
	};

	const clearSelection = () => {
		setSelection([]);
		setLastCakeIndexClicked(null)
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
		// console.log(`index ${index} clickedddd.... ctrlkey = ${e.ctrlKey} shiftkey=  ${e.shiftKey}`)
		
		console.log("handlelayercakeonclick")

		if (e.ctrlKey) {
			canvas.setActiveObject(new ActiveSelection([...selection, layers[index]], {
				canvas: canvas
			}));

			console.log(canvas.getActiveObjects(), "UPDATED AFTER HANDLE LAYER CAKE ON CLICK")
			

		} else if (e.shiftKey) {
			let min = Math.min(index, lastCakeIndexClicked)
			let max = Math.max(index, lastCakeIndexClicked)
			canvas.setActiveObject(new ActiveSelection([...(layers.slice(min,max+1))], {
				canvas: canvas
			}));
		} else {

			canvas.setActiveObject(new ActiveSelection([layers[index]], {
				canvas: canvas
			}));
		}

		canvas.renderAll();

		setLastCakeIndexClicked(index)
	}


	return (
		<>
			<div className=" w-full h-full">
				<div>LAYERS</div>

				<ul className="flex flex-col gap-1">
					{layers.map((layer, index) => (
						<li
							key={generateId()}
							className={`cursor-pointer flex items-center justify-between p-2 mb-1 rounded-2xl  ${
								selection.includes(layer) ? "bg-blue-300" : "bg-gray-200 "
							}`}
							onClick={handleLayerCakeOnClick(index)}
						>
							<span className={`text-sm truncate`}>{layer.type}</span>
						</li>
					))}
				</ul>
			</div>
		</>
	);
};
