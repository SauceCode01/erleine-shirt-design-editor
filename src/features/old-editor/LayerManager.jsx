import React from "react";

import { Canvas } from "fabric";

import { useState, useEffect } from "react";

const LayerManager = ({ canvas }) => {
	const [layers, setLayers] = useState([]);
	const [targets, setTargets] = useState([]);

	const generateId = (object) => {
		if (!object._id) {
			const timestamp = new Date().getTime();
			object._id = `object_${timestamp}`;
		}
		return object._id;
	};

	const updateLayers = () => {
		if (!canvas) return;

		const objects = canvas
			.getObjects()
			.filter((obj) =>
				obj.id
					? !(
							obj.id.startsWith("vertical-") || obj.id.startsWith("horizontal-") || obj.id.startsWith("background-")
					  )
					: true
			)
			.map((obj) => ({ id: generateId(obj), type: obj.type, obj: obj }));

		setLayers([...objects].reverse());
	};

	const handleObjectSelected = (e) => {
		if (e.selected) setTargets(e.selected.reverse());
		else {
			setTargets([]);
		}
	};

	useEffect(() => {
		if (!canvas) return;

		canvas.on("object:added", updateLayers);
		canvas.on("object:removed", updateLayers);
		canvas.on("object:modified", updateLayers);

		canvas.on("selection:created", handleObjectSelected);
		canvas.on("selection:updated", handleObjectSelected);
		canvas.on("selection:cleared", handleObjectSelected);

		return () => {
			canvas.off("object:added", updateLayers);
			canvas.off("object:removed", updateLayers);
			canvas.off("object:modified", updateLayers);

			canvas.off("selection:created", handleObjectSelected);
			canvas.off("selection:updated", handleObjectSelected);
			canvas.off("selection:cleared", handleObjectSelected);
		};
	}, [canvas]);

	const handleBringObjectForward = () => {
		targets.forEach((obj, index) => {
			canvas.bringObjectForward(obj);
		});
		updateLayers();
		console.log("forward");
		canvas.renderAll();
	};

	const handleSendObjectBackward = () => {
		targets.reverse().forEach((obj, index) => canvas.sendObjectBackwards(obj));
		updateLayers();
		canvas.renderAll();
	};

	const handleBringObjectToFront = () => {
		targets.reverse().forEach((obj, index) => canvas.bringObjectToFront(obj));
		updateLayers();
		canvas.renderAll();
	};
	const handleSendObjectToBack = () => {
		targets.forEach((obj, index) => canvas.sendObjectToBack(obj));
		updateLayers();
		canvas.renderAll();
	};

	// Toggle visibility
	const toggleVisibility = (obj) => {
		return () => {
			obj.set({ visible: !obj.visible });
			updateLayers();
			canvas.renderAll();
		};
	};

	// Toggle visibility
	const toggleSelectedVisibility = () => {
		targets.forEach((obj, index) => {
			obj.set({ visible: !obj.visible });
		});
		updateLayers();
		canvas.renderAll();
	};

	// Lock or unlock object
	const toggleLock = (obj) => {
		return (e) => {
			e.stopPropagation();
			obj.set({ selectable: !obj.selectable, evented: !obj.evented });
			if (!obj.selectable) canvas.discardActiveObject(obj);
			updateLayers();
			canvas.renderAll();
		};
	};

	const handleLayerClick = (layer) => (e) => {
		canvas.setActiveObject(layer.obj);
		canvas.renderAll();
	};

	return (
		<>
			<div className="p-4 bg-gray-100 rounded-lg shadow-md w-64">
				<h3 className="text-lg font-bold mb-2">Layers</h3>

				<button onClick={handleBringObjectForward}>🔼</button>
				<button onClick={handleSendObjectBackward}>🔽</button>
				<button onClick={handleBringObjectToFront}>🔝</button>
				<button onClick={handleSendObjectToBack}>🔙</button>

				<button onClick={toggleSelectedVisibility}>👁️</button>

				<ul>
					{layers.map((layer, index) => (
						<li
							key={layer.id}
							className={`cursor-pointer flex items-center justify-between p-2 mb-1 rounded  ${
								targets
									? targets.includes(layer.obj)
										? "border-1 border-black"
										: ""
									: ""
							}`}
							onClick={handleLayerClick(layer)}
						>
							<span className="text-sm truncate">
								{layer.type} {layer.id}
							</span>
							<div className="flex gap-1">
								<button onClick={toggleVisibility(layer.obj)}>
									{layer.obj.visible ? "👁️" : "🚫"}
								</button>
								<button
									onClick={toggleLock(layer.obj)}
									className={`${!layer.obj.selectable ? "bg-gray-600 " : ""}`}
								>
									{layer.obj.selectable ? "🔓" : "🔒"}
								</button>
							</div>
						</li>
					))}
				</ul>
			</div>
		</>
	);
};

export default LayerManager;
