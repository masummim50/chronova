
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, FileText } from 'lucide-react';

const ProjectDetailsAccordion = ({ data }: { data: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="mb-6 rounded-2xl border border-white/5 bg-neutral-900/40 backdrop-blur-xl overflow-hidden shadow-xl">
            {/* Accordion Summary */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-5 hover:bg-white/5 transition-all duration-300 group"
            >
                <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-blue-400" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 group-hover:text-neutral-300 transition-colors">
                        Project Brief
                    </span>
                </div>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="p-1.5 rounded-lg bg-neutral-950/50 border border-white/5 text-neutral-500 group-hover:text-white transition-colors"
                >
                    <ChevronDown className="w-4 h-4" />
                </motion.div>
            </button>

            {/* Accordion Details */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                        <div className="p-6 pt-0 border-t border-white/5">
                            <div className="bg-neutral-950/30 rounded-xl  border border-white/5 mt-4">
                                <pre className="break-words whitespace-pre-wrap font-sans text-sm text-neutral-300 leading-relaxed">
                                    {data}
                                </pre>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProjectDetailsAccordion;