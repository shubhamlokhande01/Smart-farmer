import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChatIcon, LeafIcon } from '@/components/icons/FarmingIcons';
import { X } from 'lucide-react';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY as string,
  dangerouslyAllowBrowser: true, // For demo purposes, in production use a backend
});


interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I\'m your farming assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a helpful farming assistant. Provide clear, concise answers in 5 lines or fewer.' },
          ...messages,
          userMessage
        ],
      });


      const assistantMessage: Message = {
        role: 'assistant',
        content: response.choices[0]?.message?.content || 'Sorry, I couldn\'t generate a response.'
      };
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error('Error:', error);

      let errorMsg = 'Sorry, there was an error. Please try again.';

      // Check status code from OpenAI SDK error
      const status = error?.status ?? error?.response?.status;
      if (status === 429) {
        errorMsg = '⚠️ OpenAI quota exceeded. Please add credits at platform.openai.com/settings/billing, then try again.';
      } else if (status === 401) {
        errorMsg = '🔑 Invalid API key. Please check your VITE_OPENAI_API_KEY in the .env file.';
      }

      setMessages(prev => [...prev, { role: 'assistant', content: errorMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <>
      {/* Chatbot Button */}
      <div
        className="fixed bottom-4 right-4 bg-primary text-primary-foreground p-3 rounded-full shadow-lg hover:bg-primary/90 cursor-pointer z-50 transition-transform hover:scale-105"
        onClick={() => setIsOpen(true)}
      >
        <ChatIcon className="h-6 w-6" />
      </div>

      {/* Chatbot Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end p-4">
          <div
            className="bg-background border border-border rounded-lg shadow-xl w-full max-w-md h-[500px] flex flex-col transform transition-transform duration-300 ease-in-out translate-x-full animate-slide-in"
            style={{ animation: 'slideIn 0.3s ease-out forwards' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center gap-2">
                <LeafIcon className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">Farming Assistant</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${message.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                      }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted text-muted-foreground p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                      Thinking...
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about farming..."
                  disabled={isLoading}
                />
                <Button onClick={sendMessage} disabled={isLoading || !input.trim()}>
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}