import React from "react";
import "./Card.css";

const Card = props => {
  let classVar = "card";
  let container = "card-container";
  props.hidden
    ? (classVar += " ")
    : props.match
    ? (classVar += " flipcard matched")
    : (classVar += " flipcard");
  props.left ? (container += " left_card") : (container += " right_card");

  return (
    <div className={container} onClick={props.onClick}>
      <div className={classVar}>
        <div className="side">
          <img src={`${image_url}/memory/black.svg`} />
        </div>
        <div className="side back">
          <img src={props.img} className="back_pic" />
        </div>
      </div>
    </div>
  );
};

const image_url = "https://assets.cc.quanterdynamic.com/images";

export default Card;
