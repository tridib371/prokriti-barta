import React, { useEffect, useRef } from 'react';

/**
 * Interactive Falling Leaves Canvas
 * - Renders the exact Lucide organic leaf icon shape with thick outline, curved stem, and vein.
 * - Slow, peaceful, floating cascade that falls from top to bottom.
 * - Settle gracefully across the floor at the bottom of the page.
 * - Reactive physics: hover/mouse movement gently flings and scatters leaves upward.
 */
export default function FallingLeaves({ count = 26, className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse tracking
    const mouse = {
      x: -1000,
      y: -1000,
      vx: 0,
      vy: 0,
      prevX: -1000,
      prevY: -1000,
    };

    let mouseTimeout;
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const newX = e.clientX - rect.left;
      const newY = e.clientY - rect.top;

      mouse.vx = (newX - (mouse.prevX === -1000 ? newX : mouse.prevX)) * 0.25;
      mouse.vy = (newY - (mouse.prevY === -1000 ? newY : mouse.prevY)) * 0.25;
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      mouse.x = newX;
      mouse.y = newY;

      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        mouse.vx *= 0.5;
        mouse.vy *= 0.5;
      }, 50);
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.vx = 0;
      mouse.vy = 0;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    // Exact Lucide Leaf SVG Vector Paths
    const leafBodyPath = new Path2D(
      'M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z'
    );
    const leafVeinPath = new Path2D(
      'M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12'
    );

    // Palette of rich deep organic colors matching the brand
    const leafVariants = [
      { stroke: '#C86D3B', fill: 'rgba(200, 109, 59, 0.25)', shadow: 'rgba(200, 109, 59, 0.35)' }, // Deep Terracotta
      { stroke: '#B25725', fill: 'rgba(178, 87, 37, 0.28)', shadow: 'rgba(178, 87, 37, 0.4)' },    // Burnt Sienna
      { stroke: '#D97706', fill: 'rgba(217, 119, 6, 0.22)', shadow: 'rgba(217, 119, 6, 0.35)' },   // Warm Amber
      { stroke: '#C05928', fill: 'rgba(192, 89, 40, 0.25)', shadow: 'rgba(192, 89, 40, 0.35)' },   // Rich Rust
      { stroke: '#E89814', fill: 'rgba(232, 152, 20, 0.22)', shadow: 'rgba(232, 152, 20, 0.3)' },  // Golden Autumn
    ];

    // Helper: Draw the exact Lucide Leaf with smooth scaling & 3D flutter
    const drawExactLeaf = (ctx, leaf) => {
      ctx.save();
      ctx.translate(leaf.x, leaf.y);
      ctx.rotate(leaf.angle);

      // Smooth 3D flutter simulation
      const flutterScale = Math.cos(leaf.flutterAngle);
      ctx.scale(1, Math.abs(flutterScale) > 0.15 ? flutterScale : 0.15);

      const s = leaf.size / 24;
      ctx.scale(s, s);
      ctx.translate(-12, -12);

      const variant = leaf.variant;

      // Soft ambient drop shadow
      ctx.shadowColor = variant.shadow;
      ctx.shadowBlur = 6;
      ctx.shadowOffsetY = 3;

      // Leaf translucent fill
      ctx.fillStyle = variant.fill;
      ctx.fill(leafBodyPath);

      // Deep clean leaf outline & vein stroke
      ctx.strokeStyle = variant.stroke;
      ctx.lineWidth = 2.2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.stroke(leafBodyPath);
      ctx.stroke(leafVeinPath);

      ctx.restore();
    };

    // Leaf Particle Class with Gentle, Slow Physics
    class LeafParticle {
      constructor(isInitial = false) {
        this.reset(isInitial);
      }

      reset(isInitial = false) {
        this.size = 28 + Math.random() * 20; // 28px to 48px
        this.variant = leafVariants[Math.floor(Math.random() * leafVariants.length)];
        this.x = Math.random() * width;
        // Stagger spawn heights from above top of screen
        this.y = isInitial ? -Math.random() * (height * 0.9) - 40 : -60 - Math.random() * 80;

        // Ground settling limit at bottom (scattered across bottom 80px)
        this.groundY = height - (18 + Math.random() * Math.min(85, height * 0.16));
        this.isGrounded = false;

        // Slow, serene falling velocity (gentle floating)
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = 0.45 + Math.random() * 0.45; // Slow & peaceful

        // Slow sinusoidal sway
        this.swaySpeed = 0.008 + Math.random() * 0.01;
        this.swayOffset = Math.random() * Math.PI * 2;
        this.swayWidth = 1.0 + Math.random() * 1.5;

        // Slow 3D flutter & rotation
        this.angle = Math.random() * Math.PI * 2;
        this.vAngle = (Math.random() - 0.5) * 0.015;
        this.flutterAngle = Math.random() * Math.PI * 2;
        this.vFlutter = 0.015 + Math.random() * 0.02;

        // Interactive mouse velocity
        this.interactiveVx = 0;
        this.interactiveVy = 0;
      }

      update() {
        // Mouse hover interaction
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influenceRadius = 120;

        if (dist < influenceRadius) {
          const force = (1 - dist / influenceRadius) * 5;
          const angle = Math.atan2(dy, dx);

          // Gently push leaf and lift upward
          this.interactiveVx += Math.cos(angle) * force * 0.8 + (mouse.vx || 0) * 0.2;
          this.interactiveVy += Math.sin(angle) * force * 0.6 - force * 1.1 + (mouse.vy || 0) * 0.2;
          this.vAngle += (Math.random() - 0.5) * 0.08;
          this.vFlutter += 0.06;
          this.isGrounded = false;
        }

        // Apply smooth velocity damping
        this.interactiveVx *= 0.94;
        this.interactiveVy *= 0.94;

        // Falling physics
        if (!this.isGrounded) {
          this.swayOffset += this.swaySpeed;
          const swayX = Math.sin(this.swayOffset) * this.swayWidth;

          this.x += this.vx + swayX + this.interactiveVx;
          this.y += this.vy + this.interactiveVy;

          this.angle += this.vAngle;
          this.flutterAngle += this.vFlutter;

          // Check if landed on ground
          if (this.y >= this.groundY) {
            this.y = this.groundY;
            this.isGrounded = true;
            this.interactiveVx = 0;
            this.interactiveVy = 0;
          }
        } else {
          // If disturbed by cursor, lift off ground
          if (Math.abs(this.interactiveVy) > 0.3 || Math.abs(this.interactiveVx) > 0.3) {
            this.x += this.interactiveVx;
            this.y += this.interactiveVy;
            this.angle += this.vAngle * 1.5;
            this.flutterAngle += this.vFlutter;

            if (this.y > this.groundY) {
              this.y = this.groundY;
            }
          } else {
            // Settle resting softly on bottom ground
            this.y = Math.min(this.y, this.groundY);
          }
        }

        // Screen boundary wrapping
        if (this.x < -40) this.x = width + 30;
        if (this.x > width + 40) this.x = -30;
      }

      draw(ctx) {
        drawExactLeaf(ctx, this);
      }
    }

    // Pool of leaves
    const leaves = Array.from({ length: count }, () => new LeafParticle(true));

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < leaves.length; i++) {
        const leaf = leaves[i];
        leaf.update();
        leaf.draw(ctx);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(mouseTimeout);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none z-10 ${className}`}
      style={{ touchAction: 'none' }}
    />
  );
}
