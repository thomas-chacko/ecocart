"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BlogPost() {
    const params = useParams();
    const id = params?.id;
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchBlog = async () => {
            try {
                const res = await fetch(`/api/blogs/${id}`);
                const data = await res.json();

                if (data.success) {
                    setBlog(data.data);
                } else {
                    setBlog(null);
                }
            } catch (error) {
                console.error("Failed to fetch blog post", error);
                setBlog(null);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
        );
    }

    if (!blog) {
        return notFound();
    }

    return (
        <article className="min-h-screen bg-white pt-32 pb-20">
            <div className="container mx-auto px-6 max-w-4xl">
                <Link
                    href="/#blog"
                    className="inline-flex items-center text-gray-600 hover:text-green-600 mb-8 transition-colors"
                >
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Blogs
                </Link>

                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    {blog.title}
                </h1>

                <div className="flex items-center text-gray-500 mb-10 text-sm">
                    <span>{new Date(blog.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}</span>
                </div>

                <div className="relative w-full h-[400px] md:h-[500px] rounded-[24px] overflow-hidden mb-12">
                    <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                <div className="prose prose-lg max-w-none prose-green">
                    {blog.content.split('\n').map((paragraph, idx) => (
                        <p key={idx} className="mb-6 text-gray-700 leading-relaxed text-lg">
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>
        </article>
    );
}
