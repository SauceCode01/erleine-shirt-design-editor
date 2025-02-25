import { Line } from "fabric";
import { generateId } from "./Identification";

const snappingDistance = 20;

export const EnableSnapping = (canvas) => {
	canvas.on("object:moving", (event) =>
		handleObjectMoving(canvas, event.target)
	);

	canvas.on("object:modified", (event) => clearGuidelines(canvas));
};

const snapPoints = (movingValue, staticValue, guidelines) => {
	var difference = staticValue - movingValue;
	if (Math.abs(difference) < snappingDistance) {
		if (!guidelines.includes(staticValue)) guidelines.push(staticValue);

		return difference;
	}
	return 0;
};

const snapRangeWithPoint = (
	movingValue,
	movingWidth,
	staticValue,
	guidelines
) => {
	var centerSnapped = snapPoints(
		movingValue + movingWidth / 2,
		staticValue,
		guidelines
	);
	var startSnapped = snapPoints(
		movingValue,
		staticValue,
		guidelines
	);
	var endSnapped = snapPoints(
		movingValue + movingWidth,
		staticValue,
		guidelines
	);

	if (centerSnapped) return centerSnapped;
	if (startSnapped) return startSnapped;
	if (endSnapped) return endSnapped;
};

const snapRangeWithRange = (
	movingValue,
	movingWidth,
	staticValue,
	staticWidth,
	guidelines
) => {
	var snapToStart = snapRangeWithPoint(
		movingValue,
		movingWidth,
		staticValue,
		guidelines
	);

	var snapToEnd = snapRangeWithPoint(
		movingValue,
		movingWidth,
		staticValue + staticWidth,
		guidelines
	);

	var snapToCenter = snapRangeWithPoint(
		movingValue,
		movingWidth,
		staticValue + staticWidth / 2,
		guidelines
	);

	if (snapToStart) return snapToStart;
	if (snapToEnd) return snapToEnd;
	if (snapToCenter) return snapToCenter;
};

const snapBoxWithBox = (mx,my,mw,mh, sx,sy,sw,sh, vguide, hguide, target) => {
	var snapped = false;

	// snap x
	var snapx = snapRangeWithRange(
		mx,
		mw,

		sx,
		sw,
		vguide
	);
	if (snapx) {
		target.set({ left: mx + snapx });
		snapped = true;
	}

	var snapy = snapRangeWithRange(
		my,
		mh,

		sy,
		sh,
		hguide
	);
	if (snapy) {
		target.set({ top: my + snapy });
		snapped = true;
	}

	return snapped

}

