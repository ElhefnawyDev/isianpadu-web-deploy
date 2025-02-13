import {
    KeyframeOptions,
    animate,
    useInView,
    useIsomorphicLayoutEffect,
  } from "framer-motion";
  import { useRef } from "react";
  
  type AnimatedCounterProps = {
    from: number;
    to: number;
    fontSize?: number; // Add fontSize prop
    animationOptions?: KeyframeOptions;
    suffix?: string; // Optional suffix prop
  };
  
  const AnimatedCounter = ({
    from,
    to,
    fontSize,
    animationOptions,
    suffix = "", // Default suffix is an empty string
  }: AnimatedCounterProps) => {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true });
  
    useIsomorphicLayoutEffect(() => {
      const element = ref.current;
  
      if (!element) return;
      if (!inView) return;
  
      // Set initial value
      element.textContent = `${from}${suffix}`;
  
      // If reduced motion is enabled in system's preferences
      if (window.matchMedia("(prefers-reduced-motion)").matches) {
        element.textContent = `${to}${suffix}`;
        return;
      }
  
      const controls = animate(from, to, {
        duration: 1,
        ease: "easeOut",
        ...animationOptions,
        onUpdate(value) {
          element.textContent = `${value.toFixed(0)}${suffix}`;
        },
      });
  
      // Cancel on unmount
      return () => {
        controls.stop();
      };
    }, [ref, inView, from, to, suffix]);
  
    return (
      // Apply the font size to the span element using the fontSize prop
      <span ref={ref} style={{ fontSize: fontSize ? `${fontSize}px` : "60px" }} />
    );
  };
  
  export default AnimatedCounter;
  