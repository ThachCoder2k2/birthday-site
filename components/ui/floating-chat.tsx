'use client';

import { useState, useEffect, useCallback } from 'react';
import { User, Bot } from 'lucide-react';

interface ChatBubble {
  id: string;
  message: string;
  x: number;
  y: number;
  type: 'user' | 'bot';
  isVisible: boolean;
}

const CHAT_MESSAGES = [
  'Hello there! 👋',
  'How are you doing?',
  'Great weather today!',
  'Need any help?',
  'Have a wonderful day!',
  'Thanks for visiting!',
  "Hope you're enjoying this!",
  'Nice to see you here!',
  "What's on your mind?",
  'Stay awesome! ✨',
  'Keep up the good work!',
  "You're doing great!",
  'Sending good vibes 🌟',
  'Hope this makes you smile!',
  'Have an amazing day ahead!',
];

export function FloatingChat() {
  const [chatBubbles, setChatBubbles] = useState<ChatBubble[]>([]);

  const createChatBubble = useCallback(() => {
    const newBubble: ChatBubble = {
      id: Math.random().toString(36).substr(2, 9),
      message: CHAT_MESSAGES[Math.floor(Math.random() * CHAT_MESSAGES.length)],
      x: Math.random() * (window.innerWidth - 300), // Account for bubble width
      y: window.innerHeight + 100, // Start below viewport
      type: Math.random() > 0.5 ? 'user' : 'bot',
      isVisible: true,
    };

    setChatBubbles((prev) => [...prev, newBubble]);

    // Remove bubble after animation completes
    setTimeout(() => {
      setChatBubbles((prev) =>
        prev.filter((bubble) => bubble.id !== newBubble.id)
      );
    }, 8000); // Total animation duration
  }, []);

  useEffect(() => {
    // Create initial bubble after a short delay
    const initialTimeout = setTimeout(() => {
      createChatBubble();
    }, 1000);

    // Create bubbles at random intervals
    const interval = setInterval(() => {
      if (Math.random() > 0.3) {
        // 70% chance to create a bubble
        createChatBubble();
      }
    }, 2000 + Math.random() * 3000); // Random interval between 2-5 seconds

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, [createChatBubble]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {chatBubbles.map((bubble) => (
        <ChatBubbleComponent key={bubble.id} bubble={bubble} />
      ))}
    </div>
  );
}

interface ChatBubbleComponentProps {
  bubble: ChatBubble;
}

function ChatBubbleComponent({ bubble }: ChatBubbleComponentProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`absolute transition-all duration-[8000ms] ease-out ${
        mounted
          ? 'opacity-0 transform -translate-y-[100vh]'
          : 'opacity-100 transform translate-y-0'
      }`}
      style={{
        left: `${bubble.x}px`,
        top: `${bubble.y}px`,
        animation: 'float-up 8s ease-out forwards',
      }}
    >
      <div
        className={`
        flex items-start gap-2 max-w-xs p-3 rounded-2xl shadow-lg backdrop-blur-sm
        ${
          bubble.type === 'user'
            ? 'bg-blue-500/90 text-white flex-row-reverse'
            : 'bg-white/90 text-gray-800'
        }
        animate-bounce-gentle
      `}
      >
        <div
          className={`
          flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
          ${bubble.type === 'user' ? 'bg-blue-600' : 'bg-gray-200'}
        `}
        >
          {bubble.type === 'user' ? (
            <User className="w-4 h-4 text-white" />
          ) : (
            <Bot className="w-4 h-4 text-gray-600" />
          )}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium leading-relaxed">
            {bubble.message}
          </p>
        </div>
      </div>
    </div>
  );
}
