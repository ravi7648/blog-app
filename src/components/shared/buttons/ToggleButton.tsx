import { useState } from "react";
import "./ToggleButton.css";

export default function ToggleButton({
  id,
  name,
  initialState,
  className,
  onToggle,
}: {
  id: string;
  name: string;
  initialState?: boolean;
  className?: string;
  onToggle?: (value: boolean) => void;
}) {
  const [check, setCheck] = useState(initialState || false);
  return (
    <label className={"switch " + className}>
      <input
        type="checkbox"
        id={id}
        name={name}
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
