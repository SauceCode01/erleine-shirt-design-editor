import React from "react";
import { useState, useRef, useEffect, createContext } from "react";

export const ToolContext = createContext();

export const ToolManager = ({ children }) => {
	const [foldToolContainer, setFoldToolContainer] = useState(true);
	const [activeTool, setActiveTool] = useState(null);
	const activeButtonRef = useRef(null);

	// button behavior
	const handleToolButtonClick = (button, tool) => () => {
		if (activeButtonRef.current == button) {
			// reminder: activeButtonRef is a ref. using useState causes things to get called up twice and I do not know why.
			// clicked on current selected button
			// toggle fold
			setFoldToolContainer((prev) => !prev);
		} else {
			// clicked on a different button
			// equip tool, open tool container, and update active button
			setActiveTool(tool);
			setFoldToolContainer(false)
			activeButtonRef.current = button; // returning the new ative button
		}
	};

	return (
		<ToolContext.Provider
			value={{
				foldToolContainer,
				activeTool,
				activeButtonRef,
				setFoldToolContainer,
				setActiveTool,
				handleToolButtonClick,
			}}
		>
			{children}
		</ToolContext.Provider>
	);
};
 