import { useEffect, useRef } from "react";

export default function useComponentVisible(closeModal: (item: boolean) => {}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      closeModal(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
  });

  return { ref };
}
