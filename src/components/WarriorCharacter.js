import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const breathe = keyframes`
    0%, 100% { transform: scaleY(1) translateY(0); }
    50% { transform: scaleY(1.02) translateY(-2px); }
`;

const spearGlow = keyframes`
    0%, 100% { filter: drop-shadow(0 0 5px rgba(212, 175, 55, 0.5)); }
    50% { filter: drop-shadow(0 0 15px rgba(212, 175, 55, 0.8)); }
`;

const float = keyframes`
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
`;

const paperUnfurl = keyframes`
    from { 
        transform: scale(0.8) rotate(-5deg);
        opacity: 0;
    }
    to { 
        transform: scale(1) rotate(0deg);
        opacity: 1;
    }
`;

const WarriorContainer = styled.div`
    position: relative;
    height: 100%;
    width: 300px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    z-index: 50;
    
    @media (max-width: 768px) {
        position: fixed;
        bottom: 20px;
        left: 20px;
        height: 150px;
        width: 100px;
        z-index: 1000;
    }
`;

const WarriorSVG = styled.svg`
    height: 80%;
    width: 100%;
    filter: drop-shadow(0 10px 20px rgba(0,0,0,0.8));
    animation: ${breathe} 4s ease-in-out infinite;
`;

const SpearNote = styled.div`
    position: absolute;
    top: 10%;
    left: 60%;
    width: 180px;
    background: var(--parchment);
    padding: 1rem;
    border-radius: 2px;
    box-shadow: 
        0 4px 6px rgba(0,0,0,0.3),
        inset 0 0 30px rgba(139, 69, 19, 0.1);
    font-family: var(--font-body);
    color: var(--mahogany-deep);
    transform-origin: top left;
    transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    cursor: pointer;
    border: 1px solid var(--gold-antique);
    
    &:before {
        content: '';
        position: absolute;
        top: -5px;
        left: 50%;
        transform: translateX(-50%);
        width: 10px;
        height: 10px;
        background: #8B0000;
        border-radius: 50%;
        box-shadow: 0 0 5px rgba(139, 0, 0, 0.5);
    }
    
    ${props => props.expanded && `
        transform: scale(1.2) translate(20px, -20px);
        z-index: 100;
        box-shadow: 0 20px 40px rgba(0,0,0,0.4);
    `}
    
    h3 {
        margin: 0 0 0.5rem 0;
        font-family: var(--font-display);
        color: var(--sepia);
        font-size: 1.2rem;
    }
    
    p {
        margin: 0;
        font-size: 0.9rem;
        line-height: 1.4;
    }
    
    @media (max-width: 768px) {
        width: 200px;
        left: 100%;
        top: 0;
        display: ${props => props.expanded ? 'block' : 'none'};
    }
`;

