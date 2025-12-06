"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const blogPosts = [
    {
        image: "https://res.cloudinary.com/dvm1ouojr/image/upload/v1764846220/ecocart/jrgsdnzxftccz58a35an.jpg",
        title: "The Power of Bamboo: Why It's the Future of Sustainable Products",
        excerpt: "Discover how bamboo, a rapidly renewable resource, is revolutionizing the world of eco-friendly products, from toothbrushes to...",
        slug: "#"
    },
    {
        image: "https://res.cloudinary.com/dvm1ouojr/image/upload/v1764846220/ecocart/jrgsdnzxftccz58a35an.jpg",
        title: "Simple Steps to Minimizing Your Plastic Footprint",
        excerpt: "Reducing plastic waste can feel overwhelming, but it doesn't have to be. Here are practical and easy tips to incorporate into...",
        slug: "#"
    },
    {
        image: "https://res.cloudinary.com/dvm1ouojr/image/upload/v1764846220/ecocart/jrgsdnzxftccz58a35an.jpg",
        title: "Behind the Scenes: The Journey of an Eco-Conscious Brand",
        excerpt: "Explore the values and processes that drive EcoCart. We take you through our commitment to ethical sourcing, sustainable...",
        slug: "#"
    }
];

export default function BlogSection() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="blog" ref={ref} className="py-24 bg-primary-gray">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                        Latest from Our Blog
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="group bg-white rounded-[20px] overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
                        >
                            <div className="relative h-64 w-full overflow-hidden">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                                    {post.title}
                                </h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    {post.excerpt}
                                </p>
                                <div className="mt-auto">
                                    <Link
                                        href={post.slug}
                                        className="inline-block text-[#4CAF50] font-bold hover:text-green-700 transition-colors text-base"
                                    >
                                        Read More
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
