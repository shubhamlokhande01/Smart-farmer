import { useState, useRef, useEffect, useCallback } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Bot, X, Send, Loader2, Sprout, ChevronDown } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const GEMINI_KEY = import.meta.env.VITE_GEMINI_API_KEY as string;

const SYSTEM_CONTEXT = `You are "Krishi Mitra" (कृषि मित्र), an expert AI farming assistant for Indian farmers on the CodeFarma platform.

Your expertise: crop selection based on soil/climate/season, fertilizer recommendations (Indian brands: IFFCO, Coromandel, NFL, Chambal, Zuari), irrigation scheduling, pest & disease control, soil health improvement, weather-based advice, government schemes (PM-KISAN, Kisan Credit Card), mandi prices, organic farming.

Rules:
- Reply in the SAME language as the farmer (Hindi, Marathi, English, or mix)
- Use simple words — speak like a knowledgeable neighbor farmer
- Be concise and practical
- If asked non-farming topics, politely redirect to farming topics
- Use emojis occasionally to be friendly 🌱`;

interface Message {
    role: "user" | "assistant";
    text: string;
}

const SUGGESTIONS = [
    "🌾 Wheat fertilizer dose?",
    "🍅 Tomato pest control",
    "🌿 Best time to sow cotton?",
    "🌱 How to improve soil pH?",
];

function isConfigured(): boolean {
    return typeof GEMINI_KEY === "string" && GEMINI_KEY.trim().length > 0;
}

/** Sanitize and render simple markdown: **bold**, *italic*, newlines */
function formatText(text: string): string {
    return text
        // Escape any HTML that might be in the text to prevent XSS
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;")
        // Then apply safe markdown transforms
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\*(.*?)\*/g, "<em>$1</em>")
        .replace(/\n/g, "<br/>");
}

