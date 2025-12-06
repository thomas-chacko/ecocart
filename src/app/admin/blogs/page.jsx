"use client";

import { useState, useEffect } from "react";
import AdminProtected from "@/components/AdminProtected";
import { Plus, Pencil, Trash2, FileText } from "lucide-react";

function BlogModal({ blog, onClose, onSuccess }) {
    const [formData, setFormData] = useState({
        title: blog?.title || '',
        excerpt: blog?.excerpt || '',
        content: blog?.content || '',
        image: blog?.image || '',
    });
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
            const res = await fetch('/api/upload', { method: 'POST', body: formData });
            const data = await res.json();
            if (data.success) setFormData((prev) => ({ ...prev, image: data.url }));
            else alert('Failed to upload image');
        } catch (error) {
            alert('Error uploading image');
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            const url = blog ? `/api/blogs/${blog._id}` : '/api/blogs';
            const method = blog ? 'PUT' : 'POST';
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success) onSuccess();
            else alert(data.message || 'Failed to save blog');
        } catch (error) {
            alert('Error saving blog');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {blog ? 'Edit Blog Post' : 'Add New Blog Post'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                        <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Excerpt</label>
                        <textarea value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} required rows={2} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content</label>
                        <textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} required rows={8} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Feature Image</label>
                        <input type="file" accept="image/*" onChange={handleImageChange} className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
                        {uploading && <p className="text-sm text-blue-600 mt-1">Uploading...</p>}
                        {formData.image && <img src={formData.image} alt="Preview" className="w-full h-48 object-cover rounded-lg border border-gray-300 mt-2" />}
                    </div>
                    <div className="flex gap-3 pt-4">
                        <button type="button" onClick={onClose} className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">Cancel</button>
                        <button type="submit" disabled={loading} className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg">{loading ? 'Saving...' : 'Save'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function BlogsContent() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);

    useEffect(() => {
        loadBlogs();
    }, []);

    const loadBlogs = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/blogs');
            const data = await res.json();
            if (data.success) {
                setBlogs(data.data || []);
            }
        } catch (error) {
            console.error('Failed to load blogs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this blog post?')) return;

        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(`/api/blogs/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` },
            });

            const data = await res.json();
            if (data.success) loadBlogs();
            else alert('Failed to delete blog');
        } catch (error) {
            alert('Error deleting blog');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow gap-4">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Blogs</h1>
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
                >
                    <Plus className="h-5 w-5 mr-2" />
                    Add Post
                </button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
                        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading blogs...</p>
                    </div>
                ) : blogs.length === 0 ? (
                    <div className="text-center py-12">
                        <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-gray-600 dark:text-gray-400">No blog posts found</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-900/50">
                                <tr className="border-b border-gray-200 dark:border-gray-700">
                                    <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300 font-medium">Post Title</th>
                                    <th className="text-left py-3 px-4 text-gray-700 dark:text-gray-300 font-medium">Date</th>
                                    <th className="text-right py-3 px-4 text-gray-700 dark:text-gray-300 font-medium">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {blogs.map((blog) => (
                                    <tr key={blog._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                                        <td className="py-4 px-4">
                                            <div className="flex items-center gap-3">
                                                <img src={blog.image || '/placeholder.png'} alt={blog.title} className="w-12 h-12 rounded-lg object-cover border border-gray-200 dark:border-gray-700" />
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white">{blog.title}</p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1 max-w-xs">{blog.excerpt}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-4 text-gray-700 dark:text-gray-300">
                                            {new Date(blog.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="py-4 px-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => {
                                                        setEditingBlog(blog);
                                                        setShowModal(true);
                                                    }}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(blog._id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {(showModal || editingBlog) && (
                <BlogModal
                    blog={editingBlog}
                    onClose={() => {
                        setShowModal(false);
                        setEditingBlog(null);
                    }}
                    onSuccess={() => {
                        setShowModal(false);
                        setEditingBlog(null);
                        loadBlogs();
                    }}
                />
            )}
        </div>
    );
}

export default function BlogsPage() {
    return (
        <AdminProtected>
            <BlogsContent />
        </AdminProtected>
    );
}
