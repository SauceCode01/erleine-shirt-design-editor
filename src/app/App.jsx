import React from "react";
import TestComponent from "../components/TestComponent";
import Editor from "../features/Editor";


const App = () => {
	return (
		<>
			<div className="bg-gray-200 w-full p-5">
				<div className="bg-white w-[90vw] m-auto p-5 shadow-2xl">
					<Editor ></Editor>

					<div className="bg-orange-300 m-5 shadow-2xl aspect-square">hello world </div>
					<div className="bg-orange-300 m-5 shadow-2xl aspect-square">hello world </div>
					<div className="bg-orange-300 m-5 shadow-2xl aspect-square">hello world </div>
				</div>
			</div>
		</>
	);
};

export default App;
