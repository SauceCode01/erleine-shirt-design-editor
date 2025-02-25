import React from "react";
import Settings from "./Settings";
import CanvasSettings from "./CanvasSettings";

import LayerManager from "./LayerManager";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import Elements from "./Elements";
import FileSettings from "./FileSettings";

const Toolbar = ({ canvas }) => {
	return (
		<>
			<div className=" right-0 top-0 height-full w-[20%] bg-amber-300">
				<TabGroup vertical className="flex flex-row-reverse">
					<TabList className="flex flex-col p-3">
						<Tab className="bg-blue-300 p-2 rounded-2xl data-[selected]:bg-white/10">
							Elements
						</Tab>
						<Tab className="bg-blue-300 p-2 rounded-2xl data-[selected]:bg-white/10">
							Settings
						</Tab>
						<Tab className="bg-blue-300 p-2 rounded-2xl data-[selected]:bg-white/10">
							CanvasSettings
						</Tab>
						<Tab className="bg-blue-300 p-2 rounded-2xl data-[selected]:bg-white/10">
							Layers
						</Tab>
						<Tab className="bg-blue-300 p-2 rounded-2xl data-[selected]:bg-white/10">
							File
						</Tab>
					</TabList>
					<TabPanels>
						<TabPanel className="bg-gray-200 shadow-2xl">
							<Elements canvas={canvas}></Elements>
						</TabPanel>
						<TabPanel className="bg-gray-200 shadow-2xl">
							<Settings canvas={canvas}></Settings>
						</TabPanel>
						<TabPanel className="bg-gray-200 shadow-2xl">
							<CanvasSettings canvas={canvas}></CanvasSettings>
						</TabPanel>
						<TabPanel className="bg-gray-200 shadow-2xl">
							<LayerManager canvas={canvas}></LayerManager>
						</TabPanel>
						<TabPanel className="bg-gray-200 shadow-2xl">
							<FileSettings canvas={canvas}></FileSettings>
						</TabPanel>
					</TabPanels>
				</TabGroup>
			</div>
		</>
	);
};

export default Toolbar;
