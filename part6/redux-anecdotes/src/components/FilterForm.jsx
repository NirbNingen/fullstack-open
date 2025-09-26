import { useDispatch } from "react-redux";
import { createFilter } from "../reducers/filterReducer";

const FilterForm = () => {
  const dispatch = useDispatch();

  const filterContent = (event) => {
    event.preventDefault();
    console.log("adding an filter-input", event);
    const filterContentInput = event.target.value;
    dispatch(createFilter(filterContentInput));
  };
  const style = {
    marginBottom: 10,
  };
  return (
    <div style={style}>
      <form>
        <input
          name="filterInput"
          placeholder="enter-your-search-text"
          onChange={filterContent}
        ></input>
      </form>
    </div>
  );
};

export default FilterForm;
