import { useEffect, useRef } from 'react';

/**
 * Ensures the effect body is executed only once across StrictMode double-invocation by storing whether it has run in a ref.
 * Usage: useOnceEffect(() => { ... });
 */
export default function useOnceEffect(effect) {
    const ran = useRef(false);
    useEffect(() => {
        if (ran.current) return;
        ran.current = true;
        return effect();
    }, []);
}
