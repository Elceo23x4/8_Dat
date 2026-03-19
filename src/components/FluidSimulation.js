import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { usePhysics } from '@react-three/cannon';

// Hyperrealistic water particle system with golden dust motes
export default function FluidSimulation() {
    const mesh = useRef();
    const goldenMesh = useRef();
    const { viewport } = useThree();
    
    // Water droplets count (optimized for mobile)
    const count = 400;
    const goldenCount = 100;
    
    // Initialize positions with physics
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            temp.push({
                position: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.3,
                    Math.random() * 0.5 + 1,
                    (Math.random() - 0.5) * 0.3
                ),
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.02,
                    -Math.random() * 0.05 - 0.02,
                    (Math.random() - 0.5) * 0.02
                ),
                life: Math.random() * 100
            });
        }
        return temp;
    }, []);

    // Golden magic dust particles
    const goldenParticles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < goldenCount; i++) {
            temp.push({
                position: new THREE.Vector3(
                    (Math.random() - 0.5) * 2,
                    Math.random() * 2,
                    (Math.random() - 0.5) * 2
                ),
                velocity: new THREE.Vector3(
                    (Math.random() - 0.5) * 0.01,
                    Math.random() * 0.02,
                    (Math.random() - 0.5) * 0.01
                )
            });
        }
        return temp;
    }, []);

    // Create geometry instances
    const [waterGeo, goldGeo] = useMemo(() => {
        const water = new THREE.SphereGeometry(0.015, 8, 8);
        const gold = new THREE.OctahedronGeometry(0.02, 0);
        return [water, gold];
    }, []);

    // Material with refraction for water
    const waterMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
        color: 0x88CCFF,
        transmission: 0.6,
        opacity: 0.8,
        metalness: 0,
        roughness: 0,
        ior: 1.5,
        thickness: 0.1,
        transparent: true
    }), []);

    const goldMaterial = useMemo(() => new THREE.MeshStandardMaterial({
        color: 0xD4AF37,
        metalness: 1,
        roughness: 0.3,
        emissive: 0xB8860B,
        emissiveIntensity: 0.2
    }), []);

    useFrame((state) => {
        if (!mesh.current || !goldenMesh.current) return;
        
        const time = state.clock.getElapsedTime();
        
        // Animate water droplets
        const matrix = new THREE.Matrix4();
        particles.forEach((particle, i) => {
            // Gravity physics
            particle.velocity.y -= 0.001;
            particle.position.add(particle.velocity);
            
            // Floor collision (splash effect reset)
            if (particle.position.y < -0.5) {
                particle.position.y = 1.5;
                particle.velocity.y = -Math.random() * 0.03;
                particle.velocity.x = (Math.random() - 0.5) * 0.02;
                particle.velocity.z = (Math.random() - 0.5) * 0.02;
            }
            
            // Spiral motion as they fall
            const spiral = Math.sin(time * 2 + i) * 0.01;
            particle.position.x += spiral * 0.1;
            
            matrix.makeTranslation(particle.position);
            mesh.current.setMatrixAt(i, matrix);
        });
        mesh.current.instanceMatrix.needsUpdate = true;

        // Animate golden motes
        goldenParticles.forEach((particle, i) => {
            particle.position.add(particle.velocity);
            particle.position.y += Math.sin(time + i) * 0.002;
            
            // Float upward slowly
            if (particle.position.y > 2) particle.position.y = 0;
            
            const scale = 1 + Math.sin(time * 3 + i) * 0.3;
            matrix.makeScale(scale, scale, scale);
            matrix.setPosition(particle.position);
            goldenMesh.current.setMatrixAt(i, matrix);
        });
        goldenMesh.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <group position={[0, 0.5, 0]}>
            {/* Water droplets instanced mesh */}
            <instancedMesh 
                ref={mesh} 
                args={[waterGeo, waterMaterial, count]} 
                castShadow
            />
            
            {/* Golden magic dust */}
            <instancedMesh 
                ref={goldenMesh} 
                args={[goldGeo, goldMaterial, goldenCount]}
            >
                <pointLight intensity={0.5} color="#D4AF37" distance={2} />
            </instancedMesh>
            
            {/* Ambient glow */}
            <mesh position={[0, 0.5, 0]}>
                <sphereGeometry args={[0.3, 32, 32]} />
                <meshBasicMaterial 
                    color="#D4AF37" 
                    transparent 
                    opacity={0.1} 
                    side={THREE.BackSide}
                />
            </mesh>
        </group>
    );
}
