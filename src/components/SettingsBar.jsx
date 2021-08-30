import React from "react";
import toolState from "../store/toolState";
import "../style/toolbar.scss";

const SettingsBar = () => {
  return (
    <div className="settingsbar">
      <label htmlFor="line-width">Line width</label>
      <input
        onChange={(e) => toolState.setLineWidth(e.currentTarget.value)}
        style={{ margin: "0 10px" }}
        id="line-width"
        type="number"
        min={1}
        max={50}
        defaultValue={1}
      />
      <label htmlFor="stroke-color">Stroke color</label>
      <input
        type="color"
        id="stroke-color"
        onChange={(e) => toolState.setStrokeColor(e.currentTarget.value)}
      />
    </div>
  );
};

export default SettingsBar;
