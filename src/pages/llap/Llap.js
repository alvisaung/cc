import React, { useEffect } from "react";
import "./Llap.scss";
import Panda from "./assets/panda.png";
import Place1 from "./assets/placeholder_1.jpg";
import Place2 from "./assets/placeholder_2.jpg";
import Place3 from "./assets/placeholder_3.jpg";
import Place4 from "./assets/placeholder_4.jpg";
import Place5 from "./assets/placeholder_5.jpg";
import Place6 from "./assets/placeholder_6.jpg";
import Place7 from "./assets/placeholder_7.jpg";

import { useState } from "react";
import api from "services/api";
import { useRef } from "react";

const Llap = ({ demo }) => {
  const [pic, setPic] = useState([]);
  const placeholder_list = [Place1, Place2, Place3, Place4, Place5, Place6, Place7];
  const [place_holder, setPlaceHolder] = useState([]);

  const fetchKey = useRef();

  useEffect(() => {
    fetchPic();
    loopCallInterval();
    makePlaceholder();
    return () => {
      fetchKey.current && clearInterval(fetchKey.current);
    };
  }, []);
  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  const makePlaceholder = () => {
    let i = 4;
    let rand_id = [];
    while (i > 0) {
      let rand = getRndInteger(0, 6);
      while (rand_id.includes(rand)) {
        rand = getRndInteger(0, 6);
      }
      rand_id.push(rand);
      i--;
    }
    setPlaceHolder(rand_id);
  };

  window.BroadSignPlay = () => {
    fetchPic();
  };
  const loopCallInterval = () => {
    fetchKey.current = setInterval(() => {
      fetchPic();
    }, 1000 * 5);
  };

  const fetchPic = async () => {
    try {
      const res = await api.get("llap/display-schedule");
      const { data } = res;
      data.map((d) => {
        const img = new Image();
        img.src = d.img_url;
      });
      setPic(data);
    } catch (e) {}
  };
  return (
    <div id="LLAP" style={{ background: demo ? "#282c34" : "" }}>
      {demo && <div style={{ fontSize: 80, textAlign: "center", color: "white", top: 200, position: "absolute", width: "100%" }}>Clear Channel Demo page</div>}
      {!demo && <img src={Panda} alt={"panda"} className="panda" />}
      <div className="main-gp">
        {pic.length > 0
          ? pic.map((p) => (
              <div>
                <img src={p.img_url} alt="Test" className="main-pic" />
              </div>
            ))
          : place_holder.map((p) => (
              <div>
                <img src={placeholder_list[p]} alt="Test" className="main-pic" />
              </div>
            ))}
      </div>
    </div>
  );
};

export default Llap;
