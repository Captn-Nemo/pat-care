import React from "react";
import { Col, Row } from "react-bootstrap";
import "./style.css";

const generateStar = (val, label) => {
  let stars = [];
  for (let index = 0; index < val; index++) {
    let star = (
      <span
        key={index}
        role="img"
        aria-label={label ? label : ""}
        aria-hidden={label ? "false" : "true"}
      >
        ⭐
      </span>
    );
    stars.push(star);
  }
  return stars;
};

const Emoji = ({ label, symbol, value = 0, vote, selected, setSelected }) => {
  return (
    <>
      <div
        className="emoji"
        style={{
          borderWidth: 1,
          padding: 15,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: selected === value ? "lightblue" : "white",
        }}
        onClick={(e) => {
          vote(value);
          setSelected(value);
        }}
      >
        <span
          style={{ fontSize: 45 }}
          role="img"
          aria-label={label ? label : ""}
          aria-hidden={label ? "false" : "true"}
        >
          {symbol}
        </span>
        <div>{value > 0 && generateStar(value, label)}</div>
      </div>
    </>
  );
};
export default Emoji;
