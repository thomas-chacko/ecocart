"use client";

import { useState, useEffect } from "react";
import AdminProtected from "@/components/AdminProtected";
import { Mail, Calendar, User, MessageSquare } from "lucide-react";

function MessagesContent() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const res = await fetch("/api/messages");
            const data = await res.json();
            if (data.success) {
                setMessages(data.data);
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Messages</h1>
                <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg shadow text-sm font-medium text-gray-600 dark:text-gray-300">
                    Total Messages: {messages.length}
                </div>
            </div>

            {messages.length === 0 ? (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-12 text-center">
                    <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">No messages yet</h3>
                    <p className="text-gray-500 dark:text-gray-400">Messages from the contact form will appear here.</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {messages.map((msg) => (
                        <div
                            key={msg._id}
                            className="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition-shadow p-6 border-l-4 border-green-500"
                        >
                            <div className="flex flex-col sm:flex-row justify-between items-start mb-4 gap-4 sm:gap-0">
                                <div className="flex items-center gap-3">
                                    <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                                        <User className="h-5 w-5 text-green-600 dark:text-green-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white">{msg.name}</h3>
                                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 break-all">
                                            <Mail className="h-3 w-3 mr-1 flex-shrink-0" />
                                            {msg.email}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded w-full sm:w-auto mt-2 sm:mt-0">
                                    <Calendar className="h-3 w-3 mr-1" />
                                    {new Date(msg.createdAt).toLocaleDateString()} at {new Date(msg.createdAt).toLocaleTimeString()}
                                </div>
                            </div>
                            <div className="bg-gray-50 dark:bg-gray-900/50 rounded p-4 text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                {msg.message}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default function MessagesPage() {
    return (
        <AdminProtected>
            <MessagesContent />
        </AdminProtected>
    );
}
