import React from "react";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import "../style/toolbar.scss";
import Brush from "../tools/Brush";
import Circle from "../tools/Circle";
import Rect from "../tools/Rect";
import Eraser from '../tools/Eraser'

const ToolBar = () => {
  const colorChanger = (e) => {
    toolState.setStrokeColor(e.target.value)
    toolState.setFillColor(e.target.value)
  }
  return (
    <div className="toolbar">
      <button className="toolbar__btn brush" onClick={() => toolState.setTool(new Brush(canvasState.canvas))} ></button>
      <button className="toolbar__btn rect" onClick={() => toolState.setTool(new Rect(canvasState.canvas))}></button>
      <button className="toolbar__btn circle" onClick={() => toolState.setTool(new Circle(canvasState.canvas))}></button>
      <button className="toolbar__btn eraser" onClick={() => toolState.setTool(new Eraser(canvasState.canvas))}></button>
      <button className="toolbar__btn line"></button>
      <input onClick={(e) => colorChanger(e)} style={{ marginLeft: 10 }} type="color" />
      <button className="toolbar__btn undo"></button>
      <button className="toolbar__btn redo"></button>
      <button className="toolbar__btn save"></button>
    </div>
  );
};

export default ToolBar;