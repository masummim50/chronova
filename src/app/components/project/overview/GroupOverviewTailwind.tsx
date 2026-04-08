
/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import {
    CalendarMonth,
    Assignment,
    CheckCircle,
    Pending as PendingIcon,
    PlayCircle,
    PauseCircle,
    Group,
    PersonOff,
    Timer
} from "@mui/icons-material";
import OverviewCardTailwind from "./OverviewCardTailwind";
import { calcTime } from "../../../lib/helpers/timeCal";
import { useAppSelector } from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import { useChangeProjectStatusMutation } from "../../../redux/features/project/project.api";
import { subtaskType } from "../SubTaskCard";

const MemberStat = ({ label, value, color }: { label: string; value: string | number; color: string }) => (
    <div className="flex flex-col gap-1 p-3 rounded-xl bg-neutral-950/30 border border-white/5">
        <span className="text-[9px] font-black uppercase tracking-wider text-neutral-500">{label}</span>
        <span className={`text-sm font-bold ${color}`}>{value}</span>
    </div>
);

const GroupOverviewTailwind = ({ data }: { data: any }) => {
    const user = useAppSelector((state: RootState) => state.user);
    const reformat = {
        totaltask: 0,
        pending: 0,
        completed: 0,
        running: 0,
        paused: 0,
        assigned: 0,
        unassigned: 0,
        totalTimespent: 0,
        members: {} as any,
    };

    data.tasks.reduce((prev: any, curr: any) => {
        const processTask = (t: any) => {
            prev.totaltask += 1;
            if (t.assignedTo?.email) {
                prev.assigned += 1;
                if (!prev.members[t.assignedTo.email]) {
                    prev.members[t.assignedTo.email] = {
                        email: t.assignedTo.email,
                        name: t.assignedTo.name,
                        totalTask: 0,
                        completed: 0,
                        running: 0,
                        paused: 0,
                        pending: 0,
                        totalTimespent: 0,
                    };
                }
                const m = prev.members[t.assignedTo.email];
                m.totalTask += 1;
                if (t.status === "complete") {
                    m.completed += 1;
                    m.totalTimespent += t.time.totalTime;
                } else if (t.status === "running") {
                    m.running += 1;
                    m.totalTimespent += t.time.totalTime + (new Date().getTime() - t.time.startTime);
                } else if (t.status === "paused") {
                    m.paused += 1;
                    m.totalTimespent += t.time.totalTime;
                } else {
                    m.pending += 1;
                }
            } else {
                prev.unassigned += 1;
            }

            if (t.status === "complete") {
                prev.completed += 1;
                prev.totalTimespent += t.time.totalTime;
            } else if (t.status === "running") {
                prev.running += 1;
                prev.totalTimespent += t.time.totalTime + (new Date().getTime() - t.time.startTime);
            } else if (t.status === "paused") {
                prev.paused += 1;
                prev.totalTimespent += t.time.totalTime;
            } else {
                prev.pending += 1;
            }
        };

        if (curr.subtasks.length > 0) {
            curr.subtasks.forEach(processTask);
        } else {
            processTask(curr);
        }
        return prev;
    }, reformat);

    const [changeStatus, { isLoading: changeStatusLoading }] = useChangeProjectStatusMutation();

    const overviewStats = [
        { title: "Created On", count: new Date(data.createdAt).toDateString(), icon: <CalendarMonth />, color: "text-blue-400" },
        { title: "Total Tasks", count: reformat.totaltask, icon: <Assignment />, color: "text-indigo-400" },
        { title: "Completed", count: reformat.completed, icon: <CheckCircle />, color: "text-emerald-400" },
        { title: "Pending", count: reformat.pending, icon: <PendingIcon />, color: "text-neutral-400" },
        { title: "Running", count: reformat.running, icon: <PlayCircle />, color: "text-blue-400" },
        { title: "Paused", count: reformat.paused, icon: <PauseCircle />, color: "text-amber-400" },
        { title: "Assigned", count: reformat.assigned, icon: <Group />, color: "text-violet-400" },
        { title: "Unassigned", count: reformat.unassigned, icon: <PersonOff />, color: "text-rose-400" },
        { title: "Total Time", count: calcTime(reformat.totalTimespent), icon: <Timer />, color: "text-emerald-400" },
    ];

    return (
        <div className="space-y-10">
            <div className="flex items-center justify-between">
                <div>
                    {data.status === "complete" ? (
                        <span className="px-4 py-1.5 bg-emerald-500 rounded-full text-[10px] font-black uppercase tracking-widest text-white">Complete</span>
                    ) : (reformat.totaltask > reformat.pending) ? (
                        <span className="px-4 py-1.5 bg-blue-500 rounded-full text-[10px] font-black uppercase tracking-widest text-white">Running</span>
                    ) : (
                        <span className="px-4 py-1.5 bg-neutral-600 rounded-full text-[10px] font-black uppercase tracking-widest text-white">Pending</span>
                    )}
                </div>

                {user.id === data.user && reformat.totaltask === reformat.completed && data.status !== "complete" && (
                    <button
                        onClick={() => changeStatus({ id: data._id, data: { status: "complete" } })}
                        className="px-6 py-2 bg-emerald-500 text-white rounded-xl font-bold text-xs uppercase tracking-widest shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all"
                    >
                        {changeStatusLoading ? "Processing..." : "Mark as Completed"}
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {overviewStats.map((stat, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                        <OverviewCardTailwind title={stat.title} count={stat.count} iconColor={stat.color}>
                            {stat.icon}
                        </OverviewCardTailwind>
                    </motion.div>
                ))}
            </div>

            <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white tracking-tight pl-2 border-l-4 border-blue-500">Member's Overview</h3>
                <div className="grid grid-cols-1 gap-4">
                    {Object.values(reformat.members).map((v: any, i: number) => (
                        <motion.div
                            key={v.email}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + (i * 0.1) }}
                            className="bg-neutral-900/40 backdrop-blur-xl border border-white/5 p-6 rounded-lg shadow-xl"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="space-y-1">
                                    <h4 className="text-xl font-bold text-white">{v.name}</h4>
                                    <p className="text-xs text-neutral-500 font-medium">{v.email}</p>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 flex-1 lg:max-w-4xl">
                                    <MemberStat label="Total" value={v.totalTask} color="text-white" />
                                    <MemberStat label="Complete" value={v.completed} color="text-emerald-400" />
                                    <MemberStat label="Pending" value={v.pending} color="text-neutral-500" />
                                    <MemberStat label="Running" value={v.running} color="text-blue-400" />
                                    <MemberStat label="Paused" value={v.paused} color="text-amber-400" />
                                    <MemberStat label="Time" value={calcTime(v.totalTimespent)} color="text-emerald-400 font-mono" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GroupOverviewTailwind;
