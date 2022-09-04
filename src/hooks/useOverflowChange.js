import { useLayoutEffect, useState } from "react";

const useOverflowChange = (callback, ref) => {
    useLayoutEffect(() => {
        const trigger = () => {
            const hasOverflow = ref.current.scrollHeight > ref.current.clientHeight;
            !!callback && callback(hasOverflow);
        };

        new ResizeObserver(trigger).observe(ref.current);
        !!ref.current && trigger();
    }, [ref]);
};

export default useOverflowChange;