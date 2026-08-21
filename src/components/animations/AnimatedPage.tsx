import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import { fadeUp } from "./variants";

interface AnimatedPageProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
}

export function AnimatedPage({ children, className, ...props }: AnimatedPageProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={fadeUp}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