export function GeminiChatbot() {
    const { currentUser } = useAuth();
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const modelRef = useRef<ReturnType<GoogleGenerativeAI["getGenerativeModel"]> | null>(null);

    // Initialize greeting
    useEffect(() => {
        const name =
            currentUser?.displayName ??
            currentUser?.email?.split("@")[0] ??
            "Farmer";
        setMessages([
            {
                role: "assistant",
                text: `🌱 Namaste ${name}! I'm **Krishi Mitra**, your AI farming assistant. Ask me anything about crops, soil, fertilizers, or pests! 🚜`,
            },
        ]);
    }, [currentUser]);

    // Auto-scroll to the latest message
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    // Focus input when chat panel opens
    useEffect(() => {
        if (open) {
            const timer = setTimeout(() => inputRef.current?.focus(), 150);
            return () => clearTimeout(timer);
        }
    }, [open]);

    const getModel = useCallback(() => {
        if (!modelRef.current) {
            const genAI = new GoogleGenerativeAI(GEMINI_KEY);
            modelRef.current = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        }
        return modelRef.current;
    }, []);

    const sendMessage = useCallback(
        async (text: string) => {
            if (!text.trim() || loading || !isConfigured()) return;

            const userMsg: Message = { role: "user", text: text.trim() };

            setMessages((prev) => {
                const updatedMessages = [...prev, userMsg];

                // Fire async work outside the setter
                (async () => {
                    setInput("");
                    setLoading(true);

                    try {
                        const model = getModel();

                        // Build full conversation as a single prompt with history
                        const historyText = updatedMessages
                            .slice(1) // skip the greeting
                            .slice(-10) // last 10 messages for context window
                            .map(
                                (m) =>
                                    `${m.role === "user" ? "Farmer" : "Krishi Mitra"}: ${m.text}`
                            )
                            .join("\n\n");

                        const fullPrompt = `${SYSTEM_CONTEXT}\n\nConversation so far:\n${historyText}\n\nKrishi Mitra:`;

                        const result = await model.generateContent(fullPrompt);
                        const reply = result.response.text().trim();

                        setMessages((p) => [...p, { role: "assistant", text: reply }]);
                    } catch (err: unknown) {
                        console.error("[Gemini] Error:", err);
                        let errMsg = "Something went wrong. Please try again. 🙏";

                        if (err instanceof Error) {
                            if (err.message.includes("QUOTA")) {
                                errMsg = "⚠️ API quota exceeded. Please try again after some time.";
                            } else if (
                                err.message.includes("API_KEY_INVALID") ||
                                err.message.includes("invalid")
                            ) {
                                errMsg =
                                    "❌ Invalid Gemini API key. Please check VITE_GEMINI_API_KEY in your .env file.";
                            }
                        }

                        setMessages((p) => [...p, { role: "assistant", text: errMsg }]);
                    } finally {
                        setLoading(false);
                    }
                })();

                return updatedMessages;
            });
        },
        [loading, getModel]
    );

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage(input);
        }
    };

    const configured = isConfigured();

    return (
        <>
            {/* Floating toggle button */}
            <button
                onClick={() => setOpen((o) => !o)}
                className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-all duration-300 hover:scale-110 focus:outline-none"
                style={{ background: "linear-gradient(135deg, #16a34a, #15803d)" }}
                aria-label="Open Krishi Mitra farming chatbot"
            >
                {open ? (
                    <ChevronDown className="h-6 w-6 text-white" />
                ) : (
                    <Sprout className="h-6 w-6 text-white" />
                )}
                {/* Pulse indicator */}
                {!open && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex h-4 w-4 rounded-full bg-green-500" />
                    </span>
                )}
            </button>

            {/* Chat panel */}
            {open && (
                <div
                    className="fixed bottom-24 right-6 z-50 w-[360px] flex flex-col rounded-2xl border border-border bg-card shadow-2xl overflow-hidden"
                    style={{ maxHeight: "560px" }}
                >
                    {/* Header */}
                    <div
                        className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
                        style={{ background: "linear-gradient(135deg, #16a34a, #15803d)" }}
                    >
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20">
                            <Bot className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-bold text-white">Krishi Mitra 🌾</p>
                            <div className="flex items-center gap-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-green-300 animate-pulse" />
                                <p className="text-xs text-green-100">AI Farming Assistant • Online</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setOpen(false)}
                            className="text-white/70 hover:text-white transition-colors"
                            aria-label="Close chatbot"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* API key warning */}
                    {!configured && (
                        <div className="mx-3 mt-3 p-3 rounded-lg bg-orange-50 border border-orange-200 text-xs text-orange-700 flex-shrink-0">
                            ⚠️ Add{" "}
                            <code className="bg-orange-100 px-1 rounded font-mono">
                                VITE_GEMINI_API_KEY
                            </code>{" "}
                            to <code>.env</code> to activate.
                            <br />
                            <a
                                href="https://aistudio.google.com/app/apikey"
                                target="_blank"
                                rel="noreferrer"
                                className="underline font-medium"
                            >
                                Get free key →
                            </a>
                        </div>
                    )}

                    {/* Messages */}
                    <div
                        className="flex-1 overflow-y-auto p-4 space-y-3"
                        style={{ minHeight: 0 }}
                    >
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                {msg.role === "assistant" && (
                                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-green-100 mt-0.5">
                                        <Sprout className="h-3.5 w-3.5 text-green-700" />
                                    </div>
                                )}
                                <div
                                    className={`max-w-[78%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${msg.role === "user"
                                        ? "bg-green-600 text-white rounded-tr-sm"
                                        : "bg-muted text-foreground rounded-tl-sm"
                                        }`}
                                    /* formatText escapes HTML before applying safe markdown */
                                    dangerouslySetInnerHTML={{ __html: formatText(msg.text) }}
                                />
                            </div>
                        ))}

                        {/* Typing indicator */}
                        {loading && (
                            <div className="flex gap-2 items-center">
                                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                                    <Sprout className="h-3.5 w-3.5 text-green-700" />
                                </div>
                                <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
                                    <span
                                        className="h-2 w-2 rounded-full bg-green-500 animate-bounce"
                                        style={{ animationDelay: "0ms" }}
                                    />
                                    <span
                                        className="h-2 w-2 rounded-full bg-green-500 animate-bounce"
                                        style={{ animationDelay: "150ms" }}
                                    />
                                    <span
                                        className="h-2 w-2 rounded-full bg-green-500 animate-bounce"
                                        style={{ animationDelay: "300ms" }}
                                    />
                                </div>
                            </div>
                        )}
                        <div ref={bottomRef} />
                    </div>

                    {/* Quick suggestion chips (only at start) */}
                    {messages.length <= 1 && configured && (
                        <div className="px-3 pb-2 flex flex-wrap gap-1.5 flex-shrink-0">
                            {SUGGESTIONS.map((s, i) => (
                                <button
                                    key={i}
                                    onClick={() => sendMessage(s)}
                                    disabled={loading}
                                    className="text-xs px-2.5 py-1 rounded-full bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 transition-colors disabled:opacity-50"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Input bar */}
                    <div className="p-3 border-t border-border flex gap-2 flex-shrink-0">
                        <input
                            ref={inputRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder={
                                configured ? "Ask about crops, soil, pests…" : "Add API key to enable"
                            }
                            disabled={!configured || loading}
                            className="flex-1 rounded-xl border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-green-500/40 disabled:opacity-50"
                        />
                        <button
                            onClick={() => sendMessage(input)}
                            disabled={!input.trim() || loading || !configured}
                            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl transition-colors disabled:opacity-40"
                            style={{ background: "linear-gradient(135deg, #16a34a, #15803d)" }}
                            aria-label="Send message"
                        >
                            {loading ? (
                                <Loader2 className="h-4 w-4 animate-spin text-white" />
                            ) : (
                                <Send className="h-4 w-4 text-white" />
                            )}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