const handleObjectMoving = (canvas, target) => {
	const canvasWidth = canvas.width;
	const canvasHeight = canvas.height;

	const boundingRect = target.getBoundingRect(true)

	const width = target.width * target.scaleX;
	const height = target.height * target.scaleY;

	const left = target.left;
	const top = target.top;
	const right = left + width;
	const bottom = top + height;

	const centerX = left + width / 2;
	const centerY = top + height / 2;

	let horizontalGuidelines = [];
	let verticalGuidelines = [];
	clearGuidelines(canvas);

	let snapped = false;
	let snapv = false;
	let snaph = false;

	// SNAP TO CANVAS
	snapped = snapped || snapBoxWithBox(left, top, width, height, 0,0,canvasWidth,canvasHeight, verticalGuidelines, horizontalGuidelines, target);
	

	// SNAP TO OTHER OBJECTS
	var objects = canvas.getObjects();
	var activeObjects = canvas.getActiveObjects();

	var comparisonObjects = objects.filter((obj) => {
		var selected = activeObjects.includes(obj);
		var line = obj.type === "line";
		var bg = obj.id? obj.id.startsWith("background") : false
		return !selected && !line && !bg;
	});

	comparisonObjects.forEach((obj) => {
		
		snapped = snapped || snapBoxWithBox(left, top, width, height, obj.left,obj.top,obj.width*obj.scaleX,obj.height*obj.scaleY, verticalGuidelines, horizontalGuidelines, target);
	})


	// comparisonObjects.forEach((cc) => {
	// 	// snap top
	// 	if (Math.abs(top - cc.top) < snappingDistance && !snaph) {
	// 		obj.set({ top: cc.top });

	// 		const line = createHorizontalGuideline(
	// 			canvas,
	// 			cc.top,
	// 			`horizontal-${cc.top}`
	// 		);
	// 		newGuidelines.push(line);
	// 		canvas.add(line);

	// 		snapped = true;
	// 		snaph = true;
	// 	}

	// 	// snap bot
	// 	if (
	// 		Math.abs(bottom - (cc.top + cc.height * cc.scaleY)) < snappingDistance &&
	// 		!snaph
	// 	) {
	// 		obj.set({ top: top + (cc.top + cc.height * cc.scaleY) - bottom });

	// 		const line = createHorizontalGuideline(
	// 			canvas,
	// 			cc.top + cc.height * cc.scaleY,
	// 			`horizontal-${cc.top + cc.height * cc.scaleY}`
	// 		);
	// 		newGuidelines.push(line);
	// 		canvas.add(line);

	// 		snapped = true;
	// 		snaph = true;
	// 	}

	// 	// snap left
	// 	if (Math.abs(left - cc.left) < snappingDistance && !snapv) {
	// 		obj.set({ left: cc.left });

	// 		const line = createVerticalGuideline(
	// 			canvas,
	// 			cc.left,
	// 			`vertical-${cc.left}`
	// 		);
	// 		newGuidelines.push(line);
	// 		canvas.add(line);

	// 		snapped = true;
	// 		snapv = true;
	// 	}

	// 	// snap right
	// 	if (
	// 		Math.abs(right - (cc.left + cc.width * cc.scaleX)) < snappingDistance &&
	// 		!snapv
	// 	) {
	// 		obj.set({ left: left + (cc.left + cc.width * cc.scaleX) - right });

	// 		const line = createVerticalGuideline(
	// 			canvas,
	// 			cc.left + cc.width * cc.scaleX,
	// 			`horizontal-${cc.left + cc.width * cc.scaleX}`
	// 		);
	// 		newGuidelines.push(line);
	// 		canvas.add(line);

	// 		snapped = true;
	// 		snapv = true;
	// 	}

	// 	// snap centerx
	// 	if (
	// 		Math.abs(centerX - (cc.left + (cc.width * cc.scaleX) / 2)) <
	// 			snappingDistance &&
	// 		!snapv
	// 	) {
	// 		obj.set({
	// 			left: left + (cc.left + (cc.width * cc.scaleX) / 2) - centerX,
	// 		});

	// 		const line = createVerticalGuideline(
	// 			canvas,
	// 			cc.left + (cc.width * cc.scaleX) / 2,
	// 			`horizontal-${cc.left + (cc.width * cc.scaleX) / 2}`
	// 		);
	// 		newGuidelines.push(line);
	// 		canvas.add(line);

	// 		snapped = true;
	// 		snapv = true;
	// 	}

	// 	// snap centerY
	// 	snaph = true;
	// 	if (
	// 		Math.abs(centerY - (cc.top + (cc.height * cc.scaleY) / 2)) <
	// 			snappingDistance &&
	// 		!snaph
	// 	) {
	// 		obj.set({ top: top + (cc.top + (cc.height * cc.scaleY) / 2) - centerY });

	// 		const line = createHorizontalGuideline(
	// 			canvas,
	// 			cc.top + (cc.height * cc.scaleY) / 2,
	// 			`horizontal-${cc.top + (cc.height * cc.scaleY) / 2}`
	// 		);
	// 		newGuidelines.push(line);
	// 		canvas.add(line);

	// 		snapped = true;
	// 	}
	// });

	if (snapped) {
		createGuidelines(canvas, verticalGuidelines, horizontalGuidelines);
	} else {
		clearGuidelines(canvas);
	}

	canvas.renderAll();
};

const createGuidelines = (canvas, verticalGuidelines, horizontalGuidelines) => {
	var settings = {
		stroke: "blue",
		strokeWidth: 1,
		selectable: false,
		evented: false,
		strokeDashArray: [5, 5],
		opacity: 0.8,
	};

	verticalGuidelines.forEach((position, index) => {
		var endPoints = [position, 0, position, canvas.height];
		var newGuideline = new Line(endPoints, settings);
		generateId(newGuideline, "snapGuideline");
		canvas.add(newGuideline);
	});
	horizontalGuidelines.forEach((position, index) => {
		var endPoints = [0, position, canvas.width, position];
		var newGuideline = new Line(endPoints, settings);
		generateId(newGuideline, "snapGuideline");
		canvas.add(newGuideline);
	});
};

export const clearGuidelines = (canvas) => {
	const objects = canvas.getObjects("line");
	objects.forEach((obj) => {
		if (obj.id && obj.id.startsWith("snapGuideline")) {
			canvas.remove(obj);
		}
	});
	canvas.renderAll();
};
