import { Canvas } from "fabric";
import { useEffect,useState } from "react";

function LayersList({ canvas }) {
	const [layers, setLayers] = useState([]);
	const [selectedLayer, setSelectedLayer] = useState(null);

	const addIdToObject = (object) => {
		if (!object.id) {
			const timestamp = new Date().getTime();
			object.id = `${object.type}_${timestamp}`;
		}
	};

	Canvas.prototype.updateZIndices = function () {
		const objects = this.getObjects();
		objects.forEach((obj, index) => {
			addIdToObject(obj);
			obj.zIndex = index;
		});
	};

	const updateLayers = () => {
		if (canvas) {
			canvas.updateZIndices();
			const objects = canvas
				.getObjects()
				.filter(
					(obj) =>
						!(
							obj.id.startsWith("vertical-") || obj.id.startsWith("horizontal-")
						)
				)
				.map((obj) => ({ id: obj.id, zIndex: obj.zIndex, type: obj.type }));

			setLayers([...objects].reverse());
		}
	};

	const handleObjectSelected = (e) => {
		const selectedObject = e.selected ? e.selected[0] : null;
		if (selectedObject) {
			setSelectedLayer(selectedObject.id);
		} else {
			setSelectedLayer(null);
		}
	};

	const selectLayerInCanvas = (layerId) => {
		const object = canvas.getObjects().find((obj) => obj.id === layerId);
		if (object) {
			canvas.setActiveObject(object);
			canvas.renderAll();
		}
	};

	useEffect(() => {
		if (canvas) {
			canvas.on("object:added", updateLayers);
			canvas.on("object:removed", updateLayers);
			canvas.on("object:modified", updateLayers);

			canvas.on("selection:created", handleObjectSelected);
			canvas.on("selection:updated", handleObjectSelected);
			canvas.on("selection:cleared", handleObjectSelected);

			updateLayers();

			return () => {
				canvas.off("object:added", updateLayers);
				canvas.off("object:removed", updateLayers);
				canvas.off("object:modified", updateLayers);

				canvas.off("selection:created", handleObjectSelected);
				canvas.off("selection:updated", handleObjectSelected);
				canvas.off("selection:cleared", handleObjectSelected);
			};
		}
	}, [canvas]);

	return (
		<>
			<div className="p-6 border-1 border-black rounded-2xl">
				<ul>
					{layers.map((layer) => (
						<li
							onClick={() => selectLayerInCanvas(layer.id)}
							className={`border-1 border-black ${layer.id === selectedLayer ? "selected-layer bg-blue-300" : ""}`}
							key={layer.id}
						>
							{layer.type} {layer.zIndex}
						</li>
					))}
				</ul>
			</div>
		</>
	);
}

export default LayersList;
