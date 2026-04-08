import { useGetTodosQuery } from "../../redux/features/todo/todo.api";

import { DndProvider } from "react-dnd/dist/core";
import { HTML5Backend } from "react-dnd-html5-backend";

import CompleteSection from "./CompleteSection";
import PendingSection from "./PendingSection";
import TodoPageLoadingTailwind from "../loadingSkeletons/TodoPageLoadingTailwind";

import NoItemFound from "../project/NoItemFound";
export const isDesktop = () => {
  const userAgent = navigator.userAgent;
  return !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    userAgent
  );
};
const TodoContainer = () => {
  const {
    data: todos,
    isLoading,
    isSuccess,
  } = useGetTodosQuery(undefined);

  return (
    <div>
      {isLoading ? (
        // <TodoPageLoading />
        <TodoPageLoadingTailwind />
      ) : todos?.data?.pending.length === 0 &&
        todos?.data?.completed.length === 0 ? (
        <NoItemFound title="No todo has been added yet." />
      ) : (
        isSuccess &&


        <DndProvider backend={HTML5Backend}>
          <div className="grid grid-cols-2 gap-4"  >
            <PendingSection
              todos={todos?.data?.pending}
            />
            <CompleteSection
              todos={todos?.data?.completed}
            />
          </div>
        </DndProvider>
      )}
    </div>
  );
};

export default TodoContainer;
