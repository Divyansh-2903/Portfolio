import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';

export default function Channel() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const videos = [
    {
      id: 'video1',
      title: 'Building a SaaS from Scratch',
      thumbnail: 'https://picsum.photos/seed/video1/1280/720?blur=1',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
    },
    {
      id: 'video2',
      title: 'My Video Editing Workflow',
      thumbnail: 'https://picsum.photos/seed/video2/1280/720?blur=1',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
    },
    {
      id: 'video3',
      title: 'How I learned React in 30 Days',
      thumbnail: 'https://picsum.photos/seed/video3/1280/720?blur=1',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-surface/30">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px bg-white/10 w-16"></div>
            <span className="text-primary font-mono text-sm tracking-widest uppercase">05 / Content</span>
            <div className="h-px bg-white/10 w-16"></div>
          </div>
          <h2 className="text-5xl md:text-7xl font-display uppercase tracking-tight">
            I DOCUMENT THE BUILD
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className="group relative aspect-video rounded-3xl overflow-hidden cursor-pointer border border-white/5 glow-hover"
              onClick={() => setActiveVideo(video.url)}
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-primary/90 backdrop-blur-md flex items-center justify-center text-white scale-90 opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-300">
                  <Play size={24} className="ml-1" fill="currentColor" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                  {video.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-12"
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-primary transition-colors z-[101]"
            >
              <X size={24} />
            </button>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            >
              <iframe
                src={activeVideo}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
