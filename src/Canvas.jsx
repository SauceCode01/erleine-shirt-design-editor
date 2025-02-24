import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";

const Canvas = () => {
  const canvasRef = useRef(null);
  const fabricCanvas = useRef(null);
  const imgRef = useRef(null);

  const [selectedObject, setSelectedObject] = useState(null);

  useEffect(() => {
    // Initialize Fabric.js Canvas
    fabricCanvas.current = new fabric.Canvas(canvasRef.current, {
      backgroundColor: "#f8f8f8",
      width: 600,
      height: 400,
      preserveObjectStacking: true,
    });

    fabricCanvas.current.preserveObjectStacking = true;


    fabricCanvas.current.on("selection:created", (event) => {
      setSelectedObject(event.selected);
      console.log("selected", event.selected)
      
    });

    fabricCanvas.current.on("selection:updated", (event) => {
      setSelectedObject(event.selected); 
      console.log("selected", event.selected)
      
    });

    fabricCanvas.current.on("selection:cleared", () => {
      setSelectedObject(null);
    });


    return () => {
      fabricCanvas.current.dispose();
    };
  }, []);


  const addRectangle = () => {
    const rect = new fabric.Rect({
      left: 50,
      top: 50,
      fill: "blue",
      width: 100,
      height: 100,
      selectable: true,
      stroke: "black",     
      strokeWidth: 1,
    });
    fabricCanvas.current.add(rect);
  };

  const addCircle = () => {
    const circle = new fabric.Circle({
      left: 150,
      top: 50,
      fill: "red",
      radius: 50,
      selectable: true,
      stroke: "black",     
      strokeWidth: 1,
    });
    fabricCanvas.current.add(circle);
  };

  const addTriangle = () => {
    const triangle = new fabric.Triangle({
      left: 250,
      top: 50,
      fill: "green",
      width: 100,
      height: 100,
      selectable: true,
      stroke: "black",     
      strokeWidth: 1,
    });
    fabricCanvas.current.add(triangle);
  };

  const addImage = () => {
    const imageUrl = "http://fabricjs.com/assets/pug_small.jpg"; // Replace with your image URL
    fabric.FabricImage.fromURL(imageUrl).then((img) => {
      img.set({
        left: 100,
        top: 100,
        scaleX: 0.5, // Scale the image
        scaleY: 0.5,
        selectable: true, // Allow dragging
      });


      fabricCanvas.current.add(img);
      fabricCanvas.current.renderAll();
    }) 
  }

  const addText = () => {
    const text = new fabric.IText("Edit me", {
      left: 100,
      top: 100,
      fontSize: 24,
      fill: "black",
      fontFamily: "Arial",
      fontWeight: "bold",
      selectable: true,
    });

    fabricCanvas.current.add(text);
    fabricCanvas.current.setActiveObject(text);
    fabricCanvas.current.renderAll();
  };

  const handleDrop = (event) => {
    event.preventDefault();

    console.log("handle drop triggered")

    const files = event.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      
      reader.onload = (e) => {

        fabric.FabricImage.fromURL(e.target.result).then((img) => {
          img.set({
            left: 100,
            top: 100,
            scaleX: 0.5, // Scale the image
            scaleY: 0.5,
            selectable: true, // Allow dragging
          });
    
    
          fabricCanvas.current.add(img);
          fabricCanvas.current.renderAll();
        }) 
      };

      reader.readAsDataURL(file);
    }
  };

  const addSvg = () => {
    fabric.loadSVGFromURL('/threeStars.svg',function(objects, options){
      console.log("1")
      var svgData = fabric.util.groupSVGElements(objects, options);
      console.log("2")
      fabricCanvas.current.add(svgData);
      console.log(svgData, "hello?")
    });
    
  };


   // Move object to front
   const bringToFront = () => {
    if (selectedObject) {
      selectedObject.forEach((sel)=> {
        fabricCanvas.current.bringObjectToFront(sel)
      })
    }
  };


  // Move object one layer up
  const bringForward = () => {
    if (selectedObject) {
      selectedObject.forEach((sel)=> {
        fabricCanvas.current.bringObjectForward(sel)
      })
    }
  };

  // Move object to back
  const sendToBack = () => {
    if (selectedObject) {
      selectedObject.forEach((sel)=> {
        fabricCanvas.current.sendObjectToBack(sel)
      })
    }
  };


  // Move object one layer down
  const sendBackwards = () => {
    if (selectedObject) {
      selectedObject.forEach((sel)=> {
        fabricCanvas.current.sendObjectBackwards(sel)
      })
    }
  };

  return (
    <div className="flex flex-col items-center "  onDragOver={(e) => e.preventDefault()} 
    onDrop={handleDrop}>
      <div>
      <button className="m-2 p-2 bg-blue-500 text-white rounded" onClick={addSvg}>Add SVG</button>
      <button className="m-2 p-2 bg-blue-500 text-white rounded" onClick={addText}>Add Text</button>
      <button className="m-2 p-2 bg-blue-500 text-white rounded" onClick={addImage}>Add Image</button>
        <button className="m-2 p-2 bg-blue-500 text-white rounded" onClick={addRectangle}>Add Rectangle</button>
        <button className="m-2 p-2 bg-red-500 text-white rounded" onClick={addCircle}>Add Circle</button>
        <button className="m-2 p-2 bg-green-500 text-white rounded" onClick={addTriangle}>Add Triangle</button>
        <button className="m-2 p-2 bg-gray-500 text-white rounded" onClick={bringToFront} disabled={!selectedObject}>Bring to Front</button>
        <button className="m-2 p-2 bg-gray-500 text-white rounded" onClick={sendToBack} disabled={!selectedObject}>Send to Back</button>
        <button className="m-2 p-2 bg-gray-500 text-white rounded" onClick={bringForward} disabled={!selectedObject}>Move Up</button>
        <button className="m-2 p-2 bg-gray-500 text-white rounded" onClick={sendBackwards} disabled={!selectedObject}>Move Down</button>
      </div>
      <canvas ref={canvasRef} id="fabricCanvas" className=" border-1 border-black"/>
      <img ref={imgRef}></img>
    </div>
  );
};

export default Canvas;
