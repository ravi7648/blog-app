import { useEffect } from "react";

export default function useTitleSetter(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
