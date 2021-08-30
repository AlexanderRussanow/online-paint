import React from "react";
import { observer } from "mobx-react-lite";
import "../style/canvas.scss";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";

const Canvas = observer(() => {
  const canvasRef = React.useRef();
  React.useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    toolState.setTool(new Brush(canvasRef.current));
  }, []);

  return (
    <div className="canvas">
      <canvas ref={canvasRef} width={1000} height={700}></canvas>
    </div>
  );
});

export default Canvas;
