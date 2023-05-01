import React from "react";
import "./WordCard.css";

const WordCard = props => {
  const wordCard = props.wordCard;
  console.log(wordCard);
  return (
    wordCard && (
      <div className="wordCardComponent">
        <div className="pic_group">
          <img src={wordCard.urlPic1} />
          <img src={wordCard.urlPic2} />
          <img src={wordCard.urlPic3} />
        </div>
        <div className="des">
          <img src={wordCard.txtPic} />
        </div>
      </div>
    )
  );
};

export default WordCard;
