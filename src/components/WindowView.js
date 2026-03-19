import React from 'react';
import styled, { keyframes } from 'styled-components';

const cloudMove = keyframes`
    0% { transform: translateX(-100%); }
    100% { transform: translateX(300%); }
`;

const sunGlow = keyframes`
    0%, 100% { opacity: 0.8; }
    50% { opacity: 1; }
`;

const WindowFrame = styled.div`
    width: 250px;
    height: 350px;
    background: #2C1810;
    padding: 15px;
    border-radius: 5px 5px 0 0;
    box-shadow: 
        0 20px 40px rgba(0,0,0,0.5),
        inset 0 0 20px rgba(0,0,0,0.5);
    position: relative;
    
    @media (max-width: 768px) {
        width: 150px;
        height: 200px;
        padding: 8px;
    }
`;

const GlassPane = styled.div`
    width: 100%;
    height: 100%;
    background: linear-gradient(
        to bottom,
        #FF6B35 0%,
        #F7C59F 40%,
        #87CEEB 60%,
        #228B22 100%
    );
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(255,255,255,0.2);
    
    /* Sunset glow */
    &:before {
        content: '';
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
        width: 80px;
        height: 80px;
        background: radial-gradient(circle, #FFD700, #FF6B35);
        border-radius: 50%;
        animation: ${sunGlow} 4s infinite;
    }
`;

const Cloud = styled.div`
    position: absolute;
    top: ${props => props.top}%;
    width: 60px;
    height: 30px;
    background: rgba(255,255,255,0.4);
    border-radius: 30px;
    animation: ${cloudMove} ${props => 20 + props.speed}s linear infinite;
    animation-delay: ${props => props.delay}s;
    
    &:before {
        content: '';
        position: absolute;
        top: -10px;
        left: 10px;
        width: 25px;
        height: 25px;
        background: rgba(255,255,255,0.4);
        border-radius: 50%;
    }
    
    &:after {
        content: '';
        position: absolute;
        top: -5px;
        right: 10px;
        width: 20px;
        height: 20px;
        background: rgba(255,255,255,0.4);
        border-radius: 50%;
    }
`;

const WindowSill = styled.div`
    position: absolute;
    bottom: -10px;
    left: -10px;
    right: -10px;
    height: 20px;
    background: linear-gradient(to bottom, #5D4037, #3E2723);
    border-radius: 2px;
    box-shadow: 0 5px 10px rgba(0,0,0,0.4);
`;

const CrossBar = styled.div`
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 8px;
    background: #3E2723;
    transform: translateY(-50%);
    box-shadow: 0 2px 5px rgba(0,0,0,0.3);
    
    &.vertical {
        top: 0;
        bottom: 0;
        left: 50%;
        right: auto;
        width: 8px;
        height: 100%;
        transform: translateX(-50%);
    }
`;

const Curtain = styled.div`
    position: absolute;
    top: -20px;
    ${props => props.side}: -20px;
    width: 80px;
    height: 120%;
    background: linear-gradient(
        to right,
        rgba(255,255,255,0.9),
        rgba(255,255,255,0.7)
    );
    border-radius: 0 0 50% 50%;
    box-shadow: 5px 0 15px rgba(0,0,0,0.2);
    transform-origin: top;
    transition: transform 0.3s;
    
    ${props => props.side === 'right' && 'transform: scaleX(-1);'}
`;

export default function WindowView() {
    return (
        <WindowFrame>
            <GlassPane>
                <Cloud top={10} speed={5} delay={0} />
                <Cloud top={25} speed={8} delay={5} />
                <Cloud top={15} speed={6} delay={10} />
                <CrossBar />
                <CrossBar className="vertical" />
            </GlassPane>
            <WindowSill />
            <Curtain side="left" />
            <Curtain side="right" />
        </WindowFrame>
    );
}
