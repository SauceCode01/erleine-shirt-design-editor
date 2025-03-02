import React from "react";
import { useContext } from "react";

import { ElementTool, LayerTool } from "../../Tools";

import { CanvasContext } from "../../../Editor";

import { LuCopyPlus, LuLayers, LuShapes, LuTrash } from "react-icons/lu";

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

	const duplicateSelected = () => {
	// 	const c =  canvas.getActiveObject().clone();
  // c.left += 100;
  // canvas.add(c);
  // canvas.renderAll();

		
		var activeObjects = canvas.getActiveObjects();


		if (activeObjects) {
			activeObjects.forEach(function (object) {
				const clone = object.clone().then((clone)=>{
					// clone.set({
					// 	left: object.left + 20,
					// 	top: object.top + 20,
					// 	evented: true, // Keeps interactions enabled
					// });
					canvas.add(clone)
				})

			});
		}
	};

	return (
		<>
			{canvasContext.haveActiveSelection ? (
				<>
					<div className="z-20  max-w-[90%] absolute top-5 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-lg ">
						<div className="flex flex-row justify-center gap-1 p-1 overflow-clip">
							<Input
								name="width"
								type="text"
								className="rounded-2xl bg-gray-50"
							></Input>
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

							<ToolBar>
								<ToolBarButtonContainer>
									<ToolBarButton>
										<div className="flex items-center justify-center rounded-2xl p-2 aspect-square hover:bg-gray-100">
											<LuShapes></LuShapes>
										</div>
									</ToolBarButton>
									<ToolBarButton>
										<div className="flex items-center justify-center rounded-2xl p-2 aspect-square hover:bg-gray-100">
											<LuLayers></LuLayers>
										</div>
									</ToolBarButton>
								</ToolBarButtonContainer>
								<ToolBarToolContainer>
									<ToolBarTool>
										<ElementTool></ElementTool>
									</ToolBarTool>
									<ToolBarTool>
										<LayerTool></LayerTool>
									</ToolBarTool>
								</ToolBarToolContainer>
							</ToolBar>
						</div>
					</div>
				</>
			) : (
				<></>
			)}
		</>
	);
}
