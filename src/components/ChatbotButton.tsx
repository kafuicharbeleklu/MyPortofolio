import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { motion } from 'motion/react';

const apiUrl = import.meta.env.VITE_CHATBOT_API_URL;
console.log('[Chatbot] API URL au démarrage:', apiUrl);
const chatbotApiUrl = (apiUrl || '').trim();

const assistantGreeting =
  "Bonjour ! Je suis l'assistant virtuel de Kafui. Comment puis-je vous aider aujourd'hui ?";
const localMissingKeyMessage =
  "Le chatbot n'est pas configure. Ajoutez VITE_CHATBOT_API_URL dans .env.local, puis redemarrez l'application.";
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
  const shouldRenderChatbot = Boolean(chatbotApiUrl) || !isGitHubPagesHost;
  const missingKeyMessage = isGitHubPagesHost
    ? githubPagesMissingKeyMessage
    : localMissingKeyMessage;
  const isChatAvailable = Boolean(chatbotApiUrl);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { text: isChatAvailable ? assistantGreeting : missingKeyMessage, isUser: false },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

    if (!isChatAvailable) {
      setMessages((prev) => [...prev, { text: missingKeyMessage, isUser: false }]);
      return;
    }

    setIsLoading(true);

    try {
      const history = messages.slice(1).map((message) => ({
        role: message.isUser ? 'user' : 'assistant',
        text: message.text,
      }));

      const response = await fetch(chatbotApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          history,
        }),
      });

      const payload = (await response.json().catch(() => null)) as
        | {
            reply?: string;
            error?: string;
          }
        | null;

      if (!response.ok) {
        throw new Error(payload?.error || 'La requete du chatbot a echoue.');
      }

      setMessages((prev) => [
        ...prev,
        {
          text: payload?.reply || "Desole, je n'ai pas pu generer de reponse.",
          isUser: false,
        },
      ]);
    } catch (error) {
      console.error('Erreur chatbot:', error);
      setMessages((prev) => [
        ...prev,
        {
          text:
            "Une erreur reseau est survenue. Verifiez l'URL du worker Cloudflare puis reessayez.",
          isUser: false,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!shouldRenderChatbot) {
    return null;
  }

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
              <div className={`chat-status-dot ${isChatAvailable ? 'online' : 'offline'}`}></div>
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

          {isChatAvailable ? (
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
                  ? "Le chatbot IA n'est pas disponible tant que le worker Cloudflare n'est pas configure."
                  : "Ajoutez une URL de worker Cloudflare pour activer l'assistant."}
              </p>
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
