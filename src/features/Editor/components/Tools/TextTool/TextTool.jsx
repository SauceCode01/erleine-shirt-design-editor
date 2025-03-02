import React, { useContext } from "react";

import { CanvasContext } from "../../../Editor";
import { IText } from "fabric";

export const TextTool = () => {
	const canvasContext = useContext(CanvasContext);
	const canvas = canvasContext.canvas;

	const textPresets = {
    title: {
      text: "Title",
      preset: {
        fontSize: 64,
        fill: "black",
        fontFamily: "Arial",
        fontWeight: "bold",
        selectable: true,
        left: 100,
        top: 100,
      },
    },
    subtitle: {
      text: "Subtitle",
      preset: {
        fontSize: 48,
        fill: "#333",
        fontFamily: "Arial",
        fontWeight: "bold",
        selectable: true,
        left: 100,
        top: 100,
      },
    },
    header: {
      text: "Header",
      preset: {
        fontSize: 36,
        fill: "#444",
        fontFamily: "Arial",
        fontWeight: "bold",
        selectable: true,
        left: 100,
        top: 100,
      },
    },
    subheader: {
      text: "Subheader",
      preset: {
        fontSize: 28,
        fill: "#555",
        fontFamily: "Arial",
        fontWeight: "bold",
        selectable: true,
        left: 100,
        top: 100,
      },
    },
    paragraph: {
      text: "Paragraph",
      preset: {
        fontSize: 24,
        fill: "black",
        fontFamily: "Arial",
        fontWeight: "normal",
        selectable: true,
        left: 100,
        top: 100,
      },
    },
    caption: {
      text: "Caption",
      preset: {
        fontSize: 16,
        fill: "#555",
        fontFamily: "Arial",
        fontWeight: "italic",
        selectable: true,
        left: 100,
        top: 100,
      },
    },
  };

	const addText =
		(preset = textPresets.paragraph) =>
		() => {
			const text = new IText(preset.text, { ...(preset.preset) });

			canvas.add(text);
			canvas.setActiveObject(text);
			canvas.renderAll();
		};

	return (
		<>
			<div>TextTool</div>

			<div>
				<div className="flex flex-col w-full IAMELEMENTTOOL">
					<div className="p-2 bg-gray-300">SEARCH BAR</div>
				</div>
			</div>

      <br></br>

      <div className="flex flex-col gap-2">
        <div className="w-full p-2 rounded-2xl bg-blue-100" onClick={addText(textPresets.title)}>Title</div>
        <div className="w-full p-2 rounded-2xl bg-blue-100" onClick={addText(textPresets.subtitle)}>Subtitle</div>
        <div className="w-full p-2 rounded-2xl bg-blue-100" onClick={addText(textPresets.header)}>Header</div>
        <div className="w-full p-2 rounded-2xl bg-blue-100" onClick={addText(textPresets.subheader)}>Subheader</div>
        <div className="w-full p-2 rounded-2xl bg-blue-100" onClick={addText(textPresets.paragraph)}>Paragraph</div>
        <div className="w-full p-2 rounded-2xl bg-blue-100" onClick={addText(textPresets.caption)}>Caption</div>
      </div>
			



      
				{/* search bar // search font 
				text box
					"add text" // add content of text box 
				basic text presets 
					title
					subtitle
					heading
				random text presets */}
		</>
	);
};
