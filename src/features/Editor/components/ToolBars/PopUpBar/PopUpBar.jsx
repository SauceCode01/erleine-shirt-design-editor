import React from "react";
import { useContext } from "react";

import { ElementTool, LayerTool, PropertiesTool } from "../../Tools";

import { CanvasContext } from "../../../Editor";

import {
	LuClipboardCopy,
	LuClipboardPaste,
	LuCopyPlus,
	LuLayers,
	LuSettings,
	LuSettings2,
	LuShapes,
	LuTrash,
} from "react-icons/lu";

import { ActiveSelection } from "fabric";

import {
	ToolBar,
	ToolBarButtonContainer,
	ToolBarButton,
	ToolBarToolContainer,
	ToolBarTool,
} from "../../ToolManager";
import { Input } from "@headlessui/react";
export function PopUpBar() {
	const canvasContext = useContext(CanvasContext);
	const canvas = canvasContext.canvas;

	const deleteSelected = () => {
		var activeObjects = canvas.getActiveObjects();

		if (activeObjects) {
			activeObjects.forEach(function (object) {
				canvas.remove(object);
				canvas.discardActiveObject(); // Clear selection
				canvas.requestRenderAll(); // Rerender canvas
			});
		}
	};

	const copy = () => {
		canvas
			.getActiveObject()
			.clone()
			.then((cloned) => {
				canvasContext._clipBoard.current = cloned;
			});

		console.log("copied to clipboard");
	};

	const paste = async () => {
		if (!canvasContext._clipBoard.current) {
			console.log("nothing on clipboard");
			return;
		}
		// clone again, so you can do multiple copies.
		const clonedObj = await canvasContext._clipBoard.current.clone();
		canvas.discardActiveObject();
		clonedObj.set({
			left: clonedObj.left + 10,
			top: clonedObj.top + 10,
			evented: true,
		});
		if (clonedObj instanceof ActiveSelection) {
			// active selection needs a reference to the canvas.
			clonedObj.canvas = canvas;
			clonedObj.forEachObject((obj) => {
				canvas.add(obj);
			});
			// this should solve the unselectability
			clonedObj.setCoords();
		} else {
			canvas.add(clonedObj);
		}
		canvasContext._clipBoard.current.top += 10;
		canvasContext._clipBoard.current.left += 10;
		canvas.setActiveObject(clonedObj);
		canvas.requestRenderAll();

		console.log("pasted from clipboard");
	};

	const duplicateSelected = () => {
		let _clipboard = null;

		canvas
			.getActiveObject()
			.clone()
			.then((clonedObj) => {
				canvas.discardActiveObject();
				clonedObj.set({
					left: clonedObj.left + 10,
					top: clonedObj.top + 10,
					evented: true,
				});
				if (clonedObj instanceof ActiveSelection) {
					// active selection needs a reference to the canvas.
					clonedObj.canvas = canvas;
					clonedObj.forEachObject((obj) => {
						canvas.add(obj);
					});
					// this should solve the unselectability
					clonedObj.setCoords();
				} else {
					canvas.add(clonedObj);
				}
				canvas.setActiveObject(clonedObj);
			});
	};

	return (
		<>
			{canvasContext.haveActiveSelection ? (
				<>
					<div className="z-20  max-w-[90%] absolute top-5 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg ">
						<div className="flex flex-row justify-center gap-1 p-1 overflow-clip text-xl">
							{canvasContext.haveActiveSelection ? (
								<>
									{/* DELETE BUTTON  */}
									<div
										className="flex items-center justify-center rounded-2xl p-2 aspect-square hover:bg-gray-100"
										onClick={deleteSelected}
									>
										<LuTrash></LuTrash>
									</div>

									{/* DUPLICATE BUTTON  */}
									<div
										className="flex items-center justify-center rounded-2xl p-2 aspect-square hover:bg-gray-100"
										onClick={duplicateSelected}
									>
										<LuCopyPlus></LuCopyPlus>
									</div>

									{/* COPY BUTTON  */}
									<div
										className="flex items-center justify-center rounded-2xl p-2 aspect-square hover:bg-gray-100"
										onClick={copy}
									>
										<div className="relative w-full h-full">
											<LuClipboardCopy></LuClipboardCopy>
										</div>
									</div>

									<div
										className="flex items-center justify-center rounded-2xl p-2 aspect-square hover:bg-gray-100"
										onClick={paste}
									>
										<LuClipboardPaste></LuClipboardPaste>
									</div>

									<ToolBar>
										<ToolBarButtonContainer>
											<ToolBarButton>
												<div
													className="flex items-center justify-center rounded-2xl p-2 aspect-square hover:bg-gray-100"
													onClick={paste}
												>
													<LuSettings2></LuSettings2>
												</div>
											</ToolBarButton>
										</ToolBarButtonContainer>
										<ToolBarToolContainer>
											<ToolBarTool>
												<PropertiesTool></PropertiesTool>
											</ToolBarTool>
										</ToolBarToolContainer>
									</ToolBar>
								</>
							) : (
								<></>
							)}
						</div>
					</div>
				</>
			) : (
				<></>
			)}
		</>
	);
}
