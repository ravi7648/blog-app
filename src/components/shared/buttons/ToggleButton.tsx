import { useState } from "react";
import "./ToggleButton.css";

export default function ToggleButton({ initialState }: { initialState?: boolean }) {
  const [check, setCheck] = useState(initialState || false);
  return (
    <label className="switch">
      <input
        type="checkbox"
        id="togBtn"
        name="togBtn"
        value={check ? "yes" : "no"}
        checked={check}
        onChange={(e) => {
          setCheck(e.target.checked);
        }}
      />
      <span className="slider round"></span>
    </label>
  );
}
