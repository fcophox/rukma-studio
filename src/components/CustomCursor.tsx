"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringCard, setIsHoveringCard] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  // Use spring for smooth trailing effect
  const cursorX = useSpring(-100, { stiffness: 400, damping: 28 });
  const cursorY = useSpring(-100, { stiffness: 400, damping: 28 });

  useEffect(() => {
    // Check if it's a touch device
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    };
    checkMobile();

    if (window.matchMedia("(pointer: coarse)").matches) return;

    const moveCursor = (e: MouseEvent) => {
      // Offset by half the max cursor size (32px) to center the 64x64 container on the mouse pointer
      cursorX.set(e.clientX - 32);
      cursorY.set(e.clientY - 32);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const isCard = target.closest('[data-cursor="card"]') !== null;

      if (isCard) {
        setIsHoveringCard(true);
        setIsHovering(false);
      } else if (
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button")
      ) {
        setIsHovering(true);
        setIsHoveringCard(false);
      } else {
        setIsHovering(false);
        setIsHoveringCard(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (isMobile) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
      style={{
        x: cursorX,
        y: cursorY,
        width: 64,
        height: 64,
      }}
    >
      <motion.div
        className="rounded-full flex items-center justify-center backdrop-blur-sm shadow-[0_0_10px_rgba(255,255,255,0.2)] text-black overflow-hidden"
        animate={{
          width: isHoveringCard ? 64 : isHovering ? 16 : 8,
          height: isHoveringCard ? 64 : isHovering ? 16 : 8,
          backgroundColor: isHoveringCard ? "rgba(255, 255, 255, 1)" : isHovering ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.5)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
      >
        <motion.div
          animate={{
            opacity: isHoveringCard ? 1 : 0,
            scale: isHoveringCard ? 1 : 0.5,
          }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center w-full h-full"
        >
          {isHoveringCard && (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
