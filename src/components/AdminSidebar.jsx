"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, ShoppingBag, FileText, MessageSquare, LogOut } from "lucide-react";

export default function AdminSidebar({ isOpen, onClose }) {
    const pathname = usePathname();
    const router = useRouter();

    const menuItems = [
        { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
        { name: "Products", href: "/admin/products", icon: ShoppingBag },
        { name: "Blogs", href: "/admin/blogs", icon: FileText },
        { name: "Messages", href: "/admin/messages", icon: MessageSquare },
    ];

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminEmail");
        router.push("/admin/login");
    };

    return (
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="flex flex-col h-full">
                {/* Logo */}
                <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700 bg-green-50 dark:bg-gray-900">
                    <Link href="/admin/dashboard" className="text-2xl font-serif font-bold text-green-600" onClick={onClose}>
                        EcoCart Admin
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto py-6 space-y-1 px-4">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={onClose}
                                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive
                                        ? "bg-green-50 text-green-700 dark:bg-gray-700 dark:text-green-400"
                                        : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700"
                                    }`}
                            >
                                <Icon className={`mr-3 h-5 w-5 ${isActive ? "text-green-600" : "text-gray-400 group-hover:text-gray-500"}`} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* User / Logout */}
                <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-gray-50 dark:bg-gray-900">
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                    >
                        <LogOut className="mr-3 h-5 w-5" />
                        Logout
                    </button>
                </div>
            </div>
        </aside>
    );
}
