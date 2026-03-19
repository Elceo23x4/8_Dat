import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import TerminalEmulator from './TerminalEmulator';

const screenGlow = keyframes`
    0%, 100% { box-shadow: 0 0 20px rgba(0, 255, 0, 0.2), inset 0 0 20px rgba(0, 255, 0, 0.1); }
    50% { box-shadow: 0 0 30px rgba(0, 255, 0, 0.3), inset 0 0 30px rgba(0, 255, 0, 0.2); }
`;

const flicker = keyframes`
    0% { opacity: 0.97; }
    5% { opacity: 0.95; }
    10% { opacity: 0.9; }
    15% { opacity: 0.95; }
    20% { opacity: 0.99; }
    100% { opacity: 0.97; }
`;

const ComputerContainer = styled.div`
    position: relative;
    width: 300px;
    height: 280px;
    transform: perspective(1000px) rotateX(5deg);
    z-index: 25;
    
    @media (max-width: 768px) {
        width: 200px;
        height: 180px;
    }
`;

const MonitorCase = styled.div`
    width: 100%;
    height: 220px;
    background: linear-gradient(
        135deg,
        #5C4037 0%,
        #3E2723 50%,
        #2C1810 100%
    );
    border-radius: 10px;
    padding: 15px;
    box-shadow: 
        0 20px 40px rgba(0,0,0,0.6),
        inset 0 2px 5px rgba(255,255,255,0.1);
    position: relative;
    border: 2px solid #D4AF37;
    
    @media (max-width: 768px) {
        height: 140px;
        padding: 10px;
    }
`;

const Screen = styled.div`
    width: 100%;
    height: 160px;
    background: #0f380f;
    border-radius: 50% / 10%;
    position: relative;
    overflow: hidden;
    animation: ${screenGlow} 4s infinite, ${flicker} 0.15s infinite;
    
    &:before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background: linear-gradient(
            rgba(18, 16, 16, 0) 50%,
            rgba(0, 0, 0, 0.25) 50%
        );
        background-size: 100% 4px;
        pointer-events: none;
        z-index: 2;
    }
    
    &:after {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background: radial-gradient(
            circle at 30% 30%,
            rgba(255,255,255,0.1) 0%,
            transparent 70%
        );
        pointer-events: none;
    }
    
    @media (max-width: 768px) {
        height: 100px;
    }
`;

const TerminalText = styled.div`
    font-family: 'Space Mono', monospace;
    color: #33ff33;
    font-size: 0.8rem;
    padding: 10px;
    text-shadow: 0 0 5px rgba(51, 255, 51, 0.5);
    height: 100%;
    overflow-y: auto;
    position: relative;
    z-index: 1;
    
    @media (max-width: 768px) {
        font-size: 0.6rem;
        padding: 5px;
    }
`;

const MonitorStand = styled.div`
    width: 80px;
    height: 40px;
    background: linear-gradient(to bottom, #3E2723, #2C1810);
    margin: 0 auto;
    position: relative;
    
    &:before {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 120px;
        height: 10px;
        background: #2C1810;
        border-radius: 5px;
        box-shadow: 0 5px 10px rgba(0,0,0,0.5);
    }
`;

const PowerButton = styled.div`
    position: absolute;
    bottom: 10px;
    right: 20px;
    width: 12px;
    height: 12px;
    background: #8B0000;
    border-radius: 50%;
    box-shadow: 0 0 5px rgba(139, 0, 0, 0.8);
    cursor: pointer;
    
    &:active {
        background: #ff0000;
    }
`;

const InputLine = styled.div`
    display: flex;
    align-items: center;
    margin-top: 5px;
`;

const Prompt = styled.span`
    color: #D4AF37;
    margin-right: 5px;
`;

const Cursor = styled.span`
    display: inline-block;
    width: 8px;
    height: 15px;
    background: #33ff33;
    animation: blink 1s infinite;
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
`;

export default function RetroComputer({ onOpenTerminal }) {
    const [booted, setBooted] = useState(false);
    const [input, setInput] = useState('');
    const [history, setHistory] = useState([
        'SYSTEM BOOT SEQUENCE INITIATED...',
        'LOADING AGRO-OS v1.9.24...',
        'MOUNTING VIRTUAL DRIVE...',
        'ESTABLISHING SECURE CONNECTION...',
        'READY.'
    ]);
    const inputRef = useRef(null);
    const screenRef = useRef(null);

    useEffect(() => {
        if (screenRef.current) {
            screenRef.current.scrollTop = screenRef.current.scrollHeight;
        }
    }, [history]);

    const handleCommand = (e) => {
        if (e.key === 'Enter') {
            const cmd = input.trim().toLowerCase();
            let response = '';
            
            switch(cmd) {
                case 'help':
                    response = 'AVAILABLE COMMANDS:\n- projects: View portfolio\n- about: Personal info\n- skills: Technical arsenal\n- contact: Reach out\n- clear: Reset terminal\n- agro: Agricultural services';
                    break;
                case 'projects':
                    response = 'LOADING PROJECT MANIFEST...\n[1] CorridorTalks - UX Enhancement\n[2] Taager Gamified Experience\n[3] Insense Design System\nType "open [number]" for details';
                    break;
                case 'about':
                    response = 'NAME: The Digital Warrior\nROLE: Senior Product Designer & Agro-Tech Specialist\nORIGIN: African Heritage | Global Mindset\nSTATUS: Available for collaboration';
                    break;
                case 'skills':
                    response = 'TECHNICAL ARSENAL:\n• React/Three.js/WebGL\n• UX Research & Psychology\n• Agricultural Systems Design\n• Motion Graphics & Shaders';
                    break;
                case 'contact':
                    response = 'INITIATING CONTACT PROTOCOL...\nOpening secure channel...';
                    setTimeout(() => onOpenTerminal(), 1000);
                    break;
                case 'clear':
                    setHistory(['SYSTEM READY.']);
                    setInput('');
                    return;
                case 'agro':
                    response = 'REDIRECTING TO AGRO SERVICES...';
                    setTimeout(() => window.dispatchEvent(new CustomEvent('openAgro')), 1000);
                    break;
                default:
                    response = `COMMAND NOT FOUND: ${cmd}\nType "help" for available commands`;
            }
            
            setHistory([...history, `> ${input}`, response]);
            setInput('');
        }
    };

    return (
        <ComputerContainer onClick={() => inputRef.current?.focus()}>
            <MonitorCase>
                <Screen ref={screenRef}>
                    <TerminalText>
                        {history.map((line, i) => (
                            <div key={i} style={{ whiteSpace: 'pre-wrap', marginBottom: '2px' }}>{line}</div>
                        ))}
                        <InputLine>
                            <Prompt>{'>'}</Prompt>
                            <input
                                ref={inputRef}
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleCommand}
                                style={{
                                    background: 'transparent',
                                    border: 'none',
                                    color: '#33ff33',
                                    fontFamily: 'inherit',
                                    fontSize: 'inherit',
                                    outline: 'none',
                                    width: '80%',
                                    caretColor: 'transparent'
                                }}
                                autoFocus
                            />
                            <Cursor />
                        </InputLine>
                    </TerminalText>
                </Screen>
                <PowerButton onClick={() => setHistory([...history, 'SYSTEM REBOOT...'])} />
            </MonitorCase>
            <MonitorStand />
        </ComputerContainer>
    );
}
