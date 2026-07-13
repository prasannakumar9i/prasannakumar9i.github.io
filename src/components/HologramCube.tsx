import { useEffect, useRef } from "react";

interface Vertice {
  x: number;
  y: number;
  z: number;
}

export default function HologramCube() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseHover = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // 8 vertices of a cube
    const vertices: Vertice[] = [
      { x: -50, y: -50, z: -50 },
      { x: 50, y: -50, z: -50 },
      { x: 50, y: 50, z: -50 },
      { x: -50, y: 50, z: -50 },
      { x: -50, y: -50, z: 50 },
      { x: 50, y: -50, z: 50 },
      { x: 50, y: 50, z: 50 },
      { x: -50, y: 50, z: 50 },
    ];

    // 12 edges connecting the vertices
    const edges = [
      [0, 1], [1, 2], [2, 3], [3, 0], // back face
      [4, 5], [5, 6], [6, 7], [7, 4], // front face
      [0, 4], [1, 5], [2, 6], [3, 7], // connection lines
    ];

    let angleX = 0;
    let angleY = 0;
    let angleZ = 0;
    const fov = 200;

    const handleMouseEnter = () => {
      mouseHover.current = true;
    };
    const handleMouseLeave = () => {
      mouseHover.current = false;
    };

    canvas.addEventListener("mouseenter", handleMouseEnter);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Spin speed updates on hover
      const speed = mouseHover.current ? 0.03 : 0.01;
      angleX += speed;
      angleY += speed * 0.7;
      angleZ += speed * 0.3;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);
      const cosZ = Math.cos(angleZ);
      const sinZ = Math.sin(angleZ);

      // Rotate and project vertices
      const projected = vertices.map((v) => {
        // Rotate X
        let y1 = v.y * cosX - v.z * sinX;
        let z1 = v.z * cosX + v.y * sinX;

        // Rotate Y
        let x2 = v.x * cosY - z1 * sinY;
        let z2 = z1 * cosY + v.x * sinY;

        // Rotate Z
        let x3 = x2 * cosZ - y1 * sinZ;
        let y3 = y1 * cosZ + x2 * sinZ;

        const scale = fov / (fov + z2);
        const sx = width / 2 + x3 * scale;
        const sy = height / 2 + y3 * scale;

        return { sx, sy, sz: z2, scale };
      });

      // Draw edges
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = "rgba(0, 240, 255, 0.4)";
      ctx.shadowBlur = mouseHover.current ? 8 : 2;
      ctx.shadowColor = "#00f0ff";

      edges.forEach(([u, v]) => {
        const p1 = projected[u];
        const p2 = projected[v];

        // Highlight closer edges
        const avgDepth = (p1.sz + p2.sz) / 2;
        const alpha = Math.max(0.1, 1 - (avgDepth + 100) / 200);

        ctx.strokeStyle = `rgba(0, 240, 255, ${alpha * 0.5})`;
        ctx.beginPath();
        ctx.moveTo(p1.sx, p1.sy);
        ctx.lineTo(p2.sx, p2.sy);
        ctx.stroke();
      });

      // Draw vertices as small cyan glowing dots
      ctx.fillStyle = "#bd00ff";
      ctx.shadowColor = "#bd00ff";
      projected.forEach((p) => {
        const alpha = Math.max(0.2, 1 - (p.sz + 100) / 200);
        ctx.fillStyle = `rgba(189, 0, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, p.scale * 3, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw floating core particle inside the cube
      const coreZ = Math.sin(Date.now() * 0.003) * 10;
      const coreScale = fov / (fov + coreZ);
      const coreY = Math.sin(Date.now() * 0.002) * 8;
      const coreX = Math.cos(Date.now() * 0.002) * 8;
      const csx = width / 2 + coreX * coreScale;
      const csy = height / 2 + coreY * coreScale;

      ctx.shadowColor = "#00ffd8";
      ctx.fillStyle = "rgba(0, 255, 216, 0.8)";
      ctx.beginPath();
      ctx.arc(csx, csy, coreScale * 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 0;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener("mouseenter", handleMouseEnter);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <canvas ref={canvasRef} className="w-[140px] h-[140px] cursor-pointer" />
    </div>
  );
}