export default function WarriorCharacter() {
    const [noteExpanded, setNoteExpanded] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <WarriorContainer>
            <WarriorSVG viewBox="0 0 200 400" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    {/* Pattern for Kente cloth */}
                    <pattern id="kentePattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <rect width="20" height="20" fill="#B22222"/>
                        <rect x="0" y="0" width="10" height="10" fill="#FFD700"/>
                        <rect x="10" y="10" width="10" height="10" fill="#000"/>
                        <rect x="10" y="0" width="10" height="10" fill="#228B22"/>
                        <rect x="0" y="10" width="10" height="10" fill="#FFD700"/>
                    </pattern>
                    
                    {/* Gradient for skin */}
                    <linearGradient id="skinTone" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{stopColor:'#5C4033', stopOpacity:1}} />
                        <stop offset="50%" style={{stopColor:'#6B4423', stopOpacity:1}} />
                        <stop offset="100%" style={{stopColor:'#5C4033', stopOpacity:1}} />
                    </linearGradient>
                    
                    {/* Gold gradient for jewelry */}
                    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{stopColor:'#D4AF37'}} />
                        <stop offset="50%" style={{stopColor:'#FFD700'}} />
                        <stop offset="100%" style={{stopColor:'#B8860B'}} />
                    </linearGradient>
                </defs>
                
                {/* Shadow */}
                <ellipse cx="100" cy="380" rx="60" ry="15" fill="rgba(0,0,0,0.4)" />
                
                {/* Spear Shaft (behind body) */}
                <rect x="140" y="20" width="8" height="350" fill="#3E2723" rx="2" />
                
                {/* Legs - Loose trousers with Kente pattern */}
                <path d="M 70 250 L 60 380 L 85 380 L 90 260 Z" fill="url(#kentePattern)" stroke="#2C1810" strokeWidth="1"/>
                <path d="M 130 250 L 140 380 L 115 380 L 110 260 Z" fill="url(#kentePattern)" stroke="#2C1810" strokeWidth="1"/>
                
                {/* Sandals */}
                <path d="M 55 375 Q 72 385 90 375 L 85 380 L 60 380 Z" fill="#8B4513"/>
                <path d="M 110 375 Q 127 385 145 375 L 140 380 L 115 380 Z" fill="#8B4513"/>
                
                {/* Torso - Bare chest with muscle definition */}
                <path d="M 80 140 Q 100 145 120 140 L 125 260 L 75 260 Z" fill="url(#skinTone)"/>
                <path d="M 85 180 Q 100 190 115 180" stroke="#4A3018" strokeWidth="2" fill="none" opacity="0.6"/>
                <path d="M 90 140 L 90 260 M 110 140 L 110 260" stroke="#4A3018" strokeWidth="1" opacity="0.3"/>
                
                {/* Bronze arm cuffs */}
                <rect x="75" y="190" width="10" height="30" rx="2" fill="url(#goldGradient)" />
                <rect x="115" y="190" width="10" height="30" rx="2" fill="url(#goldGradient)" />
                
                {/* Arms */}
                <path d="M 80 150 Q 60 200 70 240" stroke="url(#skinTone)" strokeWidth="18" fill="none" strokeLinecap="round"/>
                <path d="M 120 150 Q 140 200 130 240" stroke="url(#skinTone)" strokeWidth="18" fill="none" strokeLinecap="round"/>
                
                {/* Hands gripping spear */}
                <circle cx="130" cy="100" r="12" fill="url(#skinTone)"/>
                
                {/* Neck */}
                <rect x="92" y="130" width="16" height="20" fill="url(#skinTone)"/>
                
                {/* Head */}
                <ellipse cx="100" cy="110" rx="22" ry="28" fill="url(#skinTone)"/>
                
                {/* Facial features - dignified profile */}
                <path d="M 98 105 L 105 108 L 98 111" fill="none" stroke="#3E2723" strokeWidth="1.5"/>
                <circle cx="95" cy="102" r="2" fill="#2C1810"/>
                
                {/* Feathered headdress */}
                <g transform="translate(100, 80)">
                    <ellipse cx="0" cy="0" rx="35" ry="25" fill="none" stroke="#2F4538" strokeWidth="8"/>
                    <ellipse cx="-15" cy="-10" rx="8" ry="20" fill="#228B22" transform="rotate(-30)"/>
                    <ellipse cx="0" cy="-15" rx="8" ry="25" fill="#B22222" transform="rotate(0)"/>
                    <ellipse cx="15" cy="-10" rx="8" ry="20" fill="#FFD700" transform="rotate(30)"/>
                    <circle cx="0" cy="0" r="8" fill="#2F4538"/>
                </g>
                
                {/* Beaded necklace */}
                <g transform="translate(100, 140)">
                    <circle cx="-15" cy="0" r="5" fill="#B22222"/>
                    <circle cx="-8" cy="3" r="5" fill="#FFD700"/>
                    <circle cx="0" cy="4" r="5" fill="#228B22"/>
                    <circle cx="8" cy="3" r="5" fill="#B22222"/>
                    <circle cx="15" cy="0" r="5" fill="#FFD700"/>
                </g>
                
                {/* Spear Tip - Iron with gold accents */}
                <path d="M 135 20 L 144 20 L 140 5 Z" fill="#708090" stroke="#2F4F4F"/>
                <path d="M 138 20 L 141 20 L 140 8 Z" fill="url(#goldGradient)"/>
                
                {/* Animated glow on spear tip for note indication */}
                <circle cx="140" cy="15" r="15" fill="url(#goldGradient)" opacity="0.3">
                    <animate attributeName="opacity" values="0.3;0.6;0.3" dur="2s" repeatCount="indefinite"/>
                </circle>
            </WarriorSVG>
            
            {/* Interactive Note on Spear Tip */}
            <SpearNote 
                expanded={noteExpanded} 
                onClick={() => setNoteExpanded(!noteExpanded)}
                onMouseEnter={() => !isMobile && setNoteExpanded(true)}
                onMouseLeave={() => !isMobile && setNoteExpanded(false)}
            >
                <h3>Karibu, Explorer</h3>
                <p>
                    Welcome to my digital sanctuary. I am the guardian of harvests and code. 
                    Explore the room to discover my works in design, agriculture, and technology.
                    <br/><br/>
                    <em>— The Digital Warrior</em>
                </p>
            </SpearNote>
        </WarriorContainer>
    );
}
