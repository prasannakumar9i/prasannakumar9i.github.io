import { useEffect, useRef } from "react";

interface HelixNode {
  x: number;
  y: number;
  z: number;
  strand: 1 | 2;
  color: string;
}

export default function DnaHelix() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const nodes: HelixNode[] = [];
    const numPoints = 28;
    const helixLength = height * 0.8;
    const spacing = helixLength / numPoints;

    // Build static relative 3D points
    for (let i = 0; i < numPoints; i++) {
      const y = -helixLength / 2 + i * spacing;
      const angle = (i * Math.PI) / 6; // spiral rate
      const radius = Math.min(width, height) * 0.18;

      // Strand 1
      nodes.push({
        x: radius * Math.sin(angle),
        y: y,
        z: radius * Math.cos(angle),
        strand: 1,
        color: "rgba(0, 240, 255, ", // cyan
      });

      // Strand 2
      nodes.push({
        x: -radius * Math.sin(angle),
        y: y,
        z: -radius * Math.cos(angle),
        strand: 2,
        color: "rgba(189, 0, 255, ", // purple
      });
    }

    let angleY = 0;
    const fov = 300;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      angleY += 0.015; // rotation speed

      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      // Projects 3D points to 2D
      const projected = nodes.map((node) => {
        // Rotate Y-axis
        let x1 = node.x * cosY - node.z * sinY;
        let z1 = node.z * cosY + node.x * sinY;

        const scale = fov / (fov + z1);
        const sx = width / 2 + x1 * scale;
        const sy = height / 2 + node.y; // fixed along Y axis for simple vertical scroll/float

        return {
          sx,
          sy,
          sz: z1,
          scale,
          strand: node.strand,
          color: node.color,
        };
      });

      // Draw ladder bars (connecting complementary base pairs)
      ctx.lineWidth = 1;
      for (let i = 0; i < numPoints; i++) {
        const p1 = projected[i * 2];
        const p2 = projected[i * 2 + 1];

        const avgZ = (p1.sz + p2.sz) / 2;
        const depthAlpha = Math.max(0.05, 1 - (avgZ + 100) / 300);

        // Draw connections with gradient
        const gradient = ctx.createLinearGradient(p1.sx, p1.sy, p2.sx, p2.sy);
        gradient.addColorStop(0, `rgba(0, 240, 255, ${depthAlpha * 0.4})`);
        gradient.addColorStop(0.5, `rgba(255, 255, 255, ${depthAlpha * 0.2})`);
        gradient.addColorStop(1, `rgba(189, 0, 255, ${depthAlpha * 0.4})`);

        ctx.strokeStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(p1.sx, p1.sy);
        ctx.lineTo(p2.sx, p2.sy);
        ctx.stroke();
      }

      // Draw the spiral strands and backbone node circles
      projected.forEach((p) => {
        const depthAlpha = Math.max(0.1, 1 - (p.sz + 100) / 300);
        ctx.fillStyle = `${p.color}${depthAlpha})`;

        if (depthAlpha > 0.7) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = p.strand === 1 ? "#00f0ff" : "#bd00ff";
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.beginPath();
        ctx.arc(p.sx, p.sy, p.scale * 3.5, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.shadowBlur = 0;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full max-w-[200px] max-h-[350px]" />
    </div>
  );
}
