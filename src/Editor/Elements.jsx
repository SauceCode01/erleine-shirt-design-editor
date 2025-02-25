
import React, { useEffect, useRef, useState } from "react";
import {
	Canvas,
	Rect,
	Circle,
	Triangle,
	InteractiveFabricObject,
} from "fabric";
import Settings from "./Settings";
import CanvasSettings from "./CanvasSettings";

import { handleObjectMoving, clearGuidelines } from "./SnappingHelpers";
import LayersList from "./LayerList";
import LayerManager from "./LayerManager";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

const Elements = ({canvas}) => {

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
        setRr(rect)
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
  


  return (
    <>
    <div>
    	<button
					className="border-2 border-black rounded-full m-2 p-1"
					onClick={addRectangle}
				>
					Add Rectanglee
				</button>
				<button
					className="border-2 border-black rounded-full m-2 p-1"
					onClick={addCircle}
				>
					Add Circle
				</button>
				<button
					className="border-2 border-black rounded-full m-2 p-1"
					onClick={addTriangle}
				>
					Add Triangle
				</button>
			</div></>
  )
}

export default Elements