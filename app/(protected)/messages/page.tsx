"use client";

import React, {useState, useEffect, useRef} from "react";
import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Send, Search, ArrowLeft, Smile} from "lucide-react";
import {CiImageOn} from "react-icons/ci";
import Image from "next/image";
import {dummyChats} from "@/data/messages";
import {io} from "socket.io-client";
import EmojiPicker, {EmojiClickData} from "emoji-picker-react";
// import "./chat.css";

interface ChatThread {
  id: string;
  sellerName: string;
  lastMessage: string;
  lastMessageTime: string;
  lastOnline: string;
  isOnline: boolean;
  sellerAvatar: string;
  messages: Message[];
}

interface Message {
  id: string;
  sender: "buyer" | "seller";
  content: string;
  timestamp: string;
  type: "text" | "image" | "product";
  read?: boolean;
  reactions?: {[key: string]: number};
}

const formatTime = (date: Date) => {
  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState<ChatThread | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [longPressMsgId, setLongPressMsgId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedChat) {
      setMessages(selectedChat.messages);
    }
  }, [selectedChat]);

  // useEffect(() => {
  //   messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
  // }, [messages]);

  useEffect(() => {
    const socket = io("http://localhost:3000");

    socket.on("message", (newMessage: Message) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    socket.on("typing", (typing: boolean) => {
      setIsTyping(typing);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSendMessage = (
    type: "text" | "image" | "product",
    content?: string
  ) => {
    if (!input.trim() && type === "text" && !content) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: "buyer",
      content: type === "text" ? input : content || "",
      timestamp: formatTime(new Date()),
      type,
      read: false,
      reactions: {},
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setShowEmojiPicker(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        handleSendMessage("image", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReaction = (msgId: string, emoji: string) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === msgId
          ? {
              ...msg,
              reactions: {
                ...msg.reactions,
                [emoji]: (msg.reactions?.[emoji] || 0) + 1,
              },
            }
          : msg
      )
    );
    setLongPressMsgId(null); // Menyembunyikan menu reaksi setelah memilih
  };

  const TypingIndicator = () => (
    <div className='flex items-center space-x-1 ml-2'>
      <div className='animate-bounce w-2 h-2 bg-gray-500 rounded-full' />
      <div className='animate-bounce w-2 h-2 bg-gray-500 rounded-full delay-100' />
      <div className='animate-bounce w-2 h-2 bg-gray-500 rounded-full delay-200' />
    </div>
  );

  const ProductMessage = () => (
    <Card className='p-3 bg-white w-64 shadow-md hover:shadow-lg transition-shadow'>
      <img
        src='/images/jaket-1.png'
        alt='Eco Jacket'
        className='w-full h-32 object-cover rounded-lg mb-2 object-top'
      />
      <div className='font-semibold text-gray-800'>Jaket Ramie Organik</div>
      <div className='text-sm text-gray-600'>Rp 450.000</div>
      <Button className='mt-2 w-full bg-gradient-to-r from-[#45C6AB] to-[#3AAFA9] hover:from-[#3AAFA9] hover:to-[#2B7A78] text-white'>
        Lihat Produk
      </Button>
    </Card>
  );

  return (
    <div className='flex bg-gradient-to-br from-[#DEF2F1] to-white rounded-none md:rounded-2xl border border-gray-200 shadow-xl overflow-hidden w-full h-screen md:h-[90vh] mx-auto'>
      {/* Daftar Chat */}
      {(!isMobile || !selectedChat) && (
        <div className='w-full md:w-1/3 border-r border-gray-200 p-2 md:p-4 overflow-y-auto bg-white/90 backdrop-blur-sm'>
          <div className='hidden md:block mb-4'>
            <h2 className='text-2xl font-bold text-[#2B7A78]'>EcoChat</h2>
          </div>

          <div className='relative mb-4'>
            <div className='absolute inset-y-0 left-3 flex items-center'>
              <Search className='text-gray-400' size={20} />
            </div>
            <input
              type='text'
              placeholder='Cari penjual...'
              className='w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#3AAFA9]/30'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className='space-y-2'>
            {(dummyChats as ChatThread[])
              .filter((chat: ChatThread) =>
                chat.sellerName.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((chat: ChatThread) => (
                <Card
                  key={chat.id}
                  className={`p-2 md:p-3 cursor-pointer transition-all ${
                    selectedChat?.id === chat.id
                      ? "border-2 border-[#2B7A78] bg-[#DEF2F1]"
                      : "border hover:border-[#3AAFA9]/50"
                  }`}
                  onClick={() => setSelectedChat(chat)}
                >
                  <div className='flex items-center'>
                    <div className='relative'>
                      <Image
                        src={chat.sellerAvatar}
                        className='w-10 h-10 md:w-12 md:h-12 rounded-full mr-2 object-cover'
                        alt={chat.sellerName}
                        width={500}
                        height={500}
                      />
                    </div>
                    <div className='flex-1'>
                      <div className='flex justify-between items-center'>
                        <h3 className='text-sm md:text-base font-semibold'>
                          {chat.sellerName}
                        </h3>
                        <span className='text-xs text-gray-500'>
                          {chat.lastMessageTime}
                        </span>
                      </div>
                      <p className='text-xs text-gray-500 truncate'>
                        {chat.lastMessage}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      )}

      {/* Area Chat Utama */}
      {selectedChat && (
        <div className='flex-1 flex flex-col bg-gradient-to-b from-white to-[#DEF2F1]/30'>
          {/* Header */}
          <div className='p-3 md:p-4 border-b border-gray-200 bg-white/90 backdrop-blur-sm flex items-center'>
            {isMobile && (
              <Button
                className='mr-2 p-1.5 bg-white shadow-sm hover:bg-gray-100'
                onClick={() => setSelectedChat(null)}
              >
                <ArrowLeft className='w-5 h-5 text-[#2B7A78]' />
              </Button>
            )}
            <div className='relative'>
              <img
                src={selectedChat.sellerAvatar}
                className='w-8 h-8 md:w-12 md:h-12 rounded-full'
                alt={selectedChat.sellerName}
              />
              <div
                className={`absolute bottom-0 right-0 w-2 h-2 md:w-3 md:h-3 rounded-full border-2 border-white ${
                  selectedChat.isOnline ? "bg-green-500" : "bg-gray-400"
                }`}
              />
            </div>
            <div className='ml-3'>
              <h2 className='text-base md:text-lg font-semibold'>
                {selectedChat.sellerName}
              </h2>
              <div className='text-xs md:text-sm text-gray-500'>
                {isTyping ? (
                  <TypingIndicator />
                ) : selectedChat.isOnline ? (
                  "Online"
                ) : (
                  "Offline"
                )}
              </div>
            </div>
          </div>

          {/* Pesan */}
          <div className='flex-1 overflow-y-auto p-2 md:p-4 space-y-3 md:space-y-4 relative'>
            {messages.map((msg: Message) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "buyer" ? "justify-end" : "justify-start"
                } group`}
                onMouseDown={() => setLongPressMsgId(msg.id)}
                onMouseUp={() => setLongPressMsgId(null)}
                onTouchStart={() => setLongPressMsgId(msg.id)}
                onTouchEnd={() => setLongPressMsgId(null)}
              >
                <div
                  className={`relative max-w-[85%] md:max-w-xl p-3 md:p-4 rounded-2xl transition-all duration-200 ${
                    msg.sender === "buyer"
                      ? "bg-gradient-to-r from-[#45C6AB] to-[#3AAFA9] text-white rounded-br-none shadow-lg"
                      : "bg-white text-gray-800 rounded-bl-none shadow-md"
                  }`}
                  style={{
                    borderRadius:
                      msg.sender === "buyer"
                        ? "20px 20px 4px 20px"
                        : "20px 20px 20px 4px",
                  }}
                >
                  {msg.type === "text" && (
                    <div className='text-sm md:text-base break-words'>
                      {msg.content}
                    </div>
                  )}
                  {msg.type === "image" && (
                    <img
                      src={msg.content}
                      alt='Uploaded content'
                      className='w-48 h-32 md:w-64 md:h-48 object-cover rounded-xl shadow-sm'
                    />
                  )}
                  {msg.type === "product" && <ProductMessage />}

                  {/* Footer Pesan */}
                  <div
                    className={`mt-2 flex items-center justify-end space-x-2 ${
                      msg.sender === "buyer" ? "text-white/80" : "text-gray-500"
                    }`}
                  >
                    <span className='text-xs opacity-75'>{msg.timestamp}</span>
                    {msg.sender === "buyer" && (
                      <span className='text-xs'>{msg.read ? "✓✓" : "✓"}</span>
                    )}
                  </div>

                  {/* Tampilkan menu reaksi jika longPressMsgId sama dengan msg.id */}
                  {longPressMsgId === msg.id && (
                    <div className='absolute -top-8 right-0 flex space-x-1 bg-white/90 backdrop-blur-sm p-1 rounded-full shadow-lg border'>
                      {["👍", "❤️", "😲", "😢"].map((emoji) => (
                        <button
                          key={emoji}
                          onClick={() => handleReaction(msg.id, emoji)}
                          className='p-1 hover:bg-gray-100 rounded-full transition-colors'
                        >
                          <span className='text-xl'>{emoji}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className='sticky bottom-0 p-2 md:p-4 bg-white/90 border-t border-gray-200 backdrop-blur-sm'>
            <div className='relative'>
              {showEmojiPicker && (
                <div className='absolute bottom-14 left-0 z-10 animate-slide-up'>
                  <EmojiPicker
                    width='100%'
                    height={350}
                    onEmojiClick={(emoji: EmojiClickData) => {
                      setInput((prev) => prev + emoji.emoji);
                      setShowEmojiPicker(false);
                    }}
                    skinTonesDisabled
                    searchDisabled
                    previewConfig={{showPreview: false}}
                  />
                </div>
              )}

              <div className='flex items-center gap-1 md:gap-2'>
                <Button
                  variant='ghost'
                  className='p-1.5 md:p-2 text-gray-600 hover:bg-gray-100'
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  <Smile className='w-5 h-5 md:w-6 md:h-6' />
                </Button>

                <Button
                  variant='ghost'
                  className='p-1.5 md:p-2 text-gray-600 hover:bg-gray-100'
                  onClick={() => fileInputRef.current?.click()}
                >
                  <CiImageOn className='w-5 h-5 md:w-6 md:h-6' />
                  <input
                    type='file'
                    ref={fileInputRef}
                    accept='image/*'
                    className='hidden'
                    onChange={handleImageUpload}
                  />
                </Button>

                <input
                  type='text'
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                  }}
                  placeholder='Tulis pesan...'
                  className='flex-1 py-2 px-3 md:py-3 md:px-4 text-sm md:text-base rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#3AAFA9]/30'
                />

                <Button
                  className='bg-gradient-to-r from-[#45C6AB] to-[#3AAFA9] hover:from-[#3AAFA9] hover:to-[#2B7A78] text-white p-1.5 md:p-2 rounded-full absolute right-2'
                  onClick={() => handleSendMessage("text")}
                >
                  <Send className='w-4 h-4 md:w-5 md:h-5' />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
