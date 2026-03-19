import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const slideIn = keyframes`
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
`;

const paperTexture = `
    background-color: #F5E6D3;
    background-image: 
        repeating-linear-gradient(0deg, transparent, transparent 28px, #E6D5C3 28px, #E6D5C3 29px),
        repeating-linear-gradient(90deg, transparent, transparent 28px, rgba(230, 213, 195, 0.3) 28px, rgba(230, 213, 195, 0.3) 29px);
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0; left: 0; width: 100vw; height: 100vh;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    animation: fadeIn 0.3s ease;
`;

const TelegramContainer = styled.div`
    width: 90%;
    max-width: 500px;
    ${paperTexture}
    border-radius: 2px;
    box-shadow: 
        0 20px 60px rgba(0,0,0,0.5),
        0 0 0 1px #D4AF37,
        inset 0 0 60px rgba(139, 69, 19, 0.1);
    padding: 2rem;
    position: relative;
    animation: ${slideIn} 0.5s ease;
    font-family: 'Cormorant Garamond', serif;
    
    &:before {
        content: 'TELEGRAM';
        position: absolute;
        top: -15px;
        left: 20px;
        background: #D4AF37;
        color: #2C1810;
        padding: 5px 15px;
        font-family: 'Cinzel', serif;
        font-weight: bold;
        font-size: 0.9rem;
        letter-spacing: 2px;
    }
`;

const CloseButton = styled.button`
    position: absolute;
    top: 10px;
    right: 10px;
    width: 30px;
    height: 30px;
    background: #8B0000;
    color: #F5E6D3;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-family: 'Cinzel', serif;
    display: flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
        background: #B22222;
        transform: rotate(90deg);
        transition: transform 0.3s;
    }
`;

const InputGroup = styled.div`
    margin-bottom: 1.5rem;
`;

const Label = styled.label`
    display: block;
    color: #5C4037;
    font-weight: 600;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
`;

const Input = styled.input`
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #D4AF37;
    background: rgba(255, 255, 255, 0.5);
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.1rem;
    color: #2C1810;
    outline: none;
    transition: all 0.3s;
    
    &:focus {
        background: white;
        box-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
    }
`;

const TextArea = styled.textarea`
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #D4AF37;
    background: rgba(255, 255, 255, 0.5);
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.1rem;
    color: #2C1810;
    min-height: 120px;
    resize: vertical;
    outline: none;
    
    &:focus {
        background: white;
        box-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
    }
`;

const SendButton = styled.button`
    width: 100%;
    padding: 1rem;
    background: linear-gradient(to bottom, #25D366, #128C7E);
    color: white;
    border: none;
    font-family: 'Cinzel', serif;
    font-size: 1.2rem;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    border-radius: 2px;
    box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);
    
    &:before {
        content: '✉';
        margin-right: 10px;
    }
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(37, 211, 102, 0.4);
    }
    
    &:active {
        transform: translateY(0);
    }
`;

export default function WhatsAppModal({ onClose }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [sending, setSending] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSending(true);
        
        // Format WhatsApp message
        const text = `*New Contact from Portfolio*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A%0A*Message:*%0A${formData.message}`;
        
        // Replace with your WhatsApp number (with country code, no +)
        const phoneNumber = '1234567890'; // UPDATE THIS
        
        // Open WhatsApp
        window.open(`https://wa.me/${phoneNumber}?text=${text}`, '_blank');
        
        setTimeout(() => {
            setSending(false);
            onClose();
        }, 1000);
    };

    return (
        <ModalOverlay onClick={onClose}>
            <TelegramContainer onClick={e => e.stopPropagation()}>
                <CloseButton onClick={onClose}>×</CloseButton>
                
                <h2 style={{ 
                    color: '#2C1810', 
                    fontFamily: 'Cinzel, serif',
                    borderBottom: '2px solid #D4AF37',
                    paddingBottom: '10px',
                    marginBottom: '20px'
                }}>
                    Dispatch a Message
                </h2>
                
                <form onSubmit={handleSubmit}>
                    <InputGroup>
                        <Label>Full Name</Label>
                        <Input 
                            type="text" 
                            required
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                            placeholder="Enter your name..."
                        />
                    </InputGroup>
                    
                    <InputGroup>
                        <Label>Electronic Mail</Label>
                        <Input 
                            type="email" 
                            required
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                            placeholder="your@domain.com"
                        />
                    </InputGroup>
                    
                    <InputGroup>
                        <Label>Missive</Label>
                        <TextArea 
                            required
                            value={formData.message}
                            onChange={e => setFormData({...formData, message: e.target.value})}
                            placeholder="Compose your message here..."
                        />
                    </InputGroup>
                    
                    <SendButton type="submit" disabled={sending}>
                        {sending ? 'Transmitting...' : 'Send via WhatsApp'}
                    </SendButton>
                </form>
                
                <p style={{ 
                    marginTop: '1rem', 
                    fontSize: '0.9rem', 
                    color: '#5C4037',
                    fontStyle: 'italic',
                    textAlign: 'center'
                }}>
                    "Messages delivered by digital telegram"
                </p>
            </TelegramContainer>
        </ModalOverlay>
    );
}
