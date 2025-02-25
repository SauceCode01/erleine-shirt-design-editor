import React from 'react'

import { Circle } from 'fabric';

const test = ({canvas}) => {
  const addSomething = () => {
    if (canvas) {
      const circle = new Circle({
        left: 150,
        top: 50,
        fill: "#00eeee",
        radius: 50,
        selectable: true,
        stroke: "black",
        strokeWidth: 1,
        strokeUniform: true,
      });
      canvas.add(circle);
    }
  }

  return (
    <>
    <button onClick={addSomething}>
      testing po</button></>
  )
}

export default test