"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Send, MapPin, Phone, Mail } from "lucide-react";
import Image from "next/image";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setStatus({ loading: false, success: true, error: null });
        setFormData({ name: "", email: "", message: "" });
        alert("Thank you for your message! We'll get back to you soon.");
      } else {
        throw new Error(data.error || 'Something went wrong');
      }
    } catch (error) {
      setStatus({ loading: false, success: false, error: error.message });
      alert("Failed to send message: " + error.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24 bg-white"
    >
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900">
            Get in Touch
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-serif text-gray-900 mb-8">
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 focus:outline-none focus:border-green-500 transition-colors placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john.doe@example.com"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 focus:outline-none focus:border-green-500 transition-colors placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2 text-sm">
                  Your Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  required
                  rows="5"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 focus:outline-none focus:border-green-500 transition-colors resize-none placeholder:text-gray-400"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="px-8 py-3 bg-[#4CAF50] text-white rounded-lg font-bold hover:bg-green-600 transition-colors"
                disabled={status.loading}
              >
                {status.loading ? 'Sending...' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>

          {/* Location / Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-serif text-gray-900 mb-8">
              Our Location
            </h3>

            <div className="bg-[#F1F8E9] rounded-[24px] overflow-hidden mb-8 h-64 relative border border-green-100">
              {/* Decorative Map Element */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src="https://res.cloudinary.com/dvm1ouojr/image/upload/v1764846220/ecocart/jrgsdnzxftccz58a35an.jpg" // Using an existing image as a placeholder for the map illustration to ensure no broken links. Ideally this would be the specific vector map.
                  alt="Map Location"
                  fill
                  className="object-cover opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-red-500 text-white p-2 rounded-full shadow-lg transform -translate-y-4">
                    <MapPin size={24} fill="currentColor" />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="text-[#4CAF50]" size={20} />
                <span>info@ecocart.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Phone className="text-[#4CAF50]" size={20} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin className="text-[#4CAF50]" size={20} />
                <span>123 Green Earth Ave, EcoCity, EC 98765</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
