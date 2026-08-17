import React, { useEffect, useRef } from 'react';

/**
 * Interactive Falling Leaves Canvas
 * - Leaves fall from the top with realistic 3D fluttering, swirling, and swaying.
 * - Settle naturally across the bottom floor.
 * - React dynamically to mouse cursor proximity (flung, floating upward, scattering).
 */
export default function FallingLeaves({ count = 28, className = '' }) {
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
      isMoving: false,
    };

    let mouseTimeout;
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const newX = e.clientX - rect.left;
      const newY = e.clientY - rect.top;

      mouse.vx = (newX - (mouse.prevX === -1000 ? newX : mouse.prevX)) * 0.4;
      mouse.vy = (newY - (mouse.prevY === -1000 ? newY : mouse.prevY)) * 0.4;
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      mouse.x = newX;
      mouse.y = newY;
      mouse.isMoving = true;

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

    // Leaf Color Palette (Deep terracotta, amber golds, autumn rusts)
    const leafColors = [
      { primary: '#C86D3B', shadow: '#984318', vein: '#ECA472' }, // Rich Deep Terracotta
      { primary: '#E89814', shadow: '#B57106', vein: '#F9D178' }, // Golden Amber
      { primary: '#B85D26', shadow: '#7A350E', vein: '#E29768' }, // Burnt Sienna
      { primary: '#D47A2A', shadow: '#964B11', vein: '#F4B070' }, // Autumn Rust
      { primary: '#3B6844', shadow: '#224429', vein: '#7BB387' }, // Deep Forest Olive
      { primary: '#C05928', shadow: '#833410', vein: '#F09B74' }, // Deep Warm Spice
    ];

    // Helper: Draw organic curved leaf shape with central vein and stem
    const drawLeaf = (ctx, leaf) => {
      ctx.save();
      ctx.translate(leaf.x, leaf.y);
      ctx.rotate(leaf.angle);
      // 3D flutter simulated by scaling on Y axis
      ctx.scale(1, Math.cos(leaf.flutterAngle));

      const s = leaf.size;
      const color = leaf.color;

      // Leaf body gradient
      const grad = ctx.createLinearGradient(-s * 0.5, 0, s * 0.5, 0);
      grad.addColorStop(0, color.primary);
      grad.addColorStop(1, color.shadow);

      ctx.beginPath();
      ctx.moveTo(0, -s * 0.85); // Tip
      // Right curve
      ctx.bezierCurveTo(s * 0.55, -s * 0.35, s * 0.5, s * 0.45, 0, s * 0.75);
      // Left curve
      ctx.bezierCurveTo(-s * 0.5, s * 0.45, -s * 0.55, -s * 0.35, 0, -s * 0.85);
      ctx.closePath();

      ctx.fillStyle = grad;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
      ctx.shadowBlur = 6;
      ctx.shadowOffsetY = 3;
      ctx.fill();

      // Vein highlight
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.75);
      ctx.lineTo(0, s * 0.65);
      ctx.strokeStyle = color.vein;
      ctx.lineWidth = Math.max(1, s * 0.05);
      ctx.globalAlpha = 0.6;
      ctx.stroke();

      // Tiny side veins
      ctx.beginPath();
      ctx.moveTo(0, -s * 0.3);
      ctx.lineTo(s * 0.22, -s * 0.42);
      ctx.moveTo(0, -s * 0.3);
      ctx.lineTo(-s * 0.22, -s * 0.42);
      ctx.moveTo(0, 0);
      ctx.lineTo(s * 0.26, -s * 0.12);
      ctx.moveTo(0, 0);
      ctx.lineTo(-s * 0.26, -s * 0.12);
      ctx.moveTo(0, s * 0.3);
      ctx.lineTo(s * 0.2, s * 0.2);
      ctx.moveTo(0, s * 0.3);
      ctx.lineTo(-s * 0.2, s * 0.2);
      ctx.stroke();

      ctx.restore();
    };

    // Initialize Leaves
    class LeafParticle {
      constructor(isInitial = false) {
        this.reset(isInitial);
      }

      reset(isInitial = false) {
        this.size = 22 + Math.random() * 22; // 22px to 44px
        this.color = leafColors[Math.floor(Math.random() * leafColors.length)];
        this.x = Math.random() * width;
        // Stagger spawn heights so leaves fall continuously from above top of screen
        this.y = isInitial ? -Math.random() * (height * 0.8) - 50 : -60 - Math.random() * 100;

        // Ground settling limit at bottom (scattered across bottom 80px of screen)
        this.groundY = height - (15 + Math.random() * Math.min(80, height * 0.15));
        this.isGrounded = false;

        // Velocities
        this.vx = (Math.random() - 0.5) * 1.2;
        this.vy = 1.8 + Math.random() * 1.6;
        this.gravity = 0.03;
        this.swaySpeed = 0.018 + Math.random() * 0.025;
        this.swayOffset = Math.random() * Math.PI * 2;
        this.swayWidth = 1.4 + Math.random() * 2.2;

        // Rotations
        this.angle = Math.random() * Math.PI * 2;
        this.vAngle = (Math.random() - 0.5) * 0.035;
        this.flutterAngle = Math.random() * Math.PI * 2;
        this.vFlutter = 0.035 + Math.random() * 0.055;

        // Interaction velocity
        this.interactiveVx = 0;
        this.interactiveVy = 0;
      }

      update() {
        // Mouse physics interaction
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influenceRadius = 130;

        if (dist < influenceRadius) {
          const force = (1 - dist / influenceRadius) * 9;
          const angle = Math.atan2(dy, dx);

          // Push leaf away from mouse and lift upward
          this.interactiveVx += Math.cos(angle) * force * 1.3 + (mouse.vx || 0) * 0.35;
          this.interactiveVy += Math.sin(angle) * force * 0.9 - force * 1.6 + (mouse.vy || 0) * 0.35;
          this.vAngle += (Math.random() - 0.5) * 0.18;
          this.vFlutter += 0.12;
          this.isGrounded = false;
        }

        // Apply interactive velocity damping
        this.interactiveVx *= 0.92;
        this.interactiveVy *= 0.92;

        // Falling physics
        if (!this.isGrounded) {
          this.swayOffset += this.swaySpeed;
          const swayX = Math.sin(this.swayOffset) * this.swayWidth;

          this.x += this.vx + swayX + this.interactiveVx;
          this.y += this.vy + this.interactiveVy;

          this.angle += this.vAngle;
          this.flutterAngle += this.vFlutter;

          // Check if reached bottom ground
          if (this.y >= this.groundY) {
            this.y = this.groundY;
            this.isGrounded = true;
            this.interactiveVx = 0;
            this.interactiveVy = 0;
            this.vx = 0;
            this.vy = 0;
          }
        } else {
          // If disturbed by mouse, lift off ground
          if (Math.abs(this.interactiveVy) > 0.5 || Math.abs(this.interactiveVx) > 0.5) {
            this.x += this.interactiveVx;
            this.y += this.interactiveVy;
            this.angle += this.vAngle * 2;
            this.flutterAngle += this.vFlutter;

            if (this.y > this.groundY) {
              this.y = this.groundY;
            }
          } else {
            // Settle resting softly on ground
            this.y = Math.min(this.y, this.groundY);
          }
        }

        // Keep inside screen bounds horizontally
        if (this.x < -40) this.x = width + 30;
        if (this.x > width + 40) this.x = -30;
      }

      draw(ctx) {
        drawLeaf(ctx, this);
      }
    }

    // Create pool of leaves
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
