import React from "react";
import { observer } from "mobx-react-lite";
import "../style/canvas.scss";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import Brush from "../tools/Brush";
import { Modal, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

const Canvas = observer(() => {
  const canvasRef = React.useRef();
  const usernameInput = React.useRef();
  const [visibleModal, setVisibleModal] = React.useState(true);
  const params = useParams();

  React.useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    
  }, []);

  React.useEffect(() => {
    if (canvasState.username) {
      const ws = new WebSocket("ws://localhost:5000/");
      canvasState.setWSocket(ws);
      canvasState.setSession(params.id);
      toolState.setTool(new Brush(canvasRef.current, ws, params.id));
      
      ws.onopen = () => {
        ws.send(
          JSON.stringify({
            id: params.id,
            username: canvasState.username,
            method: "CONNECTION",
          })
        );
      };
      ws.onmessage = (event) => {
        let msg = JSON.parse(event.data);
        switch (msg.method) {
          case "CONNECTION":
            console.log(`username ${msg.username} connected`);
            break;
          case "DRAW":
            drawHandler(msg);
            break;
        }
      };
    }
  }, [canvasState.username]);

  const drawHandler = (msg) => {
    const tool = msg.tool;
    const context = canvasRef.current.getContext("2d");
    switch (tool.type) {
      case "brush":
        Brush.draw(context, tool.x, tool.y);
    }
  };

  const mouseDownHandler = () => {
    canvasState.pushToUndo(canvasRef.current.toDataURL());
  };

  const connectionHandler = () => {
    canvasState.setUsername(usernameInput.current.value);
    setVisibleModal(false);
  };

  return (
    <div className="canvas">
      <Modal show={visibleModal} onHide={() => {}}>
        <Modal.Header>
          <Modal.Title>Type your NickName</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input autoFocus type="text" ref={usernameInput} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => connectionHandler()}>
            Log in
          </Button>
        </Modal.Footer>
      </Modal>
      <canvas
        onMouseDown={() => mouseDownHandler()}
        ref={canvasRef}
        width={1000}
        height={700}
      ></canvas>
    </div>
  );
});

export default Canvas;
