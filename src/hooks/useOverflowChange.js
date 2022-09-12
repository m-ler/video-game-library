import { useLayoutEffect, useRef } from "react";

const useOverflowChange = (callback, ref) => {

    const trigger = () => {
        const hasOverflow = ref.current.scrollHeight > ref.current.clientHeight;
        !!callback && callback(hasOverflow);
    };

    const observer = useRef(new ResizeObserver(trigger));
    
    useLayoutEffect(() => {
        !!ref.current && trigger();
        observer.current.observe(ref.current);

        return () => {
            observer.current.disconnect()
        }

    }, [ref]);
};

export default useOverflowChange;