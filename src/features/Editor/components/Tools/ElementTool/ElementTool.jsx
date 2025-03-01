import React, { useContext } from "react";
import { Rect, Circle, Triangle } from "fabric";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import { CanvasContext } from "../../../Editor";


export const ElementTool = () => {
	const addRectangle = () => {
		if (canvas) {
			const rect = new Rect({
				left: 50,
				top: 50,
				fill: "#00eeee",
				width: 100,
				height: 100,
				selectable: true,
				stroke: "black",
				strokeWidth: 1,
				strokeUniform: true,
			});
			canvas.add(rect);
		}
	};

	const addCircle = () => {
		if (canvas) {
			const circle = new Circle({
				left: 150,
				top: 50,
				fill: "#00eeee",
				radius: 50,
				selectable: true,
				stroke: "black",
				strokeWidth: 1,
				strokeUniform: true,
			});
			canvas.add(circle);
		}
	};

	const addTriangle = () => {
		if (canvas) {
			const triangle = new Triangle({
				left: 250,
				top: 50,
				fill: "#00eeee",
				width: 100,
				height: 100,
				selectable: true,
				stroke: "black",
				strokeWidth: 1,
				strokeUniform: true,
			});
			canvas.add(triangle);
		}
	};

	const canvasContext = useContext(CanvasContext);
	const canvas = canvasContext.canvas;

	return (
		<>
			<div className="flex flex-col w-full ">
				<TabGroup>
					<TabList className="flex flex-row justify-around pb-2">
						<Tab className="">All</Tab>
						<Tab className="">Shapes</Tab>
						<Tab className="">Graphics</Tab>
						<Tab className="">Photos</Tab>
					</TabList>
					<div className="p-2 bg-gray-300">SEARCH BAR</div>
					<TabPanels>
						<TabPanel>Content 1</TabPanel>
						<TabPanel>
							<div>WIP: SHAPES TAB</div>
							<button
								className="bg-gray-50 hover:bg-gray-300 m-1 rounded-2xl w-25 aspect-square p-5"
								onClick={addRectangle}
							>
								<div className="w-full aspect-square border-2 bg-black border-black"></div>
							</button>
							<button
								className="bg-gray-50 hover:bg-gray-300 m-1 rounded-2xl w-25 aspect-square p-5"
								onClick={addCircle}
							>
								<div className="w-full aspect-square border-2 bg-black rounded-[50%] border-black"></div>
							</button>
							<button
								className="bg-gray-50 hover:bg-gray-300 m-1 rounded-2xl w-25 aspect-square p-5"
								onClick={addTriangle}
							>
								<div className="m-auto w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-b-[50px] border-b-black"></div>
							</button>
						</TabPanel>
						<TabPanel>WIP: GRAPHICS TAB</TabPanel>
						<TabPanel>WIP: PHOTOS TAB</TabPanel>
					</TabPanels>
				</TabGroup>
			</div>
		</>
	);
}; 
