import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import { staggerContainer } from "./variants";

interface StaggerContainerProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  once?: boolean;
}

export function StaggerContainer({ 
  children, 
  once = true,
  className,
  ...props 
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      variants={staggerContainer}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
