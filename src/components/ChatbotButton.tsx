import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { GenerateContentResponse, GoogleGenAI } from '@google/genai';
import { motion } from 'motion/react';

const geminiApiKey = (
  import.meta.env.VITE_GEMINI_API_KEY ||
  process.env.GEMINI_API_KEY ||
  ''
).trim();

const assistantGreeting =
  "Bonjour ! Je suis l'assistant virtuel de Kafui. Comment puis-je vous aider aujourd'hui ?";
const missingKeyMessage =
  'Le chatbot n\'est pas configure. Ajoutez VITE_GEMINI_API_KEY ou GEMINI_API_KEY dans .env.local, puis redemarrez npm run dev.';

type ChatMessage = {
  text: string;
  isUser: boolean;
};

const ChatbotButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { text: geminiApiKey ? assistantGreeting : missingKeyMessage, isUser: false },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const getChatSession = () => {
    if (!geminiApiKey) {
      return null;
    }

    if (!chatRef.current) {
      const ai = new GoogleGenAI({ apiKey: geminiApiKey });
      chatRef.current = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction:
            "Tu es l'assistant virtuel de Kafui Charbel Eklu, un Administrateur Systeme et Reseau. Reponds de maniere professionnelle, concise et utile en francais.",
        },
      });
    }

    return chatRef.current;
  };

  useEffect(() => {
    getChatSession();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { text: userMessage, isUser: true }]);

    const chat = getChatSession();
    if (!chat) {
      setMessages((prev) => [...prev, { text: missingKeyMessage, isUser: false }]);
      return;
    }

    setIsLoading(true);

    try {
      const response: GenerateContentResponse = await chat.sendMessage({
        message: userMessage,
      });
      setMessages((prev) => [
        ...prev,
        {
          text:
            response.text ||
            "Desole, je n'ai pas pu generer de reponse.",
          isUser: false,
        },
      ]);
    } catch (error) {
      console.error('Erreur chatbot:', error);
      setMessages((prev) => [
        ...prev,
        {
          text: 'Une erreur est survenue. Verifiez la cle Gemini et reessayez.',
          isUser: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="chat-header-left">
              <div className={`chat-status-dot ${geminiApiKey ? 'online' : 'offline'}`}></div>
              <h3>Assistant Virtuel</h3>
            </div>
            <button className="chat-close-btn" onClick={() => setIsOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chat-bubble ${msg.isUser ? 'user' : 'bot'}`}
              >
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="chat-loading">
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                >
                  ...
                </motion.span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-area">
            <input
              type="text"
              className="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={
                geminiApiKey
                  ? 'Écrivez un message...'
                  : 'Configurez la clé Gemini dans .env.local'
              }
              disabled={!geminiApiKey || isLoading}
            />
            <button
              className="chat-send-btn"
              onClick={handleSend}
              disabled={!geminiApiKey || isLoading}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      )}

      <button
        className="chat-fab"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
    </>
  );
};

export default ChatbotButton;
