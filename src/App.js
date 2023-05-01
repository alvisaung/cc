import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link, Redirect, withRouter, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Kaplan from "./pages/Kaplan/Kaplan";
import Accelerometer from "./pages/Accelerometer/Accelerometer";
import MemoryGame from "./pages/MemoryGame/MemoryGame";
import Weather from "./pages/100plusWeather";
import GiftCatching from "./pages/GiftCatching/GiftCatching";
import NetsBat from "./pages/NetsBat/NetsBat";
import WallySally from "./pages/WallySally/WallySally";
import Uniqlo from "./pages/Uniqlo/uniqlo";
import DengueMemory from "./pages/DengueMemory/index";
import OutSmartWeather from "./pages/OutSmartWeather";
import HSBCGolfSwing from "./pages/HSBCGolfSwing/HSBCGolfSwing";
import NameCard from "./pages/Namecard/NameCard";
import McdWorldCup from "./pages/mcdWorldCup/McdWorldCup";
import Bagel from "./pages/Bagel/Bagel";
import TemplateGame from "./pages/TemplateGame/TemplateGame";
import Llap from "./pages/llap/Llap";
import LlapAdmin from "./pages/llap/Llap-admin";
import Vdo from "./pages/Vdo/Vdo";
import Shake from "./pages/shaking/Shake";
import CartoonGenerator from "pages/cartoonGenerator/CartoonGenerator";
import FaceEmotion from "pages/FaceEmotion/FaceEmotion";
import FaceSmileFilter from "pages/FaceSmileFilter/FaceSmileFilter";

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/kaplan" exact component={Kaplan} />
      <Route path="/memory" exact component={MemoryGame} />
      <Route path="/hsbc-golf-swing" exact component={HSBCGolfSwing} />
      <Route path="/accelerometer" exact component={Accelerometer} />
      <Route path="/scb-yec" exact component={GiftCatching} />
      <Route path="/nets-bat" exact component={NetsBat} />
      <Route path="/wally-sally" exact component={WallySally} />
      <Route path="/uniqlo" exact component={Uniqlo} />
      <Route path="/dengue-memory-game" exact component={DengueMemory} />
      <Route path="/outsmart-weather" exact render={() => <OutSmartWeather />} />
      <Route path="/name-card" exact render={() => <NameCard />} />
      <Route path="/mcd-cup" exact render={() => <McdWorldCup />} />
      <Route path="/bagel" exact render={() => <Bagel />} />
      <Route path="/jap-curry-game" exact render={() => <TemplateGame />} />
      <Route path="/llap" exact render={() => <Llap />} />
      <Route path="/llap-admin" exact render={() => <LlapAdmin />} />
      <Route path="/vdo" exact render={() => <Vdo />} />
      <Route path="/shake" exact render={() => <Shake />} />
      <Route path="/cartoon" exact render={() => <CartoonGenerator />} />
      <Route path="/face-emo" exact render={() => <FaceEmotion />} />
      <Route path="/face-smile-filter" exact render={() => <FaceSmileFilter />} />
    </Router>
  );
}

export default App;

/* <div>
     
      </div> */

// </Router>