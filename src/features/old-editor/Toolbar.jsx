import React, { useEffect, useState } from "react";
import Settings from "./Settings";
import CanvasSettings from "./CanvasSettings";

import LayerManager from "./LayerManager";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import Elements from "./Elements";
import FileSettings from "./FileSettings";

const Toolbar = ({ canvas }) => {
	const [tabs, setTabs] = useState([]);

	const [showPanels, setShowPanels] = useState(true);

	useEffect(()=>{
		setTabs([
			{ name: "Elements", element: <Elements canvas={canvas}></Elements> },
			{ name: "Settings", element: <Settings canvas={canvas}></Settings> },
			// {name: "CanvasSettings", element: <CanvasSettings canvas={canvas}></CanvasSettings>},
			{ name: "Layers", element: <LayerManager canvas={canvas}></LayerManager> },
			{ name: "File", element: <FileSettings canvas={canvas}></FileSettings> },
		])
	})


	return (
		<>
			<TabGroup vertical className="flex flex-row-reverse h-full">
				<TabList className="flex flex-col justify-start space-y-2 bg-gray-300 h-full">
					{tabs.map((tab) => {
						return <Tab className="p-2 data-[selected]:bg-white">
							{tab.name}
						</Tab>;
					})}
				</TabList>

				{
					showPanels?
					<TabPanels>
						{tabs.map((tab) => {
							return <TabPanel className="bg-gray-200 shadow-2xl">
								{tab.element}
							</TabPanel>;
						})}
					</TabPanels>
					:""
				}
			</TabGroup>
			{/* <div className=" right-0 top-0 height-full w-[20%] bg-amber-300">
			
			</div> */}
			{/* <button onClick={()=>setShowPanels(!showPanels)}>Toggle</button> */}
		</>
	);
};

export default Toolbar;
