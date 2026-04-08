import { motion } from "framer-motion";

const SkeletonItem = ({ width = "100%", height = "40px", rounded = "2xl" }) => (
    <div
        className={`bg-neutral-800/50 rounded-${rounded} border border-white/5 relative overflow-hidden`}
        style={{ height, width }}
    >
        <motion.div
            animate={{
                x: ["-100%", "100%"]
            }}
            transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear"
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent shadow-[0_0_20px_rgba(255,255,255,0.05)]"
        />
    </div>
);

const ColumnHeaderSkeleton = () => (
    <div className="flex items-center gap-3 mb-6 p-4 bg-neutral-950/40 rounded-3xl border border-white/5 backdrop-blur-sm">
        <SkeletonItem width="40px" height="40px" rounded="xl" />
        <div className="flex-1 space-y-2">
            <SkeletonItem width="60%" height="16px" rounded="full" />
            <SkeletonItem width="40%" height="10px" rounded="full" />
        </div>
    </div>
);

const TodoPageLoadingTailwind = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Column 1 */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-neutral-900/40 backdrop-blur-xl rounded-[2.5rem] border border-white/5 p-8 shadow-2xl"
            >
                <ColumnHeaderSkeleton />
                <div className="space-y-4">
                    {Array(8).fill("").map((_, i) => (
                        <motion.div
                            key={`col1-${i}`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <SkeletonItem height="60px" />
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Column 2 */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-neutral-900/40 backdrop-blur-xl rounded-[2.5rem] border border-white/5 p-8 shadow-2xl"
            >
                <ColumnHeaderSkeleton />
                <div className="space-y-4">
                    {Array(8).fill("").map((_, i) => (
                        <motion.div
                            key={`col2-${i}`}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + (i * 0.05) }}
                        >
                            <SkeletonItem height="60px" />
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default TodoPageLoadingTailwind;
