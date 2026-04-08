
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Layout,
    FileText,
    Plus,
    Sparkles,
    ArrowLeft,
    Target,
    Loader2
} from "lucide-react";
import {
    useCreatePersonalProjectMutation,
    useCreateTeamProjectMutation,
} from "../../redux/features/project/project.api";
import { getCurrentTimeString } from "../../lib/dateFunctions";

const CreateProjectTailwind = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [
        createTeamProject,
        { isSuccess: teamCreateSuccess, isLoading: teamCreateLoading },
    ] = useCreateTeamProjectMutation();

    const [
        createPersonalProject,
        { isSuccess: personalCreateSuccess, isLoading: personalCreateLoading },
    ] = useCreatePersonalProjectMutation();

    const { pathname } = useLocation();
    const redirectionUrl = pathname.split("/")[1] + '/' + pathname.split("/")[2];

    const handleCreateProject = () => {
        if (redirectionUrl === "dashboard/teamprojects") {
            createTeamProject({ name, description });
        } else {
            createPersonalProject({ name, description });
        }
    };

    useEffect(() => {
        if (teamCreateSuccess || personalCreateSuccess) {
            navigate(`/${redirectionUrl}`);
        }
    }, [teamCreateSuccess, personalCreateSuccess, navigate, redirectionUrl]);

    const handleRandom = () => {
        setName(`Project -- ${getCurrentTimeString()}`);
        setDescription(`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse `);
    };

    const isLoading = teamCreateLoading || personalCreateLoading;

    return (
        <div className="max-w-2xl mx-auto py-8 px-4">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors mb-8 group"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span className="text-xs font-black uppercase tracking-widest">Return to Dashboard</span>
            </button>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-neutral-900/40 backdrop-blur-xl border border-white/5 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
            >
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] -z-10" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] -z-10" />

                <div className="space-y-8">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                            <Layout className="w-8 h-8 text-indigo-400" />
                            Initialize Project
                        </h1>
                        <p className="text-neutral-500 font-medium">Define your objective and set the foundation for your next sprint.</p>
                    </div>

                    <div className="space-y-6">
                        {/* Project Name Field */}
                        <div className="space-y-3">
                            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 ml-1">
                                <Target className="w-3.5 h-3.5" />
                                Project Objective
                            </label>
                            <input
                                autoFocus
                                type="text"
                                placeholder="Ex: Quantum Core Deployment"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-neutral-950/50 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-bold placeholder:text-neutral-700"
                            />
                        </div>

                        {/* Project Description Field */}
                        <div className="space-y-3">
                            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 ml-1">
                                <FileText className="w-3.5 h-3.5" />
                                Operational Brief
                            </label>
                            <textarea
                                rows={5}
                                placeholder="Describe the scope, constraints, and success criteria..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full bg-neutral-950/50 border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium placeholder:text-neutral-700 resize-none"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-white/5">
                        <button
                            disabled={isLoading || !name}
                            onClick={handleCreateProject}
                            className="w-full sm:flex-1 flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <Plus className="w-5 h-5" />
                            )}
                            {isLoading ? "Provisioning..." : "Create Project"}
                        </button>

                        <button
                            onClick={handleRandom}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-neutral-800 text-white rounded-2xl font-bold shadow-lg hover:bg-neutral-700 transition-all group"
                        >
                            <Sparkles className="w-5 h-5 text-amber-500 group-hover:animate-pulse" />
                            Randomize
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default CreateProjectTailwind;
