import { Line } from "fabric";

const snappingDistance = 20;


export const handleObjectMoving = (canvas, obj, guidelines, setGuidelines) => {
	const canvasWidth = canvas.width;
	const canvasHeight = canvas.height;

	const left = obj.left;
	const top = obj.top;
	const right = left + obj.width * obj.scaleX;
	const bottom = top + obj.height * obj.scaleY;

	const centerX = left + (obj.width * obj.scaleX) / 2;
	const centerY = top + (obj.height * obj.scaleY) / 2;

	let newGuidelines = [];
	clearGuidelines(canvas);

	let snapped = false;
	let snapv = false
	let snaph = false

	if (Math.abs(left) < snappingDistance) {
		obj.set({ left: 0 });
		if (!guidelineExists(canvas, "vertical-left")) {
			const line = createVerticalGuideline(canvas, 0, "vertical-left");
			newGuidelines.push(line);
			canvas.add(line);
		}
		snapped = true;
		snapv = true
	}

	if (Math.abs(right - canvasWidth) < snappingDistance) {
		obj.set({ left: canvasWidth - obj.width * obj.scaleX });
		if (!guidelineExists(canvas, "vertical-right")) {
			const line = createVerticalGuideline(
				canvas,
				canvasWidth,
				"vertical-right"
			);
			newGuidelines.push(line);
			canvas.add(line);
		}
		snapped = true;
		snapv = true
	}

	if (Math.abs(top) < snappingDistance) {
		obj.set({ top: 0 });
		if (!guidelineExists(canvas, "horizontal-top")) {
			const line = createHorizontalGuideline(canvas, 0, "horizontal-top");
			newGuidelines.push(line);
			canvas.add(line);
		}
		snapped = true;
		snaph = true
	}

	if (Math.abs(bottom - canvasHeight) < snappingDistance) {
		obj.set({ top: canvasHeight - obj.height * obj.scaleY });
		if (!guidelineExists(canvas, "horizontal-bottom")) {
			const line = createHorizontalGuideline(
				canvas,
				canvasHeight,
				"horizontal-bottom"
			);
			newGuidelines.push(line);
			canvas.add(line);
		}
		snapped = true;
		snaph = true
	}

	if (Math.abs(centerX - canvasWidth / 2) < snappingDistance) {
		obj.set({ left: canvasWidth / 2 - (obj.width * obj.scaleX) / 2 });
		if (!guidelineExists(canvas, "vertical-center")) {
			const line = createVerticalGuideline(
				canvas,
				canvasWidth / 2,
				"vertical-center"
			);
			newGuidelines.push(line);
			canvas.add(line);
		}
		snapped = true;
		snapv = true
	}

	if (Math.abs(centerY - canvasHeight / 2) < snappingDistance) {
		obj.set({ top: canvasHeight / 2 - (obj.height * obj.scaleY) / 2 });
		if (!guidelineExists(canvas, "horizontal-center")) {
			const line = createHorizontalGuideline(
				canvas,
				canvasHeight / 2,
				"horizontal-center"
			);
			newGuidelines.push(line);
			canvas.add(line);
		}
		snapped = true;
		snaph = true
	}

	// snapping on other objects
	var objects = canvas.getObjects();
	var activeObjects = canvas.getActiveObjects();

	var comparisonObjects = objects.filter((obj) => {
		var selected = activeObjects.includes(obj);
		var line = obj.type === "line";
		return !selected && !line;
	});
	comparisonObjects.forEach((cc) => {
		// snap top
		if (Math.abs(top - cc.top) < snappingDistance && !snaph) {
			obj.set({ top: cc.top });

			const line = createHorizontalGuideline(
				canvas,
				cc.top,
				`horizontal-${cc.top}`
			);
			newGuidelines.push(line);
			canvas.add(line);

			snapped = true;
			snaph = true
		}

		
		// snap bot
		if (Math.abs(bottom - (cc.top + cc.height*cc.scaleY)) < snappingDistance && !snaph) {
			obj.set({ top: top +  (cc.top + cc.height*cc.scaleY) - bottom});

			const line = createHorizontalGuideline(
				canvas,
				cc.top + cc.height*cc.scaleY,
				`horizontal-${cc.top + cc.height*cc.scaleY}`
			);
			newGuidelines.push(line);
			canvas.add(line);

			snapped = true;
			snaph = true
		}




		// snap left
		if (Math.abs(left - cc.left) < snappingDistance && !snapv) {
			obj.set({ left: cc.left });

			const line = createVerticalGuideline(
				canvas,
				cc.left,
				`vertical-${cc.left}`
			);
			newGuidelines.push(line);
			canvas.add(line);

			snapped = true;
			snapv = true
		}

		
		// snap right
		if (Math.abs(right - (cc.left + cc.width*cc.scaleX)) < snappingDistance && !snapv) {
			obj.set({ left: left +  (cc.left + cc.width*cc.scaleX) - right});

			const line = createVerticalGuideline(
				canvas,
				cc.left + cc.width*cc.scaleX,
				`horizontal-${cc.left + cc.width*cc.scaleX}`
			);
			newGuidelines.push(line);
			canvas.add(line);

			snapped = true;
			snapv = true
		}


		
		// snap centerx
		if (Math.abs(centerX - (cc.left + cc.width*cc.scaleX/2)) < snappingDistance && !snapv) {
			obj.set({ left: left +  (cc.left + cc.width*cc.scaleX/2) - centerX});

			const line = createVerticalGuideline(
				canvas,
				cc.left + cc.width*cc.scaleX/2,
				`horizontal-${cc.left + cc.width*cc.scaleX/2}`
			);
			newGuidelines.push(line);
			canvas.add(line);

			snapped = true;
			snapv = true
		}

		
		
		// snap centerY
			snaph = true
		if (Math.abs(centerY - (cc.top + cc.height*cc.scaleY/2)) < snappingDistance && !snaph) {
			obj.set({ top: top +  (cc.top + cc.height*cc.scaleY/2) - centerY});

			const line = createHorizontalGuideline(
				canvas,
				cc.top + cc.height*cc.scaleY/2,
				`horizontal-${cc.top + cc.height*cc.scaleY/2}`
			);
			newGuidelines.push(line);
			canvas.add(line);

			snapped = true;
		}

	});

	if (!snapped) {
		clearGuidelines(canvas);
	} else {
		setGuidelines(newGuidelines);
	}

	canvas.renderAll();
};

export const createVerticalGuideline = (canvas, x, id) => {
	return new Line([x, 0, x, canvas.height], {
		id,
		stroke: "red",
		strokeWidth: 1,
		selectable: false,
		evented: false,
		strokeDashArray: [5, 5],
		opacity: 0.8,
	});
};

export const createHorizontalGuideline = (canvas, y, id) => {
	return new Line([0, y, canvas.width, y], {
		id,
		stroke: "red",
		strokeWidth: 1,
		selectable: false,
		evented: false,
		strokeDashArray: [5, 5],
		opacity: 0.8,
	});
};

export const clearGuidelines = (canvas) => {
	const objects = canvas.getObjects("line");
	objects.forEach((obj) => {
		if (
			(obj.id && obj.id.startsWith("vertical-")) ||
			obj.id.startsWith("horizontal-")
		) {
			canvas.remove(obj);
		}
	});
	canvas.renderAll();
};

const guidelineExists = (canvas, id) => {
	const objects = canvas.getObjects("line");
	return objects.some((obj) => obj.id === id);
};
