"use client";

import { useState } from "react";

import { motion } from "framer-motion";
import { Instagram, Linkedin, Send, ExternalLink } from "lucide-react";

export default function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSubmitting(true);
        setIsError(false);

        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch("https://formspree.io/f/mlgwjnvk", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                setIsSuccess(true);
            } else {
                setIsError(true);
            }
        } catch (error) {
            setIsError(true);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <section id="contact" className="py-24 bg-black border-t border-white/5">
            <div className="container px-6 mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                    <div>
                        <h2 className="text-[#863ecc] uppercase tracking-[0.3em] text-sm font-semibold mb-6">
                            Get in Touch
                        </h2>
                        <h3 className="text-4xl md:text-5xl font-bold mb-8">
                            Let&apos;s create something <span className="text-[#863ecc]">unforgettable</span>.
                        </h3>
                        <p className="text-gray-400 text-lg mb-12 max-w-md">
                            Available for freelance opportunities and creative collaborations worldwide.
                        </p>

                        <div className="space-y-6">
                            <a href="mailto:hello@tonicamacho.pro" className="group flex items-center gap-4 text-xl font-medium text-white hover:text-[#863ecc] transition-colors">
                                info@tonicamacho.pro
                                <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                            <div className="flex gap-6 pt-6">
                                <a target="_blank" href="https://www.instagram.com/tonicamacho.pro" className="p-3 border border-white/10 rounded-full hover:bg-brand-violet hover:text-white transition-all text-gray-400">
                                    <Instagram size={20} />
                                </a>
                                <a target="_blank" href="https://www.linkedin.com/in/toni-camacho/" className="p-3 border border-white/10 rounded-full hover:bg-brand-violet hover:text-white transition-all text-gray-400">
                                    <Linkedin size={20} />
                                </a>
                                <a href="mailto:info@tonicamacho.pro" className="p-3 border border-white/10 rounded-full hover:bg-brand-violet hover:text-white transition-all text-gray-400">
                                    <Send size={20} />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="bg-surface p-8 md:p-12 border border-white/5 relative">
                        {isSuccess ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center h-full text-center space-y-4 py-12"
                            >
                                <div className="p-4 bg-[#863ecc]/10 rounded-full mb-2">
                                    <Send size={32} className="text-[#863ecc]" />
                                </div>
                                <h4 className="text-2xl font-bold text-white">Message Sent!</h4>
                                <p className="text-[#863ecc] text-lg font-medium">Message received! I&apos;ll get back to you soon.</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-500">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        className="w-full bg-transparent border-b border-white/10 py-4 focus:border-brand-violet outline-none transition-colors"
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-500">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        className="w-full bg-transparent border-b border-white/10 py-4 focus:border-brand-violet outline-none transition-colors"
                                        placeholder="your@email.com"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] uppercase tracking-widest text-gray-500">Message</label>
                                    <textarea
                                        name="message"
                                        required
                                        rows={4}
                                        className="w-full bg-transparent border-b border-white/10 py-4 focus:border-brand-violet outline-none transition-colors resize-none"
                                        placeholder="Tell me about your project"
                                    />
                                </div>

                                {isError && (
                                    <p className="text-red-500 text-sm mt-2">Oops! There was a problem. Please try again.</p>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-brand-violet text-white font-bold uppercase tracking-widest py-5 hover:bg-white hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? "Sending..." : "Send Message"}
                                </button>
                            </form>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
}
