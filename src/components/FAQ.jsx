"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Plus, Minus } from "lucide-react";
import Image from "next/image";

const questions = [
    {
        question: "What makes EcoCart products eco-friendly?",
        answer: "Our products are eco-friendly because they are made from sustainable, renewable, or recycled materials, are often biodegradable or compostable, and are produced using ethical and low-impact methods."
    },
    {
        question: "Do you offer international shipping?",
        answer: "Yes, EcoCart ships worldwide! Shipping costs and delivery times vary by destination. You can find detailed information on our shipping policy page."
    },
    {
        question: "How can I track my order?",
        answer: "Once your order ships, you will receive a confirmation email containing your tracking number. You can use this number on our tracking page to view real-time updates on your shipment's location."
    },
    {
        question: "What is your return policy?",
        answer: "We offer a 30-day return policy for most items in their original condition. If you are not completely satisfied with your purchase, simply contact our support team to initiate the return process."
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section id="faq" className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
                    Frequently Asked Questions
                </h2>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Image Section */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative h-[600px] rounded-[24px] overflow-hidden hidden lg:block"
                    >
                        <Image
                            src="https://res.cloudinary.com/dvm1ouojr/image/upload/v1764846220/ecocart/jrgsdnzxftccz58a35an.jpg"
                            alt="EcoCart Support"
                            fill
                            className="object-cover"
                        />
                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-8">
                            <div className="text-white">
                                <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
                                <p className="text-gray-200">We're here to help you make the best sustainable choices.</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* FAQ List */}
                    <div className="space-y-6">
                        {questions.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`border rounded-[16px] transition-all duration-300 ${openIndex === index
                                        ? "bg-white border-green-500 shadow-[0_8px_30px_rgb(0,0,0,0.06)]"
                                        : "bg-white border-gray-100 hover:border-gray-200"
                                    }`}
                            >
                                <button
                                    onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
                                    className="flex items-center justify-between w-full p-6 text-left"
                                >
                                    <span className={`text-xl font-bold transition-colors ${openIndex === index ? "text-gray-900" : "text-gray-600"
                                        }`}>
                                        {item.question}
                                    </span>
                                    <div className={`p-2 rounded-full transition-colors ${openIndex === index ? "bg-green-50 text-green-600" : "bg-gray-50 text-gray-400"
                                        }`}>
                                        <ChevronDown
                                            className={`w-6 h-6 transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                                                }`}
                                        />
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                                                {item.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
