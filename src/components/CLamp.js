import React from 'react';
import styled, { keyframes } from 'styled-components';

const flicker = keyframes`
    0%, 100% { opacity: 1; }
    50% { opacity: 0.95; }
    52% { opacity: 0.8; }
    54% { opacity: 0.95; }
`;

const LampContainer = styled.div`
    position: relative;
    width: 150px;
    height: 300px;
    pointer-events: none;
`;

const Base = styled.div`
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 20px;
    background: radial-gradient(ellipse, #8B7355, #5C4A3A);
    border-radius: 50%;
    box-shadow: 0 5px 15px rgba(0,0,0,0.5);
`;

const CShape = styled.div`
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 250px;
    background: linear-gradient(to right, #5C4A3A, #8B7355, #5C4A3A);
    border-radius: 10px 10px 0 0;
    
    /* The C curve */
    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: -60px;
        width: 80px;
        height: 20px;
        background: linear-gradient(to bottom, #8B7355, #5C4A3A);
        border-radius: 10px 0 0 10px;
    }
    
    &:after {
        content: '';
        position: absolute;
        top: 0;
        left: -60px;
        width: 20px;
        height: 80px;
        background: linear-gradient(to right, #5C4A3A, #8B7355);
        border-radius: 10px 0 0 0;
    }
`;

const Shade = styled.div`
    position: absolute;
    top: 20px;
    left: -40px;
    width: 100px;
    height: 60px;
    background: linear-gradient(
        180deg,
        #2F4538 0%,
        #1a2f25 50%,
        #0f1f18 100%
    );
    border-radius: 50% 50% 20% 20%;
    box-shadow: 
        0 10px 30px rgba(212, 175, 55, 0.3),
        inset 0 5px 10px rgba(255,255,255,0.1);
    animation: ${flicker} 4s infinite;
    
    /* Art Nouveau pattern */
    &:before {
        content: '';
        position: absolute;
        top: 10px;
        left: 10px;
        right: 10px;
        height: 2px;
        background: #D4AF37;
        opacity: 0.5;
    }
`;

const LightCone = styled.div`
    position: absolute;
    top: 80px;
    left: 50%;
    transform: translateX(-50%);
    width: 200px;
    height: 300px;
    background: linear-gradient(
        to bottom,
        rgba(212, 175, 55, 0.3) 0%,
        transparent 70%
    );
    clip-path: polygon(40% 0%, 60% 0%, 100% 100%, 0% 100%);
    pointer-events: none;
    filter: blur(20px);
    animation: ${flicker} 4s infinite;
`;

export default function CLamp() {
    return (
        <LampContainer>
            <LightCone />
            <Base />
            <CShape />
            <Shade />
        </LampContainer>
    );
}
