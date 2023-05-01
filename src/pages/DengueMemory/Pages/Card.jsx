import React from 'react';
import Confetti from 'react-confetti';

const Card = ({ type, cardClick }) => {
  return (
    <button
      className={`card dengue${type.id} ${type.flip ? 'unclickable' : ''}`}
      onClick={() => cardClick(type)}
    >
      <Confetti
        initialVelocityY={8}
        run={true}
        className={`confetti ${'dengueConf' + type.id}`}
        tweenDuration={5000}
      />
      <div className={`${type.img} back c  dengueFront${type.id} `}></div>
      <div className={`dengueFlip front c dengueBack${type.id}`}></div>
    </button>
  );
};
export default Card;
