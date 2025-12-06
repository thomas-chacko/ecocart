'use client';

import { useEffect, useState } from 'react';
import AdminProtected from '@/components/AdminProtected';
import Link from 'next/link';
import { ShoppingBag, FileText, Activity, MessageSquare } from 'lucide-react';

function DashboardContent() {
  const [adminEmail, setAdminEmail] = useState('');
  const [productsCount, setProductsCount] = useState(0);
  const [blogsCount, setBlogsCount] = useState(0);
  const [messagesCount, setMessagesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = localStorage.getItem('adminEmail');
    setAdminEmail(email || 'Admin');
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [productsRes, blogsRes, messagesRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/blogs'),
        fetch('/api/messages')
      ]);

      // Handle potential failures gracefully
      const productsData = await productsRes.json().catch(() => ({ success: false }));
      const blogsData = await blogsRes.json().catch(() => ({ success: false }));
      const messagesData = await messagesRes.json().catch(() => ({ success: false }));

      if (productsData.success) setProductsCount(productsData.products?.length || 0);
      if (blogsData.success) setBlogsCount(blogsData.data?.length || 0);
      if (messagesData.success) setMessagesCount(messagesData.data?.length || 0);
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Welcome back, <span className="font-medium text-gray-900 dark:text-white block sm:inline">{adminEmail}</span>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/admin/products" className="block transform transition hover:scale-105">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border-l-4 border-blue-500 h-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                  Total Products
                </h3>
                <ShoppingBag className="h-6 w-6 text-blue-500" />
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {productsCount}
              </p>
            </div>
          </Link>

          <Link href="/admin/blogs" className="block transform transition hover:scale-105">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border-l-4 border-green-500 h-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                  Total Blog Posts
                </h3>
                <FileText className="h-6 w-6 text-green-500" />
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {blogsCount}
              </p>
            </div>
          </Link>

          <Link href="/admin/messages" className="block transform transition hover:scale-105">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border-l-4 border-yellow-500 h-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                  Total Messages
                </h3>
                <MessageSquare className="h-6 w-6 text-yellow-500" />
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {messagesCount}
              </p>
            </div>
          </Link>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border-l-4 border-purple-500 h-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                System Status
              </h3>
              <Activity className="h-6 w-6 text-purple-500" />
            </div>
            <p className="text-3xl font-bold text-green-600">Active</p>
            <p className="text-xs text-gray-500 mt-2">All systems operational</p>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-4">
          <Link href="/admin/products" className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition">Manage Products</Link>
          <Link href="/admin/blogs" className="px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition">Manage Blogs</Link>
          <Link href="/admin/messages" className="px-4 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition">View Messages</Link>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <AdminProtected>
      <DashboardContent />
    </AdminProtected>
  );
}
