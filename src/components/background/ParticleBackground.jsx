import React, { useEffect, useRef } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { usePortfolioData } from '../../context/PortfolioDataContext';

export const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const { settings } = usePortfolioData();

  const isEnabled = settings?.particleEnabled !== false;

  useEffect(() => {
    if (!isEnabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Adapt particle count based on screen size for performance
    const isMobile = width < 768;
    const particleCount = isMobile ? 30 : Math.min(75, Math.floor(width / 22));

    const particles = [];
    const mouse = { x: null, y: null, radius: isMobile ? 80 : 130 };

    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = Math.random() * 1.5 + 0.8;
      }

      draw() {
        const isDark = theme === 'dark';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? 'rgba(89, 195, 255, 0.36)' : 'rgba(22, 125, 232, 0.22)';
        ctx.fill();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;

        // Mouse proximity reaction
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            this.x -= Math.cos(angle) * force * 1.2;
            this.y -= Math.sin(angle) * force * 1.2;
          }
        }

        this.draw();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const connect = () => {
      const isDark = theme === 'dark';
      const maxDistance = isMobile ? 85 : 120;

      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const opacity = (1 - dist / maxDistance) * (isDark ? 0.12 : 0.08);
            ctx.strokeStyle = isDark ? `rgba(103, 232, 249, ${opacity * 1.45})` : `rgba(46, 159, 255, ${opacity * 1.35})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
      }
      connect();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleClick = (e) => {
      // Gentle burst on click
      for (let i = 0; i < 3; i++) {
        if (particles.length < (isMobile ? 40 : 90)) {
          const p = new Particle();
          p.x = e.clientX + (Math.random() - 0.5) * 20;
          p.y = e.clientY + (Math.random() - 0.5) * 20;
          p.vx = (Math.random() - 0.5) * 1.5;
          p.vy = (Math.random() - 0.5) * 1.5;
          particles.push(p);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('click', handleClick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('click', handleClick);
    };
  }, [theme, isEnabled]);

  if (!isEnabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
};
