import { useState } from "react";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  main: {
    textAlign: "center",
    fontSize: "60px",
    margin: "20px 20px 20px 20px",
  },
  left: {
    margin: "20px 20px 20px 20px",
    textAlign: "center",
    backgroundColor: "red",
    color: "white",
    fontSize: "60px",
    borderRadius: "20px",
    padding: "40px 40px 40px 40px",
  },
  right: {
    margin: "20px 20px 20px 20px",
    backgroundColor: "purple",
    color: "white",
    fontSize: "60px",
    borderRadius: "20px",
    padding: "40px 40px 40px 40px",
  },
  sum: {
    margin: "50px 50px 50px 50px",
    fontSize: "60px",
  },
});

const App = () => {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  const [allClicks, setAll] = useState([]);
  const classes = useStyles();

  const handleLeftClick = () => {
    setAll(allClicks.concat("|___|"));
    setLeft(left + 1);
  };

  const handleRightClick = () => {
    setAll(allClicks.concat("-|*_*|-"));
    setRight(right + 1);
  };

  return (
    <div className={classes.main}>
      {left}
      <button onClick={handleLeftClick} className={classes.left}>
        left
      </button>
      <button onClick={handleRightClick} className={classes.right}>
        right
      </button>
      {right}
      <div className={classes.sum}>{allClicks.join(" ")}</div>
      {console.log(allClicks)}
    </div>
  );
};

export default App;
