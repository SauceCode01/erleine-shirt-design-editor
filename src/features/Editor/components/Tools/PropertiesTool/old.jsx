import { Input } from "@headlessui/react";
import { Group } from "fabric";
import React, { useContext, useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";

import { CanvasContext } from "../../../Editor";

export const PropertiesTool = () => {
  const [selectedObject, setSelectedObject] = useState(null);
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [color, setColor] = useState("");

  const canvasContext = useContext(CanvasContext);
  const canvas = canvasContext.canvas

  useEffect(() => {
    if (canvas) {
      canvas.on("selection:created", (event) => {
        handleSelection( );
      });

      canvas.on("selection:updated", (event) => {
        handleSelection( );
      });

      canvas.on("selection:cleared", (event) => {
        handleSelection( );
      });

      canvas.on("object:modified", (event) => {
        handleSelection( );
      });

      canvas.on("object:scaling", (event) => {
        handleSelection( );
      });

      handleSelection()
    }
  }, [canvas]);

  const handleSelection = () => {
    const newSelection = canvas.getActiveObjects();
    setSelectedObject(newSelection);
    
    if (newSelection){
      setWidth(Math.round(newSelection.width * newSelection.scaleX));
      setHeight(Math.round(newSelection.height * newSelection.scaleY));
      setColor(newSelection.fill);
    }
  };

  const handleWidthChange = (e) => {
    const value = e.target.value;
    const intValue = parseInt(value, 10);

    if (selectedObject) {
      selectedObject.set({ width: intValue / selectedObject.scaleX });
      setWidth(intValue);
      selectedObject.setCoords();
      canvas.renderAll();
    }
  };

  const handleHeightChange = (e) => {
    const value = e.target.value;
    const intValue = parseInt(value, 10);

    if (selectedObject) {
      selectedObject.set({ height: intValue / selectedObject.scaleY });
      setHeight(intValue);
      selectedObject.setCoords();
      canvas.renderAll();
    }
  };

  const handleColorChange = (e) => {
    if (selectedObject) {
      selectedObject.set({ fill: e });
      setColor(e);
      canvas.renderAll();
    }
  };

  return (
    <>
      <div
        className={
          selectedObject
            ? "flex flex-col p-6 border-1 border-black rounded-2xl"
            : "hidden"
        }
      >
        Width
        <input
          className="border-1 border-black"
          value={width}
          type="text"
          onChange={handleWidthChange}
        ></input>
        Height
        <input
          className="border-1 border-black"
          value={height}
          type="text"
          onChange={handleHeightChange}
        ></input>
        Color
        <label>{color}</label>
        <HexColorPicker
          color={color}
          onChange={handleColorChange}
        ></HexColorPicker>
      </div>
    </>
  );
};
 
