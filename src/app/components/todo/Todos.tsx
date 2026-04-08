
import TodoForm from "./TodoForm";
import TodoContainer from "./TodoContainer";
import useDocumentTitle from "../../../UseDocumentTitle";

const Todos = () => {

  useDocumentTitle({ title: 'Todos' })
  return (
    <div>
      <TodoForm />
      <div style={{ display: 'flex', justifyContent: 'center', color: 'white', fontSize: '15px', marginBottom: '20px', fontWeight: 'light' }}>Drag and Drop todo from one section to another</div>
      <TodoContainer />
    </div>
  );
};

export default Todos;
