import { useState, useEffect } from 'react';

export function useReducedMotion() {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);

        const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
        mediaQuery.addEventListener('change', handleChange);
        
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    return prefersReducedMotion;
}

export function usePerformanceMode() {
    const [isLowPower, setIsLowPower] = useState(false);

    useEffect(() => {
        // Detect mobile/low-power devices
        const checkPerformance = () => {
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            const memory = navigator.deviceMemory || 4;
            setIsLowPower(isMobile && memory < 4);
        };
        checkPerformance();
    }, []);

    return isLowPower;
}
