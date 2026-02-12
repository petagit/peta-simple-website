'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated gradient blob */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 40%)`
        }}
      />

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className={`max-w-5xl mx-auto text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-pulse">
            Welcome to the Future
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            A beautiful, modern landing page built with Next.js and Tailwind CSS
          </p>
          <button className="group relative px-8 py-4 bg-purple-600 hover:bg-purple-700 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50">
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Amazing Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🚀', title: 'Lightning Fast', desc: 'Built with Next.js for optimal performance' },
              { icon: '🎨', title: 'Beautiful Design', desc: 'Stunning visuals with Tailwind CSS' },
              { icon: '✨', title: 'Smooth Animations', desc: 'Delightful interactions throughout' }
            ].map((feature, i) => (
              <div
                key={i}
                className="group p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:bg-white/10"
                style={{ animationDelay: `${i * 200}ms` }}
              >
                <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Element */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="p-12 rounded-3xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-sm border border-white/10">
            <h3 className="text-3xl font-bold mb-4">Made with 🐸 by Frog</h3>
            <p className="text-gray-300">
              Built in seconds, deployed to the world ✨
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center text-gray-400 border-t border-white/10">
        <p>Built with Next.js + Tailwind CSS • Deployed on Vercel</p>
      </footer>
    </main>
  );
}
