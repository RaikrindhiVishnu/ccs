import { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

export function AnimatedNumber({ value }: { value: string }) {
  const numMatch = value.match(/[\d.]+/);
  const numericValue = numMatch ? parseFloat(numMatch[0]) : 0;
  const isFloat = numMatch ? numMatch[0].includes('.') : false;
  const prefix = numMatch ? value.substring(0, numMatch.index) : "";
  const suffix = numMatch ? value.substring(numMatch.index! + numMatch[0].length) : value;

  const count = useMotionValue(0);
  
  const displayValue = useTransform(count, (latest) => {
    if (!numMatch || isNaN(numericValue)) return value;
    return `${prefix}${isFloat ? latest.toFixed(2) : Math.round(latest)}${suffix}`;
  });

  useEffect(() => {
    if (numMatch && !isNaN(numericValue)) {
      const controls = animate(count, numericValue, { duration: 1.2, ease: "easeOut" });
      return controls.stop;
    }
  }, [numericValue, numMatch, count]);

  return <motion.span>{numMatch ? displayValue : value}</motion.span>;
}
