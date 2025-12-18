"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { MapPin, Phone, Mail, CheckCircle, X } from "lucide-react";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState({ loading: false, success: false, error: null });
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

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
        setFormData({ name: "", number: "", email: "", message: "" });
        setShowSuccessPopup(true);
        // Auto hide popup after 3 seconds
        setTimeout(() => setShowSuccessPopup(false), 3000);
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
                  Your Number
                </label>
                <input
                  type="tel"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  placeholder="+91 0000000000"
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
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62959.09392957503!2d76.36321907230699!3d9.513649835369511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b0883123eae70ff%3A0xb298e7e964f3afbf!2sKainakary%2C%20Kerala!5e0!3m2!1sen!2sin!4v1765025565584!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <Mail className="text-[#4CAF50]" size={20} />
                <span>ecocartinfoindia@gmail.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <Phone className="text-[#4CAF50]" size={20} />
                <span>+91 9495664557</span>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <MapPin className="text-[#4CAF50]" size={20} />
                <span>Kainakary,Alappuzha</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="bg-white rounded-lg p-8 max-w-md mx-4 relative">
            <button
              onClick={() => setShowSuccessPopup(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
            <div className="text-center">
              <CheckCircle className="mx-auto text-green-500 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Message Sent Successfully!
              </h3>
              <p className="text-gray-600">
                Thank you for your message! We'll get back to you soon.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
