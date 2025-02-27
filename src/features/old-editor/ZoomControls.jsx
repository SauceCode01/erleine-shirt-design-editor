import React from "react";

import { useEffect } from "react";

const ZoomControls = ({ zoom, setZoom, containerElement }) => {
	useEffect(() => {
		// had to add the event listener here because:
		// "Unable to preventDefault inside passive event listener invocation."
		const container = containerElement.current;
		if (!container) return;

		container.addEventListener("wheel", handleScrollWheel);

		return () => {
			container.removeEventListener("wheel", handleScrollWheel);
		};
	}, []);

	const handleScrollWheel = (e) => {
		if (!e.ctrlKey) return;

		e.preventDefault();
		e.stopPropagation();

		let delta = -e.deltaY / 100;
		setZoom((prevZoom) => {
			// canvasRef.current.setZoom(prevZoom * 1.1 ** delta)
			return prevZoom * 1.1 ** delta;
		});
		// var newzoom = prevZoom * 1.1 ** step

		return;

		if (delta > 0) handleZoomIn(Math.abs(delta));
		else handleZoomOut(Math.abs(delta));
	};

	const handleZoomIn = ({ step = 1 }) => {
		setZoom((prevZoom) => prevZoom * 1.1 ** step, 3);
	};

	const handleZoomOut = ({ step = 1 }) => {
		setZoom((prevZoom) => prevZoom / 1.1 ** step, 0.5);
	};

	return (
		<>
			<div>ZoomControls</div>
			<div className="p-2 bg-amber-400 shadow-2xl m-2 flex flex-row gap-1">
				<button className="p-2 bg-gray-400" onClick={handleZoomIn}>
					+
				</button>
				<button className="p-2 bg-gray-400" onClick={handleZoomOut}>
					-
				</button>
				<div>ZOOM: {zoom.toFixed(2)}</div>
			</div>
		</>
	);
};

export default ZoomControls;
