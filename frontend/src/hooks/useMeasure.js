import { useRef, useState, useEffect } from "react";

export default function useMeasure() {
    const ref = useRef();
    const [dimensions, set] = useState({ borderBoxSize: { blockSize: 0 } });
    const [ro] = useState(() => new ResizeObserver(([entry]) => set(entry)));
    useEffect(() => (ro.observe(ref.current), ro.disconnect), [ro]);
    return [{ ref }, dimensions];
}
