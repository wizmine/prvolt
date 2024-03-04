import "./addTask.scss";

type Props = {
  newTodo: string;
  handleAdd: (event: React.FormEvent<HTMLFormElement>) => void;
  setNewTodo: (value: React.SetStateAction<string>) => void;
};

const AddTask = ({ newTodo, handleAdd, setNewTodo }: Props) => {
  return (
    <form onSubmit={(event) => handleAdd(event)} className="add">
      <input
        className="add-input"
        placeholder="write something..."
        type="text"
        value={newTodo}
        onChange={(event) => setNewTodo(event.target.value)}
        name="name"
      />
      <input type="submit" value="Add" className="add-button" />
    </form>
  );
};

export default AddTask;
