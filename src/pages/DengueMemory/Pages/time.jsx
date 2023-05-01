import React, { Component } from 'react';

const Time = (props) => {
  return (
    <React.Fragment>
      <div className="sec sec_id ">
        {props.time.sec > 9 ? props.time.sec : '0' + props.time.sec}
      </div>
      <div className="semi_id ">:</div>{' '}
      <div className="miliSec miliSec_id ">
        {props.time.miliSec > 9 ? props.time.miliSec : '0' + props.time.miliSec}
      </div>
    </React.Fragment>
  );
};
export default Time;
