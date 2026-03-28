import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, MessageCircle } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-bg">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px bg-white/10 w-16"></div>
            <span className="text-primary font-mono text-sm tracking-widest uppercase">08 / Contact</span>
            <div className="h-px bg-white/10 w-16"></div>
          </div>
          <h2 className="text-6xl md:text-8xl lg:text-[120px] font-display uppercase tracking-tight leading-[0.85] text-white">
            LET'S BUILD <br />
            <span className="text-primary">SOMETHING.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left: Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="p-8 md:p-12 rounded-3xl bg-surface border border-white/5"
          >
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-mono text-text-secondary uppercase tracking-wider">Name</label>
                  <input type="text" id="name" className="w-full bg-bg border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-mono text-text-secondary uppercase tracking-wider">Email</label>
                  <input type="email" id="email" className="w-full bg-bg border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="john@example.com" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="budget" className="text-sm font-mono text-text-secondary uppercase tracking-wider">Budget Range</label>
                  <select id="budget" className="w-full bg-bg border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none">
                    <option value="">Select Budget</option>
                    <option value="<1k">&lt; $1,000</option>
                    <option value="1k-5k">$1,000 - $5,000</option>
                    <option value="5k-10k">$5,000 - $10,000</option>
                    <option value="10k+">$10,000+</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="type" className="text-sm font-mono text-text-secondary uppercase tracking-wider">Project Type</label>
                  <select id="type" className="w-full bg-bg border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none">
                    <option value="">Select Type</option>
                    <option value="web">Web Development</option>
                    <option value="video">Video Editing</option>
                    <option value="motion">Motion Graphics</option>
                    <option value="design">UI/UX Design</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-mono text-text-secondary uppercase tracking-wider">Message</label>
                <textarea id="message" rows={4} className="w-full bg-bg border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none" placeholder="Tell me about your project..."></textarea>
              </div>

              <button type="button" className="w-full py-4 rounded-xl bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-colors active:scale-[0.98]">
                Send Message
              </button>
              
              <p className="text-center text-sm text-text-secondary font-mono">
                I typically respond within 24 hours.
              </p>
            </form>
          </motion.div>

          {/* Right: Direct Links & Calendly */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="flex flex-col gap-12"
          >
            <div className="grid grid-cols-2 gap-4">
              <a href="mailto:hello@example.com" className="group p-6 rounded-2xl bg-surface border border-white/5 flex flex-col items-center justify-center gap-4 hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                  <Mail size={24} />
                </div>
                <span className="font-mono text-sm uppercase tracking-wider text-text-secondary group-hover:text-white transition-colors">Email</span>
              </a>
              <a href="#" className="group p-6 rounded-2xl bg-surface border border-white/5 flex flex-col items-center justify-center gap-4 hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#0A66C2]/20 group-hover:text-[#0A66C2] transition-colors">
                  <Linkedin size={24} />
                </div>
                <span className="font-mono text-sm uppercase tracking-wider text-text-secondary group-hover:text-white transition-colors">LinkedIn</span>
              </a>
              <a href="#" className="group p-6 rounded-2xl bg-surface border border-white/5 flex flex-col items-center justify-center gap-4 hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#25D366]/20 group-hover:text-[#25D366] transition-colors">
                  <MessageCircle size={24} />
                </div>
                <span className="font-mono text-sm uppercase tracking-wider text-text-secondary group-hover:text-white transition-colors">WhatsApp</span>
              </a>
              <a href="#" className="group p-6 rounded-2xl bg-surface border border-white/5 flex flex-col items-center justify-center gap-4 hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/20 group-hover:text-white transition-colors">
                  <Github size={24} />
                </div>
                <span className="font-mono text-sm uppercase tracking-wider text-text-secondary group-hover:text-white transition-colors">GitHub</span>
              </a>
            </div>

            <div className="p-8 rounded-3xl bg-surface border border-white/5 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Or skip the form</h3>
              <p className="text-text-secondary mb-6">Book a 15-min discovery call directly on my calendar.</p>
              <a href="#" className="inline-flex items-center justify-center px-8 py-4 font-bold text-bg bg-white rounded-full hover:bg-gray-200 transition-colors w-full">
                Book a Call
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
