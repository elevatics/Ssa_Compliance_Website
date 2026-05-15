import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export function CounterStat({
  value,
  suffix = "",
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1800;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }}
      className="text-center"
    >
      <div className="font-display text-6xl md:text-8xl tracking-tight tabular-nums font-extralight">
        {n}
        <span className="text-accent-orange">{suffix}</span>
      </div>
      <div className="mt-5 text-[14px] text-paper/65 max-w-[22ch] mx-auto font-light leading-relaxed">
        {label}
      </div>
    </motion.div>
  );
}
