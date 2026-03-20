import React from 'react';
import styled from 'styled-components';

const Cupboard = styled.div`
    width: 200px;
    height: 350px;
    position: relative;
    transform: perspective(1000px) rotateY(-5deg);
`;

const WoodFrame = styled.div`
    width: 100%;
    height: 100%;
    background: linear-gradient(
        135deg,
        #3E2723 0%,
        #2C1810 100%
    );
    border-radius: 5px;
    padding: 10px;
    box-shadow: 
        0 20px 40px rgba(0,0,0,0.6),
        inset 0 0 20px rgba(0,0,0,0.5);
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const GlassShelf = styled.div`
    flex: 1;
    background: linear-gradient(
        180deg,
        rgba(255,255,255,0.2) 0%,
        rgba(255,255,255,0.05) 50%,
        rgba(255,255,255,0.1) 100%
    );
    backdrop-filter: blur(2px);
    border: 1px solid rgba(212, 175, 55, 0.3);
    border-radius: 2px;
    position: relative;
    box-shadow: inset 0 0 10px rgba(0,0,0,0.3);
    
    /* Reflection */
    &:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 50%;
        background: linear-gradient(
            to bottom,
            rgba(255,255,255,0.1),
            transparent
        );
        pointer-events: none;
    }
`;

const Drawer = styled.div`
    height: 40px;
    background: linear-gradient(to bottom, #5D4037, #3E2723);
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    
    /* Drawer pulls */
    &:before, &:after {
        content: '';
        width: 30px;
        height: 4px;
        background: #D4AF37;
        border-radius: 2px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.5);
    }
`;

export default function GlassCupboard({ children }) {
    return (
        <Cupboard>
            <WoodFrame>
                <GlassShelf>
                    {children} {/* Golden Telephone placed here */}
                </GlassShelf>
                <GlassShelf />
                <Drawer />
            </WoodFrame>
        </Cupboard>
    );
}