import React, { useEffect, useRef } from 'react';

/**
 * Interactive Falling Leaves Canvas
 * - Renders the exact Lucide organic leaf icon shape with thick orange outline.
 * - Realistic aerodynamic leaf physics: leaves rock gently back and forth (no fast spinning/flipping).
 * - Leaves glide slowly down like real leaves falling from an autumn tree.
 * - Settle gracefully across the bottom floor and react smoothly when hovered with mouse.
 */
export default function FallingLeaves({ count = 32, className = '' }) {
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

      mouse.vx = (newX - (mouse.prevX === -1000 ? newX : mouse.prevX)) * 0.2;
      mouse.vy = (newY - (mouse.prevY === -1000 ? newY : mouse.prevY)) * 0.2;
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

    // Helper: Draw the exact Lucide Leaf with smooth natural tilt & wobble
    const drawExactLeaf = (ctx, leaf) => {
      ctx.save();
      ctx.translate(leaf.x, leaf.y);
      ctx.rotate(leaf.angle);

      // Gentle natural 3D wobble (softly breathing between 0.75 and 1.0)
      ctx.scale(1, leaf.flutterScale);

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

    // Leaf Particle Class with Realistic Aerodynamic Physics
    class LeafParticle {
      constructor(isInitial = false) {
        this.reset(isInitial);
      }

      reset(isInitial = false) {
        this.size = 28 + Math.random() * 18; // 28px to 46px
        this.variant = leafVariants[Math.floor(Math.random() * leafVariants.length)];
        this.x = Math.random() * width;

        // Ground settling limit at bottom (scattered across bottom 80px)
        this.groundY = height - (16 + Math.random() * Math.min(80, height * 0.15));

        // On initial page load: distribute instantly across the entire screen
        if (isInitial) {
          this.y = Math.random() * (height - 20);
          this.isGrounded = this.y >= this.groundY - 8;
          if (this.isGrounded) {
            this.y = this.groundY;
          }
        } else {
          this.y = -35 - Math.random() * 60;
          this.isGrounded = false;
        }

        // Slow, serene falling velocity (gentle floating)
        this.vx = 0;
        this.vy = 0.32 + Math.random() * 0.32; // Very slow and floaty

        // Natural pendulum sway
        this.swaySpeed = 0.007 + Math.random() * 0.006;
        this.swayOffset = Math.random() * Math.PI * 2;
        this.swayWidth = 0.9 + Math.random() * 1.3;

        // Natural tilt angles (coupled to sway so leaf gently rocks back and forth)
        this.baseAngle = (Math.random() - 0.5) * 0.35; // Slight natural resting tilt
        this.angle = this.baseAngle;
        this.disturbedAngle = 0;

        // Gentle face wobble
        this.flutterPhase = Math.random() * Math.PI * 2;
        this.flutterScale = 1;

        // Interactive mouse velocity
        this.interactiveVx = 0;
        this.interactiveVy = 0;
      }

      update() {
        // Mouse hover interaction
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influenceRadius = 110;

        if (dist < influenceRadius) {
          const force = (1 - dist / influenceRadius) * 4;
          const angle = Math.atan2(dy, dx);

          // Gently push leaf and lift upward
          this.interactiveVx += Math.cos(angle) * force * 0.6 + (mouse.vx || 0) * 0.15;
          this.interactiveVy += Math.sin(angle) * force * 0.5 - force * 0.9 + (mouse.vy || 0) * 0.15;
          this.disturbedAngle += (Math.random() - 0.5) * 0.08;
          this.isGrounded = false;
        }

        // Apply smooth velocity damping
        this.interactiveVx *= 0.95;
        this.interactiveVy *= 0.95;
        this.disturbedAngle *= 0.96;

        // Falling physics
        if (!this.isGrounded) {
          this.swayOffset += this.swaySpeed;
          const swayX = Math.sin(this.swayOffset) * this.swayWidth;

          this.x += this.vx + swayX + this.interactiveVx;
          this.y += this.vy + this.interactiveVy;

          // Natural tilt rocking: tilts left when swaying left, tilts right when swaying right
          const tiltRocking = Math.cos(this.swayOffset) * 0.32;
          this.angle = this.baseAngle + tiltRocking + this.disturbedAngle;

          // Soft 3D wobble
          this.flutterScale = 0.82 + 0.18 * Math.cos(this.swayOffset * 0.9 + this.flutterPhase);

          // Check if landed on ground
          if (this.y >= this.groundY) {
            this.y = this.groundY;
            this.isGrounded = true;
            this.interactiveVx = 0;
            this.interactiveVy = 0;
          }
        } else {
          // If disturbed by cursor, lift off ground gently
          if (Math.abs(this.interactiveVy) > 0.25 || Math.abs(this.interactiveVx) > 0.25) {
            this.x += this.interactiveVx;
            this.y += this.interactiveVy;
            this.angle = this.baseAngle + this.disturbedAngle;

            if (this.y > this.groundY) {
              this.y = this.groundY;
            }
          } else {
            // Settle resting softly on bottom ground with slight resting angle
            this.y = Math.min(this.y, this.groundY);
            this.angle = this.baseAngle + this.disturbedAngle;
            this.flutterScale = 0.95;
          }
        }

        // Screen boundary wrapping
        if (this.x < -35) this.x = width + 25;
        if (this.x > width + 35) this.x = -25;
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
