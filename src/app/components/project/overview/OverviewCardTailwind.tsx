
import React from "react";

const OverviewCardTailwind = ({
    title,
    count,
    children,
    iconColor = "text-blue-400"
}: {
    title: string;
    count: string | number;
    children: React.ReactNode;
    iconColor?: string;
}) => {
    return (
        <div className="bg-neutral-900/40 backdrop-blur-xl border border-white/5 p-5 rounded-lg shadow-xl flex items-center justify-between group hover:bg-neutral-800/50 transition-all duration-300">
            <div className="space-y-1">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 group-hover:text-neutral-400 transition-colors">
                    {title}
                </span>
                <h3 className="text-xl font-bold text-white tracking-tight">
                    {count}
                </h3>
            </div>
            <div className={`p-3 rounded-2xl bg-neutral-950/50 border border-white/5 ${iconColor}`}>
                {children}
            </div>
        </div>
    );
};

export default OverviewCardTailwind;
