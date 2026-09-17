"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { MessageSquare, X, Send, User, ShoppingBag, ArrowRight, Check, Star } from "lucide-react";
import { ChatbotLogo } from "@/components/ui/ChatbotLogo";

interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
}

interface MiniServicePreview {
  slug: string;
  name: string;
  price: number;
  highlight: string;
  featured?: boolean;
}

const KNOWN_SERVICES: MiniServicePreview[] = [
  {
    slug: "starter-website",
    name: "Starter Website",
    price: 3499,
    highlight: "5–10 Pages • 1 Yr Hosting • SSL",
  },
  {
    slug: "royal-website",
    name: "Royal Website",
    price: 5499,
    highlight: "15–20 Pages • Admin Panel • SEO",
    featured: true,
  },
  {
    slug: "ecommerce-starter",
    name: "Ecommerce Starter",
    price: 9999,
    highlight: "Full Store • Product DB • Cart",
  },
];

export function ChatbotWidget() {
  const pathname = usePathname();
  const { addItem } = useCart();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [addedSlug, setAddedSlug] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      text: "Hello! Welcome to RyxerMart. I am your customer guidance assistant. How can I assist you with website development or e-commerce packages today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Hide inside admin panel
  if (pathname.startsWith("/admin")) {
    return null;
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const suggestedPrompts = [
    "What website packages do you offer?",
    "Which package is suitable for a small business?",
    "What is included in the ₹5,499 package?",
    "Show me your ecommerce options.",
  ];

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMessageId = String(Date.now());
    const userMsg: ChatMessage = { id: userMessageId, role: "user", text: query };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setLoading(true);

    try {
      const history = messages
        .filter((m) => m.id !== "welcome")
        .slice(-6)
        .map((m) => ({
          role: m.role,
          parts: m.text,
        }));

      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query, history }),
      });

      const data = await res.json();
      const botMsg: ChatMessage = {
        id: String(Date.now() + 1),
        role: "model",
        text:
          data.reply ||
          "I am having difficulty reaching the server. Please contact us on WhatsApp directly!",
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now() + 1),
          role: "model",
          text: "Network error. Please try again or reach our team on WhatsApp.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Quick add-to-cart directly from chatbot recommendation card
  const handleQuickAdd = (svc: MiniServicePreview) => {
    addItem(
      {
        serviceId: svc.slug,
        slug: svc.slug,
        name: svc.name,
        price: svc.price,
      },
      1,
      false
    );

    setAddedSlug(svc.slug);
    toast(`"${svc.name}" added to your cart from Assistant.`, {
      type: "success",
      title: "Package Added",
    });

    setTimeout(() => {
      setAddedSlug(null);
    }, 1800);
  };

  // Check if message text discusses any of our known packages to show interactive mini card
  const getRelevantService = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.includes("royal website") || lower.includes("5,499") || lower.includes("5499")) {
      return KNOWN_SERVICES[1];
    }
    if (lower.includes("ecommerce starter") || lower.includes("9,999") || lower.includes("9999")) {
      return KNOWN_SERVICES[2];
    }
    if (lower.includes("starter website") || lower.includes("3,499") || lower.includes("3499")) {
      return KNOWN_SERVICES[0];
    }
    return null;
  };

  return (
    <aside
      aria-label="Customer Support Chatbot"
      className="fixed bottom-6 right-6 z-40 flex flex-col items-end"
    >
      {/* Expanded Chat Box */}
      {isOpen && (
        <div className="w-[calc(100vw-2rem)] sm:w-[26rem] h-[520px] max-h-[82vh] bg-white dark:bg-slate-900 rounded-2xl shadow-elevated border border-brand-border dark:border-slate-800 flex flex-col overflow-hidden mb-3 animate-pop-in transition-all">
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-navy via-brand-royal to-brand-navy dark:from-slate-950 dark:to-slate-900 p-4 text-white flex items-center justify-between border-b border-brand-royal/40 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <ChatbotLogo className="w-9 h-9 flex-shrink-0 drop-shadow-sm" />
              <div>
                <h3 className="text-sm font-bold text-white leading-none">
                  RyxerMart Assistant
                </h3>
                <p className="text-[11px] text-slate-300 dark:text-slate-400 mt-0.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                  Live package guidance &amp; pricing
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Close assistant chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/70 dark:bg-slate-950/60">
            {messages.map((msg) => {
              const matchedService = msg.role === "model" ? getRelevantService(msg.text) : null;
              return (
                <div key={msg.id} className="space-y-2">
                  <div
                    className={`flex gap-2.5 ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    {msg.role === "model" && (
                      <ChatbotLogo className="w-7 h-7 flex-shrink-0 mt-0.5 drop-shadow-sm" />
                    )}
                    <div
                      className={`max-w-[84%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-brand-navy dark:bg-brand-royal text-white rounded-br-none"
                          : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/80 rounded-bl-none shadow-subtle whitespace-pre-line"
                      }`}
                    >
                      {msg.text}
                    </div>
                    {msg.role === "user" && (
                      <div className="w-6 h-6 rounded-full bg-slate-300 dark:bg-slate-700 text-slate-700 dark:text-slate-200 flex items-center justify-center flex-shrink-0 mt-1">
                        <User className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>

                  {/* Interactive Recommended Service Card inside Chat */}
                  {matchedService && (
                    <div className="ml-8 p-3 rounded-xl bg-white dark:bg-slate-850 border border-brand-violet/30 dark:border-purple-500/30 shadow-subtle space-y-2 max-w-[84%] animate-fade-in">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-brand-navy dark:text-white">
                            {matchedService.name}
                          </span>
                          {matchedService.featured && (
                            <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-brand-violet text-white">
                              Popular
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-black text-brand-violet dark:text-purple-400">
                          ₹{matchedService.price.toLocaleString("en-IN")}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {matchedService.highlight}
                      </p>
                      <div className="flex items-center gap-2 pt-1 border-t border-slate-100 dark:border-slate-800">
                        <Link
                          href={`/services/${matchedService.slug}`}
                          onClick={() => setIsOpen(false)}
                          className="flex-1 text-center py-1.5 px-2.5 text-[11px] font-bold text-brand-navy dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 rounded-lg transition-colors flex items-center justify-center gap-1"
                        >
                          <span>View</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleQuickAdd(matchedService)}
                          className={`flex-1 py-1.5 px-2.5 text-[11px] font-bold text-white rounded-lg transition-all active:scale-95 flex items-center justify-center gap-1.5 ${
                            addedSlug === matchedService.slug
                              ? "bg-emerald-600 shadow-sm"
                              : "bg-brand-violet hover:bg-brand-violet-hover shadow-sm"
                          }`}
                        >
                          {addedSlug === matchedService.slug ? (
                            <span className="inline-flex items-center gap-1">
                              <span>Added</span>
                              <Check className="w-3.5 h-3.5 text-white animate-scale-in" />
                            </span>
                          ) : (
                            <>
                              <ShoppingBag className="w-3 h-3" />
                              <span>Add to Cart</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing Indicator */}
            {loading && (
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs py-2 px-1">
                <ChatbotLogo className="w-7 h-7 flex-shrink-0 animate-pulse drop-shadow-sm" />
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl px-3 py-2 flex items-center gap-1.5 shadow-subtle">
                  <span className="w-2 h-2 rounded-full bg-brand-violet animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 rounded-full bg-brand-violet animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 rounded-full bg-brand-violet animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts */}
          {messages.length <= 2 && (
            <div className="p-2.5 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex gap-1.5 overflow-x-auto no-scrollbar">
              {suggestedPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt)}
                  className="text-[11px] font-medium text-brand-navy dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-brand-violet-light dark:hover:bg-slate-750 hover:text-brand-violet dark:hover:text-white border border-slate-200 dark:border-slate-700 rounded-full px-3 py-1.5 whitespace-nowrap transition-all duration-200 hover:scale-105 active:scale-95 flex-shrink-0"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about packages or pricing..."
              className="flex-1 text-xs sm:text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-850 focus:outline-none focus:ring-2 focus:ring-brand-violet"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2.5 bg-brand-violet hover:bg-brand-violet-hover disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-600 text-white rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet shadow-sm"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Toggle Button with Chatbot Logo and attention badge */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-2.5 bg-gradient-to-r from-brand-navy to-brand-royal hover:from-brand-royal hover:to-brand-violet text-white rounded-full shadow-card-hover transition-all duration-300 hover:scale-105 active:scale-95 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-violet border-2 border-white dark:border-slate-800"
        aria-label="Chat with RyxerMart Customer Assistant"
      >
        <div className="relative flex items-center justify-center">
          <ChatbotLogo className="w-7 h-7 transition-transform duration-200 group-hover:scale-110 group-hover:rotate-3 drop-shadow-sm" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 border-2 border-brand-navy dark:border-slate-900 rounded-full animate-pulse" />
        </div>
        <span className="text-xs font-bold tracking-wide">
          {isOpen ? "Close Assistant" : "Ask Assistant"}
        </span>
      </button>
    </aside>
  );
}
