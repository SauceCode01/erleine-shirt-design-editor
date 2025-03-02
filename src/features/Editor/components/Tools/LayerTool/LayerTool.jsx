import React, { useContext } from "react";

import { useState, useEffect } from "react";

import { CanvasContext } from "../../../Editor";

import { generateId } from "../../../../../utils";

import { ActiveSelection } from "fabric";


import { LuChevronDown, LuChevronUp,LuChevronsDown, LuChevronsUp   } from "react-icons/lu";

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
		console.log("SELECTION UPDATED")
		canvas.getActiveObjects().map((obj)=>console.log(obj.type))
		console.log("sorted selection")
		getSortedSelection().map((obj)=>console.log(obj.type))
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

	const getSortedSelection = () => {
		const all = canvas.getObjects()
		return canvas.getActiveObjects().toSorted((a,b)=>{
			let ia =all.indexOf(a) 
			let ib =  all.indexOf(b)
			if (ia>ib) return 1
			else if (ia<ib) return -1
			else return 0
		})
	}

	const moveObjectUpToIndex =(obj, index) => {
		for (let i = layers.indexOf(obj); i < index; i++) {
			canvas.bringObjectForward(obj)
		}
	}

	
	const handleBringSelectionUp = () => {

		const sel = getSortedSelection()
		if (!sel) return

		let maxIndex = layers.indexOf(sel[sel.length-1]);
		let toindex = Math.min(layers.length-1, maxIndex+1)

		sel.toReversed().forEach((obj, index) => {
			moveObjectUpToIndex(obj, toindex)
			toindex -= 1
		})

		updateLayers();
		updateSelection();
		canvas.renderAll()
	};

	const handleBringSelectionFront = () => {
		if (!selection) return

		getSortedSelection().forEach((obj, index) => {
			canvas.bringObjectToFront(obj)
		})

		updateLayers();
		updateSelection();
		canvas.renderAll()
	};

	const moveObjectDownToIndex =(obj, index) => {
		for (let i = layers.indexOf(obj); i > index; i--) {
			canvas.sendObjectBackwards(obj)
		}
	}


	const handleBringSelectionDown = () => {
		const sel = getSortedSelection()

		if (!sel) return

		updateSelection();
		let minIndex = canvas.getObjects().indexOf(sel[0]);
		let toindex = Math.max(0, minIndex-1)

		console.log("mvoeobjectdown")
		sel.forEach((obj, index) => {
			moveObjectDownToIndex(obj, toindex)
			console.log(obj.type, toindex)
			toindex += 1
		})

		updateLayers();
		updateSelection();
		canvas.renderAll()
	};
	
	const handleBringSelectionBack = () => {
		if (!selection) return

		getSortedSelection().toReversed().forEach((obj, index) => {
			canvas.sendObjectToBack(obj)
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
					<button className="bg-blue-50 p-2 rounded-2xl cursor-pointer select-none" onClick={handleBringSelectionUp}><LuChevronUp></LuChevronUp></button>
					<button className="bg-blue-50 p-2 rounded-2xl cursor-pointer select-none" onClick={handleBringSelectionDown}><LuChevronDown></LuChevronDown></button>
					<button className="bg-blue-50 p-2 rounded-2xl cursor-pointer select-none" onClick={handleBringSelectionFront}><LuChevronsUp></LuChevronsUp></button>
					<button className="bg-blue-50 p-2 rounded-2xl cursor-pointer select-none" onClick={handleBringSelectionBack}><LuChevronsDown></LuChevronsDown></button>
				</div>

				<ul className="flex flex-col gap-1">
					{layers.toReversed().map((layer, index) => (
						<li
							key={generateId()}
							className={`cursor-pointer flex items-center justify-between p-2 mb-1 rounded-2xl  ${
								selection.includes(layer) ? "bg-blue-300" : "bg-gray-200 "
							}`}
							onClick={handleLayerCakeOnClick(layers.length - 1 - index)}
						>
							<span className={`text-sm truncate select-none`}>
								{`${index}: ${layer.type}`}
							</span>
						</li>
					))}
				</ul>
			</div>
		</>
	);
};



