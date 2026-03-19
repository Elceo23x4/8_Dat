import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const ring = keyframes`
    0%, 100% { transform: rotate(0deg); }
    10% { transform: rotate(-5deg); }
    20% { transform: rotate(5deg); }
    30% { transform: rotate(-5deg); }
    40% { transform: rotate(5deg); }
    50% { transform: rotate(0deg); }
`;

const pulse = keyframes`
    0%, 100% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4); }
    50% { box-shadow: 0 0 20px 10px rgba(212, 175, 55, 0); }
`;

const PhoneContainer = styled.div`
    width: 80px;
    height: 60px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
    transition: transform 0.3s;
    
    &:hover {
        transform: translate(-50%, -50%) scale(1.1);
        animation: ${ring} 0.5s ease-in-out;
    }
    
    ${props => props.ringing && `
        animation: ${ring} 0.5s ease-in-out infinite, ${pulse} 2s infinite;
    `}
`;

const Base = styled.div`
    width: 100%;
    height: 40px;
    background: linear-gradient(
        to bottom,
        #FFD700,
        #D4AF37,
        #B8860B
    );
    border-radius: 10px;
    box-shadow: 
        0 5px 15px rgba(0,0,0,0.4),
        inset 0 2px 5px rgba(255,255,255,0.4),
        inset 0 -2px 5px rgba(0,0,0,0.4);
    position: relative;
`;

const Handset = styled.div`
    position: absolute;
    top: -15px;
    left: 10%;
    width: 80%;
    height: 25px;
    background: linear-gradient(
        to bottom,
        #F4E8C1,
        #D4AF37,
        #B8860B
    );
    border-radius: 15px;
    box-shadow: 
        0 3px 10px rgba(0,0,0,0.3),
        inset 0 1px 3px rgba(255,255,255,0.5);
`;

const Dial = styled.div`
    position: absolute;
    bottom: 5px;
    left: 50%;
    transform: translateX(-50%);
    width: 30px;
    height: 30px;
    background: #F5E6D3;
    border-radius: 50%;
    border: 2px solid #B8860B;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    color: #2C1810;
    font-family: 'Cinzel', serif;
`;

export default function GoldenTelephone({ onClick }) {
    const [ringing, setRinging] = useState(false);

    const handleClick = () => {
        setRinging(true);
        setTimeout(() => setRinging(false), 1000);
        onClick();
    };

    return (
        <PhoneContainer onClick={handleClick} ringing={ringing}>
            <Base>
                <Dial>☎</Dial>
            </Base>
            <Handset />
        </PhoneContainer>
    );
}
