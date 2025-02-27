import React from 'react'

const FileSettings = () => {
  
	const handleDownload = () => {
		if (!bg) {
			console.log("no download area specified");
			return;
		}
		if (!canvas) return;
		if (!rr) return;
		const bbg = canvas.getObjects().filter((obj) => {
			obj.id ? obj.id.startsWith("background-") : false;
		});
		const vp = canvas.viewportTransform;
		const iiiii = {
			left: vp[4],
			top: vp[5],
			width: vp[0] * 500,
			height: vp[3] * 500,
			format: "png",
			quality: 1,
		};
		console.log(iiiii, canvas.viewportTransform, canvas.getZoom());
		const dataUrl = canvas.toDataURL(iiiii);

		const link = document.createElement("a");
		link.href = dataUrl;
		link.download = "download.png";
		link.click();
	};


  return (
    <>
    
			<button onClick={handleDownload}>DOWNLOAD</button></>
  )
}

export default FileSettings