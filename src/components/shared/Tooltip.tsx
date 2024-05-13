import { Tooltip as BsTooltip } from "bootstrap";
import { cloneElement, useEffect, useRef } from "react";

type PopoverPlacemntType = {
  TOP: "top";
  BOTTOM: "bottom";
  LEFT: "left";
  RIGHT: "right";
  AUTO: "auto";
};

export const POPOVER_PLACEMENT: PopoverPlacemntType = {
  TOP: "top",
  BOTTOM: "bottom",
  LEFT: "left",
  RIGHT: "right",
  AUTO: "auto",
};

export const Tooltip = (p: {
  children: JSX.Element;
  text: string;
  placement?: "top" | "bottom" | "left" | "right" | "auto";
}) => {
  const childRef = useRef(undefined as unknown as Element);

  useEffect(() => {
    const t = new BsTooltip(childRef.current, {
      title: p.text,
      placement: p.placement || "auto",
      trigger: "hover",
    });
    return () => t.dispose();
  }, [p.text, p.placement]);

  return cloneElement(p.children, { ref: childRef });
};
