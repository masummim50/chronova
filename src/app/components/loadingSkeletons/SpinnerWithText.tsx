
import { motion } from "framer-motion";

export const SpinnerWithText = ({ height, text }: { height: number; text: string }) => {
    return (
        <div
            style={{ height }}
            className="w-full flex flex-col items-center justify-center relative overflow-hidden"
        >
            {/* Background decorative glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px]" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 flex flex-col items-center gap-6 p-10 rounded-[2.5rem] border border-white/5 bg-neutral-900/40 backdrop-blur-xl shadow-2xl shadow-blue-500/5"
            >
                {/* Advanced Spinner */}
                <div className="relative w-16 h-16">
                    {/* Pulsing Outer Ring */}
                    <motion.div
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute inset-0 border-4 border-blue-500/20 rounded-full"
                    />

                    {/* Rotating Inner Dash */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute inset-0 border-t-4 border-r-4 border-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                    />

                    {/* Inner Core */}
                    <motion.div
                        animate={{
                            opacity: [0.4, 1, 0.4]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute inset-4 bg-blue-500/40 rounded-full blur-[4px]"
                    />
                </div>

                <div className="flex flex-col items-center gap-2">
                    <motion.span
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400/80"
                    >
                        System Loading
                    </motion.span>
                    <h2 className="text-xl font-bold text-white tracking-tight">
                        {text}
                    </h2>
                </div>
            </motion.div>
        </div>
    );
};
