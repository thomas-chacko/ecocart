"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const testimonials = [
    {
        quote: "EcoCart has completely changed the way I shop. Their products are not only effective but also align with my values. The bamboo toothbrush is a game-changer!",
        name: "Sarah L.",
        avatar: "https://res.cloudinary.com/dvm1ouojr/image/upload/v1764850121/ecocart/rykaqz8luyxucc4wmnx8.jpg",
    },
    {
        quote: "I'm always looking for sustainable alternatives, and EcoCart delivers. High-quality products, excellent service, and peace of mind knowing I'm making a difference.",
        name: "Mark T.",
        avatar: "https://res.cloudinary.com/dvm1ouojr/image/upload/v1764850121/ecocart/rykaqz8luyxucc4wmnx8.jpg",
    },
    {
        quote: "Finally, a brand that truly cares! From the packaging to the product itself, everything is eco-conscious. My home is now filled with beautiful, sustainable items.",
        name: "Jessica P.",
        avatar: "https://res.cloudinary.com/dvm1ouojr/image/upload/v1764850121/ecocart/rykaqz8luyxucc4wmnx8.jpg",
    },
];

export default function Testimonials() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section ref={ref} className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                        What Our Customers Say
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="bg-white p-8 rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 flex flex-col justify-between hover:shadow-[0_8px_40px_rgb(0,0,0,0.08)] transition-all duration-300"
                        >
                            <p className="text-gray-600 italic mb-8 leading-relaxed text-lg">
                                "{testimonial.quote}"
                            </p>

                            <div className="flex items-center gap-4">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                    <Image
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <span className="font-semibold text-gray-900 text-lg">
                                    {testimonial.name}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
