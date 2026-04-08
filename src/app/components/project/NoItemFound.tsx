import FolderOffIcon from '@mui/icons-material/FolderOff';

const NoItemFound = ({ title }: { title: string }) => {
  return (
    <div className="flex flex-col items-center justify-center h-[200px] w-full bg-neutral-900/40 backdrop-blur-xl border border-white/5 rounded-lg shadow-xl group hover:bg-neutral-800/50 transition-all duration-300">
      <div className="flex flex-col items-center gap-4">
        <div className="p-4 rounded-full bg-neutral-950/50 border border-white/5 text-neutral-500 group-hover:text-blue-400 transition-colors">
          <FolderOffIcon fontSize="large" />
        </div>
        <div className="text-center space-y-1">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">Inventory Empty</span>
          <h3 className="text-lg font-bold text-white tracking-tight">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default NoItemFound;