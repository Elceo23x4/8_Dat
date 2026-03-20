import React from 'react';
import { usePlane } from '@react-three/cannon';

export default function RetroRoom() {
    const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], position: [0, -2, 0] }));
    
    return (
        <mesh ref={ref} receiveShadow>
            <planeGeometry args={[20, 20]} />
            <meshStandardMaterial color="#2C1810" roughness={0.8} />
        </mesh>
    );
}