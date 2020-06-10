import React from "react";
import "./main.css";

const Row = ({ item, adjust, remove }) => {
  const [active, setActive] = React.useState(false);
  const [score, setScore] = React.useState(item.score);

  const onClick = (item) => {
    setActive(!active);
  };
  const increment = (id) => {
    adjust(id, 1);
  };

  const className = item.deleted ? "hidden" : active ? "active" : "";

  return (
    <li onClick={onClick} className={className}>
      <span key="1" className="name">
        {item.name}
      </span>
      <span
        key="2"
        className="increment control"
        onClick={() => increment(item.id)}
      >
        <span>Increment Score</span>
      </span>
      <span key="3" className="delete control" onClick={() => remove(item.id)}>
        ×
      </span>
      <span key="4" className="score">
        {item.score}
      </span>
    </li>
  );
};

export default Row;
