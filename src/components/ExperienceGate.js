import React, { useState } from 'react';
import styled from 'styled-components';

const GateOverlay = styled.div`
    position: fixed;
    top: 0; left: 0; width: 100vw; height: 100vh;
    background: linear-gradient(135deg, #1a0f0a 0%, #2C1810 100%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    color: var(--gold-burnished);
    font-family: var(--font-display);
`;

const EnterButton = styled.button`
    margin-top: 2rem;
    padding: 1.5rem 3rem;
    background: transparent;
    border: 2px solid var(--gold-burnished);
    color: var(--gold-burnished);
    font-family: var(--font-display);
    font-size: 1.2rem;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;
    
    &:before {
        content: '';
        position: absolute;
        top: 0; left: -100%;
        width: 100%; height: 100%;
        background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.2), transparent);
        transition: left 0.5s;
    }
    
    &:hover:before {
        left: 100%;
    }
    
    &:hover {
        background: rgba(212, 175, 55, 0.1);
        box-shadow: 0 0 30px rgba(212, 175, 55, 0.3);
        transform: scale(1.05);
    }
`;

export default function ExperienceGate({ onEnter }) {
    return (
        <GateOverlay>
            <h1 style={{ fontSize: '3rem', marginBottom: '1rem', textShadow: '0 0 20px rgba(212, 175, 55, 0.5)' }}>
                The Study of Ages
            </h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '1.2rem', opacity: 0.8 }}>
                Enter the Agro-Vintage Sanctuary
            </p>
            <EnterButton onClick={onEnter}>
                Enter Experience
            </EnterButton>
            <p style={{ marginTop: '2rem', fontSize: '0.8rem', opacity: 0.5 }}>
                Enable sound for full immersion
            </p>
        </GateOverlay>
    );
}
