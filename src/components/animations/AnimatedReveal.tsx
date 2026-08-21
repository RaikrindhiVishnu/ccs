import { motion } from "framer-motion";
import type { HTMLMotionProps, Variants } from "framer-motion";
import { fadeUp } from "./variants";

interface AnimatedRevealProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  variants?: Variants;
  once?: boolean;
}

export function AnimatedReveal({ 
  children, 
  variants = fadeUp, 
  once = true, 
  className,
  ...props 
}: AnimatedRevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
