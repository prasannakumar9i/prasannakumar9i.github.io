import { useEffect, useRef } from "react";

interface Node3D {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  radius: number;
  color: string;
}

export default function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const nodes: Node3D[] = [];
    const numNodes = Math.min(80, Math.floor((width * height) / 15000) + 30);
    const connectionDistance = 140;

    // Generate random colors (cyan, blue, purple gradient)
    const getRandomColor = () => {
      const r = Math.random();
      if (r < 0.4) return "rgba(0, 240, 255, "; // neon-blue
      if (r < 0.8) return "rgba(189, 0, 255, "; // neon-purple
      return "rgba(0, 255, 216, "; // neon-cyan
    };

    // Initialize 3D nodes
    for (let i = 0; i < numNodes; i++) {
      nodes.push({
        x: (Math.random() - 0.5) * 600,
        y: (Math.random() - 0.5) * 600,
        z: (Math.random() - 0.5) * 600,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        vz: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 2 + 1.5,
        color: getRandomColor(),
      });
    }

    // Capture mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      mouseRef.current.targetX = (x / rect.width) * 0.8; // max rotation angle
      mouseRef.current.targetY = (y / rect.height) * 0.8;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    // Initial rotation angles
    let angleX = 0;
    let angleY = 0;

    const fov = 400; // perspective depth parameter

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse easing
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Rotate scene slowly over time plus mouse position
      angleY = mouseRef.current.x + Date.now() * 0.0001;
      angleX = mouseRef.current.y + Date.now() * 0.00005;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      // Projects 3D node to 2D screen
      const projectedNodes = nodes.map((node) => {
        // Update 3D position
        node.x += node.vx;
        node.y += node.vy;
        node.z += node.vz;

        // Boundaries check (keep them in a sphere or cube volume)
        const limit = 300;
        if (Math.abs(node.x) > limit) node.vx *= -1;
        if (Math.abs(node.y) > limit) node.vy *= -1;
        if (Math.abs(node.z) > limit) node.vz *= -1;

        // 3D rotations
        // Y-axis rotation
        let x1 = node.x * cosY - node.z * sinY;
        let z1 = node.z * cosY + node.x * sinY;

        // X-axis rotation
        let y2 = node.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + node.y * sinX;

        // Perspective projection
        const scale = fov / (fov + z2);
        const screenX = width / 2 + x1 * scale;
        const screenY = height / 2 + y2 * scale;

        return {
          sx: screenX,
          sy: screenY,
          sz: z2,
          scale: scale,
          color: node.color,
          radius: node.radius * scale,
        };
      });

      // Draw connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < projectedNodes.length; i++) {
        for (let j = i + 1; j < projectedNodes.length; j++) {
          const n1 = projectedNodes[i];
          const n2 = projectedNodes[j];

          // Check visual screen distance or 3D distance
          const dx = n1.sx - n2.sx;
          const dy = n1.sy - n2.sy;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const alpha = (1 - dist / connectionDistance) * 0.15 * Math.min(n1.scale, n2.scale);
            ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(n1.sx, n1.sy);
            ctx.lineTo(n2.sx, n2.sy);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      projectedNodes.forEach((node) => {
        // Skip out-of-screen elements
        if (node.sx < 0 || node.sx > width || node.sy < 0 || node.sy > height) return;

        // Depth Cueing: Closer points are brighter
        const depthAlpha = Math.max(0.1, Math.min(1, (fov - node.sz) / (fov * 1.5)));
        ctx.fillStyle = `${node.color}${depthAlpha})`;

        // Glow effects on closer, larger nodes
        if (node.radius > 2 && depthAlpha > 0.6) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = node.color.includes("189") ? "#bd00ff" : "#00f0ff";
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.beginPath();
        ctx.arc(node.sx, node.sy, Math.max(0.5, node.radius), 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.shadowBlur = 0; // reset
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      id="neural-network-canvas"
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-40 md:opacity-50"
    />
  );
}
