
import { motion } from "framer-motion";

const Shimmer = () => (
    <motion.div
        animate={{ x: ["-100%", "100%"] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
    />
);

const SkeletonBox = ({ height = "40px", rounded = "2xl", className = "" }: { height?: string, rounded?: string, className?: string }) => (
    <div className={`relative overflow-hidden bg-neutral-800/40 border border-white/5 rounded-${rounded} ${className}`} style={{ height }}>
        <Shimmer />
    </div>
);

const ProjectDetailsLoadingTailwind = () => {
    return (
        <div className="max-w-7xl mx-auto space-y-8 p-6">
            {/* Header Skeleton */}
            <div className="bg-neutral-900/40 backdrop-blur-xl rounded-[2.5rem] border border-white/5 p-8 shadow-2xl space-y-6">
                <div className="flex flex-col gap-4">
                    <SkeletonBox height="48px" className="w-1/3" />
                    <SkeletonBox height="24px" className="w-2/3 opacity-60" />
                </div>

                <div className="flex flex-wrap gap-4 pt-4 border-t border-white/5">
                    <SkeletonBox height="36px" rounded="xl" className="w-24" />
                    <SkeletonBox height="36px" rounded="xl" className="w-32" />
                    <SkeletonBox height="36px" rounded="xl" className="w-28 opacity-40" />
                </div>
            </div>

            {/* Content Area Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar/Info Section */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-neutral-900/40 backdrop-blur-xl rounded-[2rem] border border-white/5 p-6 shadow-xl space-y-4">
                        <SkeletonBox height="24px" className="w-1/2 mb-4" />
                        <div className="space-y-3">
                            {Array(4).fill("").map((_, i) => (
                                <SkeletonBox key={`side-${i}`} height="44px" rounded="xl" />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Task List Section */}
                <div className="lg:col-span-3 space-y-6">
                    {/* Tab Navigation Skeleton */}
                    <div className="bg-neutral-950/40 p-2 rounded-2xl border border-white/5 flex gap-2">
                        {Array(3).fill("").map((_, i) => (
                            <SkeletonBox key={`tab-${i}`} height="44px" rounded="xl" className="flex-1" />
                        ))}
                    </div>

                    {/* Task Card Skeletons */}
                    <div className="space-y-4">
                        {Array(5).fill("").map((_, i) => (
                            <motion.div
                                key={`card-${i}`}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-neutral-900/40 backdrop-blur-xl rounded-[2.5rem] border border-white/5 p-6 shadow-xl h-44 relative overflow-hidden"
                            >
                                <div className="flex flex-col gap-6">
                                    <div className="flex justify-between items-start">
                                        <div className="space-y-2 flex-1">
                                            <SkeletonBox height="20px" className="w-1/4 opacity-40" rounded="full" />
                                            <SkeletonBox height="32px" className="w-3/4" />
                                        </div>
                                        <SkeletonBox height="44px" rounded="xl" className="w-32 opacity-20" />
                                    </div>
                                    <div className="pt-4 border-t border-white/5 flex justify-between">
                                        <div className="flex gap-4">
                                            <SkeletonBox height="32px" rounded="full" className="w-24 opacity-60" />
                                            <SkeletonBox height="32px" rounded="full" className="w-24 opacity-60" />
                                        </div>
                                        <SkeletonBox height="32px" rounded="xl" className="w-20 opacity-40" />
                                    </div>
                                </div>
                                <Shimmer />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetailsLoadingTailwind;
