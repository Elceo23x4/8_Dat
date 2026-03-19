import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
    0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.7); }
    50% { transform: scale(1.05); box-shadow: 0 0 0 20px rgba(212, 175, 55, 0); }
`;

const FABContainer = styled.div`
    display: none;
    
    @media (max-width: 768px) {
        display: block;
        position: fixed;
        bottom: 30px;
        left: 30px;
        z-index: 1000;
    }
`;

const FloatingButton = styled.button`
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, #D4AF37, #B8860B);
    border: 3px solid #F4E8C1;
    color: #2C1810;
    font-size: 24px;
    cursor: pointer;
    box-shadow: 0 6px 20px rgba(0,0,0,0.4);
    animation: ${pulse} 2s infinite;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s;
    
    &:active {
        transform: scale(0.95);
    }
`;

const ExpandedMenu = styled.div`
    position: absolute;
    bottom: 70px;
    left: 0;
    background: rgba(44, 24, 16, 0.95);
    border: 1px solid #D4AF37;
    border-radius: 10px;
    padding: 15px;
    width: 200px;
    backdrop-filter: blur(10px);
    transform-origin: bottom left;
    animation: slideUp 0.3s ease;
    
    @keyframes slideUp {
        from { opacity: 0; transform: translateY(20px) scale(0.9); }
        to { opacity: 1; transform: translateY(0) scale(1); }
    }
`;

const MenuItem = styled.button`
    width: 100%;
    padding: 10px;
    background: transparent;
    border: none;
    color: #F4E8C1;
    font-family: 'Cinzel', serif;
    text-align: left;
    cursor: pointer;
    border-bottom: 1px solid rgba(212, 175, 55, 0.2);
    transition: all 0.2s;
    
    &:last-child { border-bottom: none; }
    
    &:hover {
        background: rgba(212, 175, 55, 0.1);
        padding-left: 15px;
    }
    
    &:before {
        content: '›';
        margin-right: 8px;
        color: #D4AF37;
    }
`;

export default function MobileFAB({ onOpenWelcome, onOpenProjects, onOpenContact, onOpenAgro }) {
    const [expanded, setExpanded] = useState(false);

    return (
        <FABContainer>
            {expanded && (
                <ExpandedMenu>
                    <MenuItem onClick={() => { onOpenWelcome(); setExpanded(false); }}>
                        Warrior's Welcome
                    </MenuItem>
                    <MenuItem onClick={() => { onOpenProjects(); setExpanded(false); }}>
                        View Projects
                    </MenuItem>
                    <MenuItem onClick={() => { onOpenAgro(); setExpanded(false); }}>
                        Agro Services
                    </MenuItem>
                    <MenuItem onClick={() => { onOpenContact(); setExpanded(false); }}>
                        Send Telegram
                    </MenuItem>
                </ExpandedMenu>
            )}
            <FloatingButton onClick={() => setExpanded(!expanded)}>
                {expanded ? '✕' : '🛡️'}
            </FloatingButton>
        </FABContainer>
    );
}
