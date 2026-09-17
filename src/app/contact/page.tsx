import React from "react";
import { ContactForm } from "@/components/home/ContactForm";
import { MapPin, Phone, Mail, MessageSquare } from "lucide-react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata = {
  title: "Contact Us | RyxerMart Web Development",
  description:
    "Get in touch with RyxerMart for website design, e-commerce stores, and digital solutions. Reach us by phone, email, or WhatsApp.",
};

export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-12">
      <ScrollReveal animation="fade-down">
        <div className="max-w-3xl">
          <span className="text-xs font-extrabold uppercase tracking-widest text-brand-violet dark:text-purple-400">
            Get in Touch
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-brand-navy dark:text-white tracking-tight mt-1">
            Contact RyxerMart
          </h1>
          <p className="text-base text-slate-600 dark:text-slate-300 mt-2">
            Have questions about our website packages, customized requirements, or enterprise development? We are here to help.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Info Cards */}
        <div className="lg:col-span-5 space-y-4">
          <ScrollReveal animation="fade-up" delay={100}>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-subtle flex items-start gap-4 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-brand-violet-light dark:bg-slate-800 text-brand-violet dark:text-purple-300 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-brand-navy dark:text-white">Head Office</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-0.5">
                  Jalandhar, Punjab, India
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={200}>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-subtle flex items-start gap-4 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-brand-violet-light dark:bg-slate-800 text-brand-violet dark:text-purple-300 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-brand-navy dark:text-white">Phone Support</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-0.5">
                  +91 98765 43210
                </p>
                <span className="text-[11px] text-slate-400 dark:text-slate-500">Mon - Sat: 9:30 AM to 7:00 PM IST</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={300}>
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-subtle flex items-start gap-4 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-brand-violet-light dark:bg-slate-800 text-brand-violet dark:text-purple-300 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-brand-navy dark:text-white">Email Desk</h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-0.5">
                  <a href="mailto:ryxereverlynx@gmail.com" className="hover:text-brand-violet dark:hover:text-purple-400 transition-colors">
                    ryxereverlynx@gmail.com
                  </a>
                </p>
                <span className="text-[11px] text-slate-400 dark:text-slate-500">Typically replies within 4 business hours</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={400}>
            <div className="bg-emerald-50 dark:bg-emerald-950/30 p-6 rounded-2xl border border-emerald-200 dark:border-emerald-900/50 flex items-start gap-4 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center flex-shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-emerald-900 dark:text-emerald-200">Direct WhatsApp Desk</h3>
                <p className="text-xs text-emerald-700 dark:text-emerald-300 mt-0.5">
                  Fastest way to get project advice and quick turnaround estimates.
                </p>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 active:scale-98"
                >
                  Chat on WhatsApp Now
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <ScrollReveal animation="fade-up" delay={200}>
            <ContactForm />
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
