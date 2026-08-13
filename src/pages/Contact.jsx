import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-bg py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold text-accent uppercase tracking-widest">যোগাযোগ</span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-primary">
            আমাদের সাথে যুক্ত হন
          </h1>
          <p className="text-xs text-muted font-bn-sans">
            যেকোনো প্রশ্ন, পণ্যের সন্ধান কিংবা পাইকারি অর্ডারের জন্য বার্তা লিখুন।
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Contact Details */}
          <div className="lg:col-span-5 bg-surface border border-line rounded-3xl p-6 sm:p-8 space-y-6">
            <h2 className="font-display font-bold text-xl text-primary pb-3 border-b border-line">
              হটলাইন ও এড্রেস
            </h2>

            <div className="space-y-4 text-xs font-bn-sans">
              <div className="flex items-start gap-3">
                <div className="p-3 bg-accent/15 text-accent rounded-xl">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-primary text-sm">হটলাইন ও হোয়াটসঅ্যাপ</h4>
                  <p className="text-muted mt-0.5">+880 1712-345678 (সকাল ৯টা - রাত ১০টা)</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-3 bg-accent/15 text-accent rounded-xl">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-primary text-sm">ইমেইল সাপোর্টিং</h4>
                  <p className="text-muted mt-0.5">support@prokritibarta.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-3 bg-accent/15 text-accent rounded-xl">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-primary text-sm">প্রধান কার্যালয়</h4>
                  <p className="text-muted mt-0.5">হাউস ৪২, রোড ১১, ব্লক ডি, বনানী, ঢাকা-১২১৩</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-surface border border-line rounded-3xl p-6 sm:p-8">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 bg-accent/20 text-accent rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 size={36} />
                </div>
                <h3 className="font-display font-bold text-xl text-primary">আপনার বার্তাটি গ্রহণ করা হয়েছে</h3>
                <p className="text-xs text-muted max-w-sm mx-auto font-bn-sans">
                  আমাদের প্রতিনিধি অতি শীঘ্রই আপনার প্রদানকৃত মোবাইল নম্বরে যোগাযোগ করবেন।
                </p>
                <Button variant="secondary" onClick={() => setSubmitted(false)}>নতুন বার্তা লিখুন</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <h2 className="font-display font-bold text-xl text-primary pb-3 border-b border-line">
                  বার্তা পাঠান
                </h2>

                <div>
                  <label className="block font-bold text-ink mb-1">আপনার নাম *</label>
                  <input
                    type="text"
                    required
                    placeholder="আপনার নাম"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-bg text-ink px-4 py-2.5 rounded-xl border border-line focus:border-accent outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-ink mb-1">ফোন নম্বর *</label>
                  <input
                    type="tel"
                    required
                    placeholder="01700-000000"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-bg text-ink px-4 py-2.5 rounded-xl border border-line focus:border-accent outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-ink mb-1">আপনার বক্তব্য বা প্রশ্ন *</label>
                  <textarea
                    required
                    rows="4"
                    placeholder="আপনার বার্তাটি লিখুন..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-bg text-ink px-4 py-2.5 rounded-xl border border-line focus:border-accent outline-none"
                  />
                </div>

                <Button type="submit" variant="accent" size="lg" className="w-full gap-2">
                  পাঠিয়ে দিন <Send size={16} />
                </Button>
              </form>
            )}
          </div>

        </div>
      </div>
    </motion.div>
  );
}
