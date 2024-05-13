import { useState } from "react";
import "./ToggleButton.css";

export default function ToggleButton({
  initialState,
  className,
  onToggle,
}: {
  initialState?: boolean;
  className?: string;
  onToggle?: (value: boolean) => void;
}) {
  const [check, setCheck] = useState(initialState || false);
  return (
    <label className={"switch " + className}>
      <input
        type="checkbox"
        id="togBtn"
        name="togBtn"
        value={check ? "yes" : "no"}
        checked={check}
        onChange={(e) => {
          setCheck(e.target.checked);
          onToggle && onToggle(e.target.checked);
        }}
      />
      <span className="slider round"></span>
    </label>
  );
}
