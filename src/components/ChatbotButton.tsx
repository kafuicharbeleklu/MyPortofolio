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
const localMissingKeyMessage =
  "Le chatbot n'est pas configure. Ajoutez VITE_GEMINI_API_KEY dans .env.local, puis redemarrez l'application.";
const githubPagesMissingKeyMessage =
  "Le chatbot IA n'est pas disponible sur cette version GitHub Pages. Utilisez plutot l'email ou LinkedIn pour me contacter.";
const chatbotPanelId = 'chatbot-panel';
const chatbotTitleId = 'chatbot-title';

type ChatMessage = {
  text: string;
  isUser: boolean;
};

const ChatbotButton: React.FC = () => {
  const isGitHubPagesHost =
    typeof window !== 'undefined' && window.location.hostname.endsWith('github.io');
  const missingKeyMessage = isGitHubPagesHost
    ? githubPagesMissingKeyMessage
    : localMissingKeyMessage;
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
    if (!input.trim() || isLoading) {
      return;
    }

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
          text: response.text || "Desole, je n'ai pas pu generer de reponse.",
          isUser: false,
        },
      ]);
    } catch (error) {
      console.error('Erreur chatbot:', error);
      setMessages((prev) => [
        ...prev,
        {
          text: 'Une erreur est survenue. Verifiez la configuration Gemini puis reessayez.',
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
        <div
          className="chat-window"
          id={chatbotPanelId}
          role="dialog"
          aria-modal="false"
          aria-labelledby={chatbotTitleId}
        >
          <div className="chat-header">
            <div className="chat-header-left">
              <div className={`chat-status-dot ${geminiApiKey ? 'online' : 'offline'}`}></div>
              <h3 id={chatbotTitleId}>Assistant Virtuel</h3>
            </div>
            <button
              type="button"
              className="chat-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Fermer le chatbot"
            >
              <X size={20} />
            </button>
          </div>

          <div className="chat-messages" aria-live="polite" aria-busy={isLoading}>
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

          {geminiApiKey ? (
            <div className="chat-input-area">
              <input
                type="text"
                className="chat-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ecrivez un message..."
                disabled={isLoading}
                aria-label="Message a envoyer"
              />
              <button
                type="button"
                className="chat-send-btn"
                onClick={handleSend}
                disabled={isLoading}
                aria-label="Envoyer le message"
              >
                <Send size={18} />
              </button>
            </div>
          ) : (
            <div className="chat-unavailable">
              <p className="chat-unavailable-copy">
                {isGitHubPagesHost
                  ? "Pour un contact rapide, utilisez les liens ci-dessous."
                  : "Ajoutez une cle Gemini locale pour activer l'assistant."}
              </p>
              <div className="chat-help-links">
                <a className="chat-help-link" href="mailto:charbelkafuieklu@gmail.com">
                  Email
                </a>
                <a
                  className="chat-help-link"
                  href="https://www.linkedin.com/in/kafui-charbel-eklu"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          )}
        </div>
      )}

      <button
        type="button"
        className="chat-fab"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Fermer le chatbot' : 'Ouvrir le chatbot'}
        aria-expanded={isOpen}
        aria-controls={chatbotPanelId}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
    </>
  );
};

export default ChatbotButton;
