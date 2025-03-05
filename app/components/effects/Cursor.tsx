"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type CursorMode = "default" | "link" | "button" | "text" | "hidden";

const Cursor = () => {
  // Ensure no rendering on server
  if (typeof window === "undefined") {
    return null;
  }

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [cursorMode, setCursorMode] = useState<CursorMode>("default");

  // Current user data
  const currentDateTime = "2025-03-03 19:18:26";
  const currentUser = "vkhare2909";

  // Analytics tracking
  const [clickCount, setClickCount] = useState(0);
  const [lastActive, setLastActive] = useState(currentDateTime);

  useEffect(() => {
    // Track cursor position
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setLastActive(new Date().toISOString());
    };

    // Click events
    const handleMouseDown = () => {
      setClicked(true);
      setClickCount((prev) => prev + 1);
    };
    const handleMouseUp = () => setClicked(false);

    // Hover in/out
    const handleMouseEnter = () => setHidden(false);
    const handleMouseLeave = () => setHidden(true);

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Define interactive elements
    const setupInteractiveElements = () => {
      // Links and buttons
      const interactiveEls = document.querySelectorAll("a, button");
      interactiveEls.forEach((el) => {
        el.addEventListener("mouseenter", () => setCursorMode("link"));
        el.addEventListener("mouseleave", () => setCursorMode("default"));
      });

      // Text inputs
      const textInputs = document.querySelectorAll(
        'input[type="text"], textarea'
      );
      textInputs.forEach((el) => {
        el.addEventListener("mouseenter", () => setCursorMode("text"));
        el.addEventListener("mouseleave", () => setCursorMode("default"));
      });
    };

    setupInteractiveElements();

    // Watch for DOM changes
    const observer = new MutationObserver(() => {
      setupInteractiveElements();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
    };
  }, []);

  // Hide on touch devices
  if (window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  // Dynamic styles
  const getCursorStyles = () => {
    switch (cursorMode) {
      case "link":
        return {
          scale: clicked ? 1.1 : 1.4,
          width: "44px",
          height: "44px",
          borderColor: "rgba(99, 102, 241, 0.75)", // Indigo
          boxShadow: clicked
            ? "0 0 10px rgba(99, 102, 241, 0.5)"
            : "0 0 15px rgba(99, 102, 241, 0.4)",
        };
      case "text":
        return {
          scale: clicked ? 1.05 : 1,
          width: "4px",
          height: "24px",
          borderRadius: "2px",
          borderColor: "rgba(255, 255, 255, 0.7)",
          boxShadow: "none",
        };
      case "hidden":
        return {
          opacity: 0,
          scale: 0,
        };
      default:
        return {
          scale: clicked ? 1.1 : 1,
          width: "36px",
          height: "36px",
          borderColor: "rgba(255, 255, 255, 0.4)",
          boxShadow: clicked
            ? "0 0 10px rgba(255, 255, 255, 0.3)"
            : "0 0 15px rgba(255, 255, 255, 0.15)",
        };
    }
  };

  return (
    <>
      {/* Dot Center */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50"
        animate={{
          x: position.x - 3,
          y: position.y - 3,
          opacity: hidden ? 0 : 1,
          scale: clicked ? 0.7 : 1,
        }}
        transition={{ duration: 0.1 }}
        style={{
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          backgroundColor: "#fff",
        }}
        data-user={currentUser}
        data-timestamp={currentDateTime}
      />

      {/* Outer Circle */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 border border-solid"
        animate={{
          x: position.x - 18,
          y: position.y - 18,
          opacity: hidden ? 0 : 1,
          ...getCursorStyles(),
        }}
        transition={{ duration: 0.15 }}
        style={{
          borderRadius: cursorMode === "text" ? "2px" : "50%",
          background:
            cursorMode === "link" ? "rgba(99, 102, 241, 0.05)" : "transparent",
        }}
      />

      {/* Debug info (dev only) */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-4 left-4 text-xs bg-black/60 backdrop-blur-sm text-gray-200 p-2 rounded pointer-events-none">
          <div>User: {currentUser}</div>
          <div>Time: {currentDateTime}</div>
          <div>Clicks: {clickCount}</div>
          <div>Mode: {cursorMode}</div>
          <div>
            Position: {Math.round(position.x)}, {Math.round(position.y)}
          </div>
        </div>
      )}

      {/* Hidden accessibility info */}
      <div className="sr-only" aria-live="polite">
        Cursor tracking enabled for {currentUser}. Last active: {lastActive}.
      </div>
    </>
  );
};

export default Cursor;
