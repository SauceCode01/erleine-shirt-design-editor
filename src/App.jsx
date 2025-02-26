import React from "react";
import Canvas from "./Canvas";
import Editor from "./Editor/Editor";

const App = () => {
	return (
		<>
			<div className="w-full h-[100vh] p-5 bg-gray-300">
				<Editor></Editor>
			</div>
		</>
	);
};

export default App;
