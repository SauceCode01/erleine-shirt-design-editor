import React, { useEffect, useRef, useState } from "react";

const CanvasContainer = () => {
	const containerRef = useRef(null);
	const contentRef = useRef(null);
	const deltaZoom = useRef(0);
	const [zoom, setZoom] = useState(1);

	// Handles scroll zooming with CTRL + Wheel
	const handleScrollWheel = (e) => {
		if (!e.ctrlKey) return;

		e.preventDefault();
		e.stopPropagation();

		// const viewportRect = containerRef.current.getBoundingClientRect();
		// const contentRect = contentRef.current.getBoundingClientRect();
		// const mGlobalX = e.clientX;
		// const mGlobalY = e.clientY;

		// console.log(contentRect)

		
		let delta = -e.deltaY / 100;
		if (delta > 0) handleZoomIn(Math.abs(delta));
		else handleZoomOut(Math.abs(delta));
	};

	const handleZoomIn = (step = 1) => {
		setZoom((prevZoom) => Math.min(prevZoom * 1.1 ** step, 3));
	};

	const handleZoomOut = (step = 1) => {
		setZoom((prevZoom) => Math.max(prevZoom / 1.1 ** step, 0.5));
	};

	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		container.addEventListener("wheel", handleScrollWheel);

		return () => {
			container.removeEventListener("wheel", handleScrollWheel);
		};
	}, []);

	return (
		<>
			<div className="p-2 bg-amber-400 shadow-2xl m-2 flex flex-row gap-1">
				<button className="p-2 bg-gray-400" onClick={handleZoomIn}>
					+
				</button>
				<button className="p-2 bg-gray-400" onClick={handleZoomOut}>
					-
				</button>
				<div>ZOOM: {zoom.toFixed(2)}</div>
			</div>

			<div
				ref={containerRef}
				className="w-[50%] m-auto h-[80vh] overflow-auto bg-gray-100 relative border"
			>
				<div
					ref={contentRef}
					style={{ zoom: `${zoom}` }}
					className="bg-green-300 w-200 m-auto flex flex-col items-center"
				>
					{[...Array(5)].map((_, i) => (
						<div
							key={i}
							className="w-100 h-40 mb-5 bg-white shrink-0 border shadow-md"
						></div>
					))}
				</div>
			</div>
		</>
	);
};

export default CanvasContainer;
