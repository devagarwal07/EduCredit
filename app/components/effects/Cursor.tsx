"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type CursorMode = "default" | "link" | "button" | "text" | "hidden";

const Cursor = () => {
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
    // Updates cursor position
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setLastActive(new Date().toISOString());
    };

    // Handles mouse click states
    const handleMouseDown = () => {
      setClicked(true);
      setClickCount((prev) => prev + 1);
    };
    const handleMouseUp = () => setClicked(false);

    // Handles viewport entry/exit
    const handleMouseEnter = () => setHidden(false);
    const handleMouseLeave = () => setHidden(true);

    // Adds event listeners for cursor positioning and state
    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);

    // Define all the interactive elements to track
    const setupInteractiveElements = () => {
      // Links and buttons
      const interactiveElements = document.querySelectorAll("a, button");
      interactiveElements.forEach((el) => {
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

    // Initial setup
    setupInteractiveElements();

    // Setup a MutationObserver to handle dynamically added elements
    const observer = new MutationObserver(() => {
      setupInteractiveElements();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Cleanup function
    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
      observer.disconnect();
    };
  }, []);

  // Only render custom cursor on non-touch devices
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches
  ) {
    return null;
  }

  // Determine cursor styles based on mode
  const getCursorStyles = () => {
    switch (cursorMode) {
      case "link":
        return {
          scale: clicked ? 1.2 : 1.5,
          width: "50px",
          height: "50px",
          borderColor: "rgba(79, 70, 229, 0.6)", // Indigo color
        };
      case "text":
        return {
          scale: 1,
          width: "4px",
          height: "24px",
          borderRadius: "2px",
          borderColor: "rgba(255, 255, 255, 0.8)",
        };
      case "hidden":
        return {
          opacity: 0,
          scale: 0,
        };
      default:
        return {
          scale: clicked ? 1.2 : 1,
          width: "40px",
          height: "40px",
          borderColor: "rgba(255, 255, 255, 0.3)",
        };
    }
  };

  return (
    <>
      {/* Small dot cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          opacity: hidden ? 0 : 1,
          scale: clicked ? 0.8 : 1,
        }}
        transition={{ duration: 0.1 }}
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: "white",
        }}
        data-user={currentUser}
        data-timestamp={currentDateTime}
      />

      {/* Outer cursor ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 border-2"
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          opacity: hidden ? 0 : 1,
          ...getCursorStyles(),
        }}
        transition={{ duration: 0.15 }}
        style={{
          borderRadius: cursorMode === "text" ? "2px" : "50%",
        }}
      />

      {/* Debug info - only visible in development */}
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-4 left-4 text-xs bg-gray-900/70 backdrop-blur-sm rounded-md p-2 text-gray-400 border border-gray-700/30 pointer-events-none">
          <div>User: {currentUser}</div>
          <div>Time: {currentDateTime}</div>
          <div>Clicks: {clickCount}</div>
          <div>Mode: {cursorMode}</div>
          <div>
            Position: {Math.round(position.x)},{Math.round(position.y)}
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
