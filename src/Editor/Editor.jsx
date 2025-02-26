import React, { useEffect, useRef, useState } from "react";

import CanvasContainer from "./CanvasContainer";
import Toolbar from "./Toolbar";


const Editor = () => {
	const [canvas, setCanvas] = useState(null)

	useEffect(()=>{
		if (canvas) {
			console.log(canvas)
		}
	})

	return (
		<>
			<h1>THIS IS THE EDITOR</h1>
			<CanvasContainer canvas={canvas} setCanvas={setCanvas}></CanvasContainer>
			<Toolbar canvas={canvas}></Toolbar>
		</>
	);
};

export default Editor;

// const useResizeWatcher = (onResize, elementRef) => {
// 	useEffect(() => {
// 		const observer = new ResizeObserver(() => {
// 			if (!elementRef.current) return;
// 			onResize(elementRef.current);
// 		});
// 		observer.observe(elementRef.current);
// 		return () => observer.disconnect();
// 	}, []);
// };

{
	/* <div className="w-full">
				<div
					ref={containerRef}
					className="w-full aspect-4/2 bg-black overflow-clip relative"
				>
					<div className="absolute top-0 left-0">
					</div>

					<div className="absolute top-0 right-0 h-full">
						<Toolbar canvas={canvas.current}></Toolbar>
					</div>
				</div>
			</div> */
}
