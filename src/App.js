import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/cannon';
import ExperienceGate from './components/ExperienceGate';
import RetroRoom from './components/RetroRoom';
import WarriorCharacter from './components/WarriorCharacter';
import WateringCan from './components/WateringCan';
import RetroComputer from './components/RetroComputer';
import GoldenTelephone from './components/GoldenTelephone';
import CLamp from './components/CLamp';
import WindowView from './components/WindowView';
import GlassCupboard from './components/GlassCupboard';
import WhatsAppModal from './components/WhatsAppModal';
import FluidSimulation from './components/FluidSimulation';
import './styles/retro-theme.css';

export default function App() {
    const [entered, setEntered] = useState(false);
    const [activeModal, setActiveModal] = useState(null);
    const [wateringPlants, setWateringPlants] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        if (entered && audioRef.current) {
            audioRef.current.volume = 0.3;
            audioRef.current.play().catch(e => console.log("Audio autoplay blocked"));
        }
    }, [entered]);

    const handleEnter = () => {
        setEntered(true);
        document.getElementById('loading').style.opacity = '0';
        setTimeout(() => document.getElementById('loading').remove(), 1000);
    };

    const playClickSound = () => {
        const sfx = document.getElementById('click-sfx');
        if (sfx) {
            sfx.currentTime = 0;
            sfx.play();
        }
    };

    return (
        <>
            <audio id="ambient-audio" ref={audioRef} loop>
                <source src="https://cdn.pixabay.com/download/audio/2022/03/09/audio_c8c8a73467.mp3?filename=indian-summer-110741.mp3" type="audio/mpeg" />
            </audio>

            {!entered && <ExperienceGate onEnter={handleEnter} />}

            <div className={`room-container ${entered ? 'entered' : ''}`}>
                {/* Background Three.js Scene */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
                    <Canvas shadows camera={{ position: [0, 5, 10], fov: 45 }}>
                        <ambientLight intensity={0.3} color="#D4AF37" />
                        <pointLight position={[10, 10, 10]} intensity={0.5} color="#F4E8C1" />
                        <Physics>
                            <RetroRoom />
                            {wateringPlants && <FluidSimulation />}
                        </Physics>
                    </Canvas>
                </div>

                {/* LEFT SIDE - Window (Moved from right to left as requested) */}
                <div style={{ gridColumn: '1', gridRow: '2', position: 'relative', zIndex: 10 }}>
                    <WindowView />
                </div>

                {/* RIGHT SIDE - Glass Cupboard with Golden Telephone */}
                <div style={{ gridColumn: '3', gridRow: '2', position: 'relative', zIndex: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <GlassCupboard>
                        <GoldenTelephone onClick={() => { playClickSound(); setActiveModal('contact'); }} />
                    </GlassCupboard>
                </div>

                {/* CENTER - Study Desk with Computer */}
                <div style={{ gridColumn: '2', gridRow: '2', position: 'relative', zIndex: 20, display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
                    <RetroComputer onOpenTerminal={() => { playClickSound(); setActiveModal('terminal'); }} />
                    <WateringCan 
                        onWater={() => { 
                            playClickSound(); 
                            setWateringPlants(true);
                            setTimeout(() => setActiveModal('agro'), 3000);
                        }} 
                        isWatering={wateringPlants}
                    />
                </div>

                {/* LEFT FOREGROUND - African Warrior */}
                <div style={{ position: 'absolute', left: '5%', bottom: '10%', zIndex: 30, height: '60vh' }}>
                    <WarriorCharacter />
                </div>

                {/* C-SHAPED LAMP - Bronze */}
                <div style={{ position: 'absolute', right: '20%', bottom: '20%', zIndex: 15 }}>
                    <CLamp />
                </div>

                {/* Modals */}
                {activeModal === 'contact' && <WhatsAppModal onClose={() => setActiveModal(null)} />}
                {activeModal === 'agro' && (
                    <div className="modal-overlay" onClick={() => setActiveModal(null)}>
                        <div className="agro-modal" onClick={e => e.stopPropagation()}>
                            <h1>Agro Services</h1>
                            <p>Welcome to our botanical consultancy...</p>
                            {/* Add Agro content here */}
                        </div>
                    </div>
                )}
            </div>

            {/* Mobile Floating Action Button for Warrior */}
            <div className="mobile-warrior-fab">
                <button onClick={() => setActiveModal('welcome')}>🛡️</button>
            </div>
        </>
    );
}
