import { Line } from "fabric";
import { generateId } from "./Identification";

const snappingDistance = 20;

var canvasWidth = 10;
var canvasHeight = 10;


export const EnableSnapping = (canvas, pcanvasWidth, pcanvasHeight) => {
	canvasWidth = pcanvasWidth;
	canvasHeight =pcanvasHeight
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

const snapBoxWithBox = (movingObj, staticRect, vguide, hguide) => {
	var snapped = false;


	movingObj.setCoords();
	var movingRect = movingObj.getBoundingRect(true)


	// snap x
	var snapx = snapRangeWithRange(
		movingRect.left,
		movingRect.width,

		staticRect.left,
		staticRect.width,
		vguide
	);
	if (snapx) {
		movingObj.set({ left: movingObj.left + snapx });
		snapped = true;
	}

	var snapy = snapRangeWithRange(
		movingRect.top,
		movingRect.height,

		staticRect.top,
		staticRect.height,
		hguide
	);
	if (snapy) {
		movingObj.set({ top: movingObj.top + snapy });
		snapped = true;
	}

	return snapped

}

const handleObjectMoving = (canvas, target) => {
	const canvasRect = {top:0,left:0,width:canvasWidth, height:canvasHeight}


	let horizontalGuidelines = [];
	let verticalGuidelines = [];
	clearGuidelines(canvas);

	let snapped = false;

	// SNAP TO CANVAS
	snapped = snapped || snapBoxWithBox(target, canvasRect, verticalGuidelines, horizontalGuidelines);
	

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
		obj.setCoords();
		snapped = snapped || snapBoxWithBox(target, obj.getBoundingRect(), verticalGuidelines, horizontalGuidelines);
	})


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

const clearGuidelines = (canvas) => {
	const objects = canvas.getObjects("line");
	objects.forEach((obj) => {
		if (obj.id && obj.id.startsWith("snapGuideline")) {
			canvas.remove(obj);
		}
	});
	canvas.renderAll();
};
