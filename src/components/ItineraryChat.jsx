import { useState, useRef, useEffect } from 'react';
import { chatWithItinerary } from '../utils/GeminiApi';
import './ItineraryChat.css';

const SUGGESTIONS = [
  'What should I pack for this trip?',
  'Which day has the best activities?',
  'Can you suggest a budget-friendly alternative for Day 1?',
  'What is the best local food to try?',
  'Are there any safety tips I should know?',
  'What is the weather usually like on this route?',
];

export default function ItineraryChat({ itinerary }) {
  const [history, setHistory]   = useState([]);
  const [input, setInput]       = useState('');
  const [loading, setLoading]   = useState(false);
  const [started, setStarted]   = useState(false);
  const [error, setError]       = useState('');
  const bottomRef               = useRef(null);
  const inputRef                = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, loading]);

  const sendMessage = async (text) => {
    const msg = text || input.trim();
    if (!msg || loading) return;

    setStarted(true);
    setInput('');
    setError('');
    setLoading(true);

    // Snapshot history before update for the API call
    const currentHistory = [...history];

    // Show user message immediately with null assistant (loading state)
    setHistory(prev => [...prev, { user: msg, assistant: null }]);

    try {
      const reply = await chatWithItinerary(itinerary, currentHistory, msg);
      // Fill in the assistant response
      setHistory(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = { user: msg, assistant: reply };
        return updated;
      });
    } catch (e) {
      console.error('Chat error:', e.message);
      setError('Failed to get a response. Check your Gemini API key in .env');
      // Remove the failed message
      setHistory(prev => prev.slice(0, -1));
      if (history.length === 0) setStarted(false);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat card">

      {/* Header */}
      <div className="chat__header">
        <div>
          <span className="label-xs">💬 Chat with Your Itinerary</span>
          <p className="chat__subtitle">Ask anything about your trip — powered by Gemini AI</p>
        </div>
        {history.length > 0 && (
          <button className="chat__clear" onClick={() => { setHistory([]); setStarted(false); }}>
            Clear
          </button>
        )}
      </div>

      {/* Welcome / Suggestions */}
      {!started && (
        <div className="chat__welcome">
          <div className="chat__welcome-icon">🌴</div>
          <p className="chat__welcome-text">
            Hi! I know everything about your itinerary. Ask me anything — alternatives, tips, costs, what to pack, and more.
          </p>
          <div className="chat__suggestions">
            {SUGGESTIONS.map((s, i) => (
              <button
                key={i}
                className="chat__suggestion"
                onClick={() => sendMessage(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      {started && (
        <div className="chat__messages">
          {history.map((msg, i) => (
            <div key={i} className="chat__turn">
              {/* User bubble */}
              <div className="chat__bubble chat__bubble--user">
                <span>{msg.user}</span>
              </div>

              {/* Assistant bubble */}
              {msg.assistant ? (
                <div className="chat__bubble chat__bubble--assistant">
                  <span className="chat__gemini-badge">✦ Gemini</span>
                  <p>{msg.assistant.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1')}</p>
                </div>
              ) : (
                <div className="chat__bubble chat__bubble--assistant chat__bubble--loading">
                  <span className="chat__dot" /><span className="chat__dot" /><span className="chat__dot" />
                </div>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      )}

      {/* Error */}
      {error && <p className="chat__error">{error}</p>}

      {/* Input */}
      <div className="chat__input-row">
        <textarea
          ref={inputRef}
          className="chat__input"
          placeholder="Ask about your itinerary..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          rows={1}
          disabled={loading}
        />
        <button
          className="chat__send"
          onClick={() => sendMessage()}
          disabled={!input.trim() || loading}
        >
          {loading ? '⏳' : '→'}
        </button>
      </div>
      <p className="chat__hint">Press Enter to send · Shift+Enter for new line</p>
    </div>
  );
}