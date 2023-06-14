import React, { Component } from "react";
import "./uniqlo.css";
import footer from "./img/footer.jpg";
import header from "./img/header.jpg";
import high_1 from "./img/high-1.jpg";
import high_2 from "./img/high-2.jpg";
import low_1 from "./img/low-1.jpg";
import low_2 from "./img/low-2.jpg";
import mod_1 from "./img/mod-1.jpg";
import mod_2 from "./img/mod-2.jpg";
import veryHigh from "./img/very-high.jpg";
import { TweenLite } from "gsap";

class Uniqlo extends Component {
  key = "4td2CjWPXL3YI9KXVcWVCZICaAgA2Cov";
  flipSame = 0;
  state = {
    areas: {
      central: [1569860, 1569858, 1604990],
      NorthE: [1605063, 300574, 1569828],
      NorthW: [1569861, 1604966, 1604965],
      SouthE: [1605071, 300560, 1569825],
      SouthW: [1569859, 1569857, 1603342],
    },
    panels: [
      { panelId: 10052, loc: 6191 },
      { panelId: 10089, loc: 6191 },
      { panelId: 9188, loc: 6191 },
      { panelId: 8904, loc: 300544 },
      { panelId: 9924, loc: 300544 },
      { panelId: 9885, loc: 1607589 },
      { panelId: 10025, loc: 1607589 },
      { panelId: 9080, loc: 300549 },
      { panelId: 6419, loc: 6191 },
      { panelId: 9471, loc: 300597 },
      { panelId: 9445, loc: 300597 },
      { panelId: 9116, loc: 1569686 },
      { panelId: 8853, loc: 300549 },
      { panelId: 7188, loc: 300549 },
      { panelId: 9891, loc: 1569686 },
      { panelId: 7878, loc: 300597 },
      { panelId: 9198, loc: 300597 },
      { panelId: 9146, loc: 1569699 },
      { panelId: 8981, loc: 1603568 },
      { panelId: 1914, loc: 1603568 },
      { panelId: 8877, loc: 300549 },
      { panelId: 1989, loc: 300597 },
      { panelId: 10079, loc: 300549 },
      { panelId: 9142, loc: 300549 },
      { panelId: 9249, loc: 300549 },
      { panelId: 10021, loc: 300549 },
      { panelId: 9243, loc: 300549 },
      { panelId: 9251, loc: 300549 },
      { panelId: 9144, loc: 300548 },
      { panelId: 2127, loc: 300597 },
      { panelId: 9966, loc: 300597 },
      { panelId: 2154, loc: 300549 },
      { panelId: 9895, loc: 300597 },
      { panelId: 10000, loc: 300597 },
      { panelId: 9914, loc: 300576 },
      { panelId: 6004, loc: 300548 },
      { panelId: 4553, loc: 300597 },
      { panelId: 9490, loc: 300597 },
      { panelId: 9981, loc: 300549 },
      { panelId: 9071, loc: 300549 },
      { panelId: 9069, loc: 300549 },
      { panelId: 9897, loc: 300597 },
      { panelId: 10050, loc: 300587 },
      { panelId: 10095, loc: 300542 },
      { panelId: 9120, loc: 300550 },
      { panelId: 8919, loc: 300542 },
      { panelId: 9907, loc: 1569846 },
      { panelId: 8975, loc: 300562 },
      { panelId: 9936, loc: 300574 },
      { panelId: 8967, loc: 1603383 },
      { panelId: "demo", loc: 300597 },
      { panelId: 10125, loc: 1603568 },
      { panelId: 5960, loc: 300548 },
      { panelId: 8973, loc: 300569 },
      { panelId: 9011, loc: 300549 },
      { panelId: 9061, loc: 300549 },
      { panelId: 9162, loc: 300541 },
      { panelId: 9174, loc: 300576 },
      { panelId: 9190, loc: 300598 },
      { panelId: 9993, loc: 300544 },
      { panelId: 9502, loc: 300542 },
      { panelId: 9835, loc: 300597 },
    ],
    currUV: 5,
    currTemp: 0,
  };

  componentDidMount = () => {
    let hr = 1000 * 60 * 15;
    console.log(this.state.panels.length);
    if (typeof window.BroadsignPlay !== "undefined") {
      window.BroadsignPlay();
    }
    const urlParams = new URLSearchParams(window.location.search);
    let panel = urlParams.get("panel");
    setInterval(() => {
      this.fetchWeather(panel, "every");
    }, hr);

    this.fetchWeather(panel, "once");
  };

  fetchWeather = (panel, time) => {
    const areas = this.state.panels;
    console.log("PANEL=>", panel);
    let loc = "";
    for (let i = 0; i < areas.length; i++) {
      const e = areas[i];
      if (e.panelId == panel) {
        loc = e.loc;
        break;
      }
    }
    if (loc == "") {
      alert("Panel ID is wrong!");
    } else {
      console.log("FEtch", loc);
      fetch(`https://dataservice.accuweather.com/currentconditions/v1/${loc}?apikey=${this.key}&details=true`)
        .then((res) => res.json())
        .then((data) =>
          this.setState({ currUV: data[0].UVIndex, currTemp: data[0].ApparentTemperature?.Metric?.Value }, () => {
            if (time == "once") {
              this.changeImg();
            }
          })
        );
    }
  };

  getAdministrativeArea = () => {
    for (let i = 0; i < this.state.panels.length; i++) {
      const e = this.state.panels[i];
      let lat_long = e.long_lat.split(",").reverse().join(", ");

      fetch(`http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=${this.key}&q=${lat_long}`)
        .then((res) => res.json())
        .then((data) => console.log(`Panel-ID-> ${e.panelId}, Location-ID -> `, data.Key))
        .catch((err) => console.log(err));
    }
  };
  getShowHide = () => {
    let toShow = [];
    let toDis = [];
    const { currUV } = this.state;
    console.log("Curr UV", currUV);
    if (currUV == 0 || currUV == 1 || currUV == 2) {
      toShow = ["#low_1", "#low_2"];
      toDis = ["#low_2", "#mod_1", "#mod_2", "#high_1", "#high_2", "#very_high "];
    } else if (currUV >= 3 && currUV <= 5) {
      toShow = ["#mod_1", "#mod_2"];
      toDis = ["#mod_2", "#low_1", "#low_2", "#high_1", "#high_2", "#very_high "];
    } else if (currUV >= 6 && currUV <= 7) {
      toShow = ["#high_1", "#high_2"];
      toDis = ["#low_1", "#low_2", "#mod_1", "#mod_2", "#very_high "];
    } else {
      toShow = ["#very_high"];
      toDis = ["#low_1", "#low_2", "#mod_1", "#mod_2", "#high_1", "#high_2"];
    }
    return [toShow, toDis];
  };
  changeImg = () => {
    let val = this.getShowHide();
    let toShow = val[0];
    let toDis = val[1];
    TweenLite.to(toDis, 0.4, {
      autoAlpha: 0,
      display: "none",
    });
    TweenLite.to(toShow[0], 1, {
      autoAlpha: 1,
      display: "block",
    }).delay(0.2);

    if (toShow[1]) {
      let zero_show = true;
      this.flipSame = setInterval(() => {
        let val = this.getShowHide();
        let toShow = val[0];
        let toDis = val[1];
        TweenLite.to(toDis, 0.4, {
          autoAlpha: 0,
          display: "none",
        });

        if (zero_show) {
          this.flipChange(toShow, zero_show);
          zero_show = false;
        } else {
          this.flipChange(toShow, zero_show);
          zero_show = true;
        }
      }, 10000);
    }
  };
  flipChange = (toShow, zero_show) => {
    if (toShow.length >= 2) {
      if (zero_show == true) {
        TweenLite.to(toShow[0], 0.4, {
          autoAlpha: 0,
          display: "none",
        });
        TweenLite.to(toShow[1], 1, {
          autoAlpha: 1,
          display: "block",
        }).delay(0);
      } else {
        TweenLite.to(toShow[1], 0.4, {
          autoAlpha: 0,
          display: "none",
        });
        TweenLite.to(toShow[0], 1, {
          autoAlpha: 1,
          display: "block",
        }).delay(0);
      }
    } else {
      TweenLite.to(toShow[0], 1, {
        autoAlpha: 1,
        display: "block",
      });
    }
  };

  render() {
    const { demo } = this.props;
    return (
      <div style={{ background: demo ? "#282c34" : "" }}>
        {demo && <div style={{ fontSize: 80, textAlign: "center", color: "white", top: 200, position: "absolute", width: "100%" }}>Clear Channel Demo page</div>}
        {demo && <div style={{ fontSize: 60, textAlign: "center", color: "white", top: 400, position: "absolute", width: "100%" }}>{`Current UV Index ${this.state.currUV}`}</div>}
        {demo && <div style={{ fontSize: 60, textAlign: "center", color: "white", top: 500, position: "absolute", width: "100%" }}>{`Current Temp Index ${this.state.currTemp}`}</div>}

        {!demo && (
          <>
            <img src={header} alt="" id="header" className="model" />
            <img src={low_1} alt="" id="low_1" className="model" />
            <img src={low_2} alt="" id="low_2" className="model" />
            <img src={mod_1} alt="" id="mod_1" className="model" />
            <img src={mod_2} alt="" id="mod_2" className="model" />
            <img src={high_1} alt="" id="high_1" className="model" />
            <img src={high_2} alt="" id="high_2" className="model" />
            <img src={veryHigh} alt="" id="very_high" className="model" />
            <img src={footer} alt="" id="footer" className="model" />
          </>
        )}
      </div>
    );
  }
}
const img_url = "https://assets.cc.quanterdynamic.com/images/uniqlo";

export default Uniqlo;
