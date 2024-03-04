import "./filter.scss";

type Props = {
  setFilter: React.Dispatch<React.SetStateAction<string>>;
};

const Filter = ({ setFilter }: Props) => {
  return (
    <div className="sorting">
      <button className="sorting-button" onClick={() => setFilter("all")}>
        All
      </button>
      <button className="sorting-button" onClick={() => setFilter("completed")}>
        Completed
      </button>
      <button className="sorting-button" onClick={() => setFilter("progress")}>
        In progress
      </button>
    </div>
  );
};

export default Filter;
