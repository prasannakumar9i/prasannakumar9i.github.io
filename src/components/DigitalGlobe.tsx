import { useEffect, useRef, useState } from "react";

interface Point3D {
  x: number;
  y: number;
  z: number;
}

export default function DigitalGlobe() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });
  const [rotationSpeed, setRotationSpeed] = useState(0.005);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const points: Point3D[] = [];
    const sphereRadius = Math.min(width, height) * 0.35;
    const numLatitudes = 14;
    const numLongitudes = 20;

    // Generate points on sphere
    for (let i = 0; i < numLatitudes; i++) {
      const phi = (Math.PI / numLatitudes) * i;
      for (let j = 0; j < numLongitudes; j++) {
        const theta = ((Math.PI * 2) / numLongitudes) * j;
        const x = sphereRadius * Math.sin(phi) * Math.cos(theta);
        const y = sphereRadius * Math.cos(phi);
        const z = sphereRadius * Math.sin(phi) * Math.sin(theta);
        points.push({ x, y, z });
      }
    }

    // Interactive dragging rotation
    let angleX = 0;
    let angleY = 0;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      previousMousePosition.current = { x: e.clientX, y: e.clientY };
      setRotationSpeed(0);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      const deltaX = e.clientX - previousMousePosition.current.x;
      const deltaY = e.clientY - previousMousePosition.current.y;

      angleY += deltaX * 0.005;
      angleX += deltaY * 0.005;

      previousMousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      setRotationSpeed(0.005);
    };

    // Touch events for mobile
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging.current = true;
        previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        setRotationSpeed(0);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMousePosition.current.x;
      const deltaY = e.touches[0].clientY - previousMousePosition.current.y;

      angleY += deltaX * 0.005;
      angleX += deltaY * 0.005;

      previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    canvas.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleMouseUp);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    const fov = 500;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Slow idle rotation when not dragging
      if (!isDragging.current) {
        angleY += rotationSpeed;
        angleX += rotationSpeed * 0.2;
      }

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      // Project points
      const projected = points.map((p) => {
        // Rotate Y
        let x1 = p.x * cosY - p.z * sinY;
        let z1 = p.z * cosY + p.x * sinY;

        // Rotate X
        let y2 = p.y * cosX - z1 * sinX;
        let z2 = z1 * cosX + p.y * sinX;

        const scale = fov / (fov + z2);
        const sx = width / 2 + x1 * scale;
        const sy = height / 2 + y2 * scale;

        return { sx, sy, sz: z2, scale };
      });

      // Draw grid lines (horizontal loops)
      ctx.strokeStyle = "rgba(0, 240, 255, 0.08)";
      ctx.lineWidth = 0.5;

      for (let i = 0; i < numLatitudes; i++) {
        ctx.beginPath();
        for (let j = 0; j < numLongitudes; j++) {
          const idx = i * numLongitudes + j;
          const p = projected[idx];
          if (j === 0) {
            ctx.moveTo(p.sx, p.sy);
          } else {
            ctx.lineTo(p.sx, p.sy);
          }
        }
        ctx.closePath();
        ctx.stroke();
      }

      // Draw vertical meridian loops
      for (let j = 0; j < numLongitudes; j++) {
        ctx.beginPath();
        for (let i = 0; i < numLatitudes; i++) {
          const idx = i * numLongitudes + j;
          const p = projected[idx];
          if (i === 0) {
            ctx.moveTo(p.sx, p.sy);
          } else {
            ctx.lineTo(p.sx, p.sy);
          }
        }
        ctx.stroke();
      }

      // Draw points with gradient size/opacity based on depth
      projected.forEach((p, idx) => {
        // Hide very far back points for true 3D volumetric effect
        if (p.sz > sphereRadius * 0.8) return;

        const depthAlpha = Math.max(0.1, 1 - (p.sz + sphereRadius) / (sphereRadius * 2));
        const color = idx % 3 === 0 
          ? `rgba(189, 0, 255, ${depthAlpha * 0.7})` // purple
          : `rgba(0, 240, 255, ${depthAlpha * 0.8})`; // cyan

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, Math.max(1, p.scale * 1.5), 0, Math.PI * 2);
        ctx.fill();

        // Interactive "glow connection" to the center occasionally
        if (idx === 45 || idx === 112 || idx === 180) {
          ctx.strokeStyle = `rgba(0, 255, 216, ${depthAlpha * 0.2})`;
          ctx.beginPath();
          ctx.moveTo(width / 2, height / 2);
          ctx.lineTo(p.sx, p.sy);
          ctx.stroke();
        }
      });

      // Holographic glowing center core
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        sphereRadius * 0.4
      );
      gradient.addColorStop(0, "rgba(0, 240, 255, 0.15)");
      gradient.addColorStop(0.5, "rgba(189, 0, 255, 0.04)");
      gradient.addColorStop(1, "rgba(10, 11, 16, 0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, sphereRadius * 0.6, 0, Math.PI * 2);
      ctx.fill();

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
      window.removeEventListener("resize", handleResize);
    };
  }, [rotationSpeed]);

  return (
    <div className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing">
      <canvas ref={canvasRef} className="w-full h-full max-w-[400px] max-h-[400px]" />
      <div className="absolute bottom-2 text-xs font-mono text-gray-500 pointer-events-none select-none">
        DRAG TO ROTATE HOLOGRAM
      </div>
    </div>
  );
}
