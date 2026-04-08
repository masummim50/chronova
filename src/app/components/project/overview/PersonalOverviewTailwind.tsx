
/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import {
    CalendarMonth,
    Assignment,
    Pending,
    PauseCircle,
    PlayCircle,
    CheckCircle,
    Timer
} from "@mui/icons-material"; // Reusing MUI icons for now as per original logic, but styled with Tailwind
import OverviewCardTailwind from "./OverviewCardTailwind";
import { calcTime } from "../../../lib/helpers/timeCal";
import { useChangeProjectStatusMutation } from "../../../redux/features/project/project.api";
import { subtaskType } from "../SubTaskCard";

const StatusBadge = ({ title, color }: { title: string; color: string }) => (
    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white ${color}`}>
        {title}
    </span>
);

const PersonalOverviewTailwind = ({ data }: { data: any }) => {
    const personalOverViewFormat = {
        totaltask: 0,
        pending: 0,
        completed: 0,
        running: 0,
        paused: 0,
        totalTimespent: 0,
    };

    data?.tasks?.reduce((prev: any, curr: any) => {
        if (curr.subtasks.length > 0) {
            curr.subtasks.forEach((s: subtaskType) => {
                if (s.status === "complete") {
                    prev.completed += 1;
                    prev.totalTimespent += s.time.totalTime;
                } else if (s.status === "running") {
                    prev.running += 1;
                    prev.totalTimespent += s.time.totalTime + (new Date().getTime() - s.time.startTime);
                } else if (s.status === "paused") {
                    prev.paused += 1;
                    prev.totalTimespent += s.time.totalTime;
                } else {
                    prev.pending += 1;
                }
                prev.totaltask += 1;
            });
        } else {
            if (curr.status === "complete") {
                prev.completed += 1;
                prev.totalTimespent += curr.time.totalTime;
            } else if (curr.status === "running") {
                prev.running += 1;
                prev.totalTimespent += curr.time.totalTime + (new Date().getTime() - curr.time.startTime);
            } else if (curr.status === "paused") {
                prev.paused += 1;
                prev.totalTimespent += curr.time.totalTime;
            } else {
                prev.pending += 1;
            }
            prev.totaltask += 1;
        }
        return prev;
    }, personalOverViewFormat);

    const [changeStatus, { isLoading: changeStatusLoading }] = useChangeProjectStatusMutation();

    const isAllComplete = personalOverViewFormat.totaltask === personalOverViewFormat.completed && personalOverViewFormat.totaltask > 0;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    {data?.status === "complete" ? (
                        <StatusBadge title="Complete" color="bg-emerald-500" />
                    ) : isAllComplete ? (
                        <button
                            disabled={changeStatusLoading}
                            onClick={() => changeStatus({ id: data?._id, data: { status: 'complete' } })}
                            className="px-6 py-2 bg-emerald-500 text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                        >
                            {changeStatusLoading ? "Processing..." : "Mark Project as Completed"}
                        </button>
                    ) : personalOverViewFormat.pending !== 0 ? (
                        <StatusBadge title="Pending" color="bg-neutral-600" />
                    ) : (
                        (personalOverViewFormat.running > 0 || personalOverViewFormat.paused > 0) && (
                            <StatusBadge title="Running" color="bg-blue-500" />
                        )
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <OverviewCardTailwind title="Created On" count={new Date(data?.createdAt).toDateString()} iconColor="text-blue-400">

                        <CalendarMonth />
                    </OverviewCardTailwind>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <OverviewCardTailwind title="Total Tasks" count={personalOverViewFormat.totaltask} iconColor="text-indigo-400">
                        <Assignment />
                    </OverviewCardTailwind>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <OverviewCardTailwind title="Pending" count={personalOverViewFormat.pending} iconColor="text-neutral-400">
                        <Pending />
                    </OverviewCardTailwind>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                    <OverviewCardTailwind title="Completed" count={personalOverViewFormat.completed} iconColor="text-emerald-400">
                        <CheckCircle />
                    </OverviewCardTailwind>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                    <OverviewCardTailwind title="Running" count={personalOverViewFormat.running} iconColor="text-blue-400">
                        <PlayCircle />
                    </OverviewCardTailwind>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                    <OverviewCardTailwind title="Paused" count={personalOverViewFormat.paused} iconColor="text-amber-400">
                        <PauseCircle />
                    </OverviewCardTailwind>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="sm:col-span-2 lg:col-span-3">
                    <OverviewCardTailwind
                        title="Total Time Spent"
                        count={`${calcTime(personalOverViewFormat.totalTimespent)} ${personalOverViewFormat.running ? "+" : ""}`}
                        iconColor="text-rose-400"
                    >
                        <Timer />
                    </OverviewCardTailwind>
                </motion.div>
            </div>
        </div>
    );
};

export default PersonalOverviewTailwind;
