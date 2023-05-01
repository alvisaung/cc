import { gsap } from "gsap";
import React, { useEffect, useState } from "react";
import DeletePic from "../images/delete.png";
import ShowMailPic from "../images/show.png";
import HideMailPic from "../images/hidden.png";

import PopUp from "../images/pop-up.png";
import { useRef } from "react";
import usePrevious from "./usePrevious";

export default function EmailPage({ nextPage, setEmail, email, currPage }) {
  const [showPassword, setShowPassword] = useState(false);
  const [fontSize, setFontSize] = useState("2.8em");
  const [top, setTop] = useState("0%");
  const prevCount = usePrevious(email);

  const prevMailRef = useRef();

  const handleMailSubmit = () => {
    if (!Boolean(email)) {
      return;
    }
    gsap.to(".email-sending", 0.3, { display: "none", autoAlpha: 0 });
    gsap.set("#pop-up", { display: "block" });
    gsap.to("#pop-up", { duration: 2, ease: "elastic.out(1, 0.75)", scale: 1 });
    setTimeout(() => {
      nextPage("#email-page", "#final-page");
      gsap.set(".email-sending", { display: "block", autoAlpha: 1, delay: 1 });
      gsap.set("#pop-up", { scale: 0, display: "none", delay: 1 });
    }, 5000);
  };
  useEffect(() => {
    if (currPage != "#email-page") {
      setEmail("");
    }
  }, [currPage]);

  const handleDelete = () => {
    let newMail = email.slice(0, -1);
    validateEmail(newMail);
    setEmail(newMail);
  };

  const handleKey = (e) => {
    let newMail = email + e.currentTarget.dataset.id;
    console.log({ newMail });
    validateEmail(newMail);
    setEmail(newMail);
  };

  const validateEmail = (email) => {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validate = re.test(String(email).toLowerCase());
    console.log(validate);
    if (!validate) displayMailErr();
    else removeMailErr();
  };
  const displayMailErr = () => {
    gsap.set(".email-field", { borderBottomColor: "red" });
  };
  const removeMailErr = () => {
    gsap.set(".email-field", { borderBottomColor: "black" });
  };

  const renderKeyboard = () => {
    return (
      <div id="keyboard">
        {" "}
        {/* style={{ top: input_no==0 ? 530 : input_no==1 ? 630 : input_no==2 ? 730 : input_no==3 ? 830 : input_no==4 ? 930 : 1030  }}*/}
        <div className="krows" id="row1">
          <span className="kNum" onClick={(e) => handleKey(e)} data-id="1">
            1
          </span>
          <span className="kNum" onClick={(e) => handleKey(e)} data-id="2">
            2
          </span>
          <span className="kNum" onClick={(e) => handleKey(e)} data-id="3">
            3
          </span>
          <span className="kNum" onClick={(e) => handleKey(e)} data-id="4">
            4
          </span>
          <span className="kNum" onClick={(e) => handleKey(e)} data-id="5">
            5
          </span>
          <span className="kNum" onClick={(e) => handleKey(e)} data-id="6">
            6
          </span>
          <span className="kNum" onClick={(e) => handleKey(e)} data-id="7">
            7
          </span>
          <span className="kNum" onClick={(e) => handleKey(e)} data-id="8">
            8
          </span>
          <span className="kNum" onClick={(e) => handleKey(e)} data-id="9">
            9
          </span>
          <span className="kNum" onClick={(e) => handleKey(e)} data-id="0">
            0
          </span>
        </div>
        <div className="krows" id="row2">
          <span onClick={(e) => handleKey(e)} data-id="q">
            Q
          </span>
          <span onClick={(e) => handleKey(e)} data-id="w">
            W
          </span>
          <span onClick={(e) => handleKey(e)} data-id="e">
            E
          </span>
          <span onClick={(e) => handleKey(e)} data-id="r">
            R
          </span>
          <span onClick={(e) => handleKey(e)} data-id="t">
            T
          </span>
          <span onClick={(e) => handleKey(e)} data-id="y">
            Y
          </span>
          <span onClick={(e) => handleKey(e)} data-id="u">
            U
          </span>
          <span onClick={(e) => handleKey(e)} data-id="i">
            I
          </span>
          <span onClick={(e) => handleKey(e)} data-id="o">
            O
          </span>
          <span onClick={(e) => handleKey(e)} data-id="p">
            P
          </span>
          <span id="backSpace" onClick={() => handleDelete()}>
            {" "}
            <img src={DeletePic} alt="" width="57" />
          </span>
        </div>
        <div className="krows" id="row3" style={{ justifyContent: "space-evenly" }}>
          <span onClick={(e) => handleKey(e)} data-id="a">
            A
          </span>
          <span onClick={(e) => handleKey(e)} data-id="s">
            S
          </span>
          <span onClick={(e) => handleKey(e)} data-id="d">
            D
          </span>
          <span onClick={(e) => handleKey(e)} data-id="f">
            F
          </span>
          <span onClick={(e) => handleKey(e)} data-id="g">
            G
          </span>
          <span onClick={(e) => handleKey(e)} data-id="h">
            H
          </span>
          <span onClick={(e) => handleKey(e)} data-id="j">
            J
          </span>
          <span onClick={(e) => handleKey(e)} data-id="k">
            K
          </span>
          <span onClick={(e) => handleKey(e)} data-id="l">
            L
          </span>
          {/* <span id="return" onClick={() => this.handleReturn()}>
            Return
          </span> */}
        </div>
        <div className="krows" id="row4">
          <span onClick={(e) => handleKey(e)} data-id="z">
            Z
          </span>
          <span onClick={(e) => handleKey(e)} data-id="x">
            X
          </span>
          <span onClick={(e) => handleKey(e)} data-id="c">
            C
          </span>
          <span onClick={(e) => handleKey(e)} data-id="v">
            V
          </span>
          <span onClick={(e) => handleKey(e)} data-id="b">
            B
          </span>
          <span onClick={(e) => handleKey(e)} data-id="n">
            N
          </span>
          <span onClick={(e) => handleKey(e)} data-id="m">
            M
          </span>
          <span onClick={(e) => handleKey(e)} data-id=".">
            .
          </span>
          <span onClick={(e) => handleKey(e)} data-id="-">
            -
          </span>
          <span onClick={(e) => handleKey(e)} data-id="_">
            _
          </span>
          <span onClick={(e) => handleKey(e)} data-id="@">
            @
          </span>
        </div>
        <div className="krows" id="row5">
          <span className="atMail" onClick={(e) => handleKey(e)} data-id="@gmail.com">
            @gmail.com
          </span>
          <span className="atMail" onClick={(e) => handleKey(e)} data-id="@hotmail.com">
            @hotmail.com
          </span>
          <span className="atMail" onClick={(e) => handleKey(e)} data-id="@yahoo.com">
            @yahoo.com
          </span>
          <span className="atMail" onClick={(e) => handleKey(e)} data-id=".com">
            .com
          </span>
        </div>
      </div>
    );
  };
  useEffect(() => {
    prevMailRef.current = email;
    if (!prevCount) return;
    let pureSize = fontSize.slice(0, -2);
    let pureTop = top.slice(0, -1);
    let size;
    let topCal;
    if (email.length > prevCount.length) {
      size = parseFloat(pureSize) - 0.02;
      topCal = parseFloat(pureTop) - 0.5;
    } else {
      size = parseFloat(pureSize) + 0.02;
      topCal = parseFloat(pureTop) + 0.5;
    }
    setFontSize(size + "em");
    setTop(topCal + "%");
  }, [email]);

  return (
    <div id="email-page">
      <div className="email-sending">
        <div className="title">Now, those are some POWER poses!</div>
        <div className="sub-title">
          Submit your email to download <br /> your 'Kiai' moment <br />
          and stand to win POWER prizes
        </div>
        <div className="email-input-gp">
          <input
            placeholder="Email:"
            type={showPassword ? "password" : "text"}
            className="email-field"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            style={{ fontSize }}
          />
          <div onClick={() => setShowPassword(!showPassword)}>
            {" "}
            <img
              style={{ top }}
              src={showPassword ? HideMailPic : ShowMailPic}
              alt="show mail"
              className="show-img-pic"
            />
          </div>
        </div>

        {renderKeyboard()}
        <button className="submit-btn btn" onClick={() => handleMailSubmit()}>
          SUBMIT
        </button>
      </div>
      <img src={PopUp} alt="Pop up img" id="pop-up" />
      {/* <div className="sth">Sth</div> */}
    </div>
  );
}
const image_url = "https://assets.cc.ninetyfivegroup.com/images/japcur";
