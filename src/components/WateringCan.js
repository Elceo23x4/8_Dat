import React, { useState, useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';

const liftAndPour = keyframes`
    0% { transform: translateY(0) rotate(0deg); }
    30% { transform: translateY(-100px) rotate(0deg); }
    60% { transform: translateY(-100px) rotate(-45deg); }
    100% { transform: translateY(0) rotate(0deg); }
`;

const glowPulse = keyframes`
    0%, 100% { box-shadow: 0 0 20px rgba(212, 175, 55, 0.4); }
    50% { box-shadow: 0 0 40px rgba(212, 175, 55, 0.8), 0 0 60px rgba(212, 175, 55, 0.4); }
`;

const steamRise = keyframes`
    0% { transform: translateY(0) scale(1); opacity: 0.6; }
    100% { transform: translateY(-50px) scale(1.5); opacity: 0; }
`;

const CanContainer = styled.div`
    position: absolute;
    bottom: 30%;
    left: 30%;
    width: 80px;
    height: 60px;
    cursor: pointer;
    z-index: 40;
    transition: transform 0.3s ease;
    
    &:hover {
        transform: scale(1.1);
    }
    
    ${props => props.isWatering && css`
        animation: ${liftAndPour} 4s ease-in-out;
        pointer-events: none;
    `}
    
    ${props => props.isGlowing && css`
        animation: ${glowPulse} 2s infinite;
    `}
`;

const BrassCan = styled.div`
    width: 100%;
    height: 100%;
    background: linear-gradient(
        135deg,
        #B5A642 0%,
        #D4AF37 30%,
        #F4E8C1 50%,
        #D4AF37 70%,
        #8B7355 100%
    );
    border-radius: 10px 10px 40px 40px;
    position: relative;
    box-shadow: 
        inset 0 -5px 10px rgba(0,0,0,0.3),
        inset 0 5px 10px rgba(255,255,255,0.3),
        0 10px 20px rgba(0,0,0,0.4);
    
    /* Spout */
    &:before {
        content: '';
        position: absolute;
        top: 10px;
        right: -25px;
        width: 30px;
        height: 8px;
        background: linear-gradient(to right, #D4AF37, #B5A642);
        transform: rotate(-20deg);
        border-radius: 0 50% 50% 0;
    }
    
    /* Handle */
    &:after {
        content: '';
        position: absolute;
        top: -15px;
        left: 10px;
        width: 60px;
        height: 15px;
        border: 6px solid #8B7355;
        border-bottom: none;
        border-radius: 30px 30px 0 0;
    }
`;

const RoseHead = styled.div`
    position: absolute;
    top: 5px;
    right: -30px;
    width: 8px;
    height: 15px;
    background: #B5A642;
    border-radius: 50%;
    
    /* Holes in the spout rose */
    background-image: radial-gradient(circle, #2C1810 20%, transparent 20%);
    background-size: 3px 3px;
`;

const SteamEffect = styled.div`
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 4px;
    height: 20px;
    background: radial-gradient(ellipse, rgba(255,255,255,0.4), transparent);
    animation: ${steamRise} 2s infinite;
    opacity: ${props => props.visible ? 0.6 : 0};
`;

const FlowerVase = styled.div`
    position: absolute;
    bottom: 30%;
    left: 45%;
    width: 40px;
    height: 60px;
    background: linear-gradient(
        180deg,
        rgba(255,255,255,0.3) 0%,
        rgba(255,255,255,0.1) 100%
    );
    border: 1px solid rgba(255,255,255,0.3);
    border-radius: 5px 5px 20px 20px;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    
    /* Wilting flowers (before water) */
    &:before {
        content: '🥀';
        position: absolute;
        top: -20px;
        left: 50%;
        transform: translateX(-50%) rotate(-20deg);
        font-size: 24px;
        opacity: ${props => props.bloomed ? 0 : 1};
        transition: opacity 1s;
    }
    
    /* Blooming flowers (after water) */
    &:after {
        content: '🌺';
        position: absolute;
        top: -25px;
        left: 50%;
        transform: translateX(-50%) scale(${props => props.bloomed ? 1.2 : 0});
        font-size: 28px;
        transition: transform 2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }
`;

const Label = styled.div`
    position: absolute;
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
    font-family: var(--font-display);
    font-size: 0.7rem;
    color: var(--gold-pale);
    opacity: 0.8;
    white-space: nowrap;
    pointer-events: none;
`;

export default function WateringCan({ onWater, isWatering }) {
    const [glowing, setGlowing] = useState(false);
    const [bloomed, setBloomed] = useState(false);

    const handleClick = () => {
        if (isWatering) return;
        setGlowing(true);
        
        // Trigger water animation sequence
        setTimeout(() => {
            setBloomed(true);
        }, 3000); // 3 second delay as requested
        
        onWater();
    };

    return (
        <>
            <CanContainer 
                isWatering={isWatering} 
                isGlowing={glowing}
                onClick={handleClick}
                onMouseEnter={() => setGlowing(true)}
                onMouseLeave={() => !isWatering && setGlowing(false)}
            >
                <BrassCan>
                    <RoseHead />
                    <SteamEffect visible={glowing} />
                </BrassCan>
                <Label>Agro Services</Label>
            </CanContainer>
            
            <FlowerVase bloomed={bloomed} />
        </>
    );
}
