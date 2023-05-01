import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import DryVdo from "./img/dry.mp4";
import WetVdo from "./img/wet.mp4";
import DryImg from "./img/dry.jpg";
import WetImg from "./img/wet.jpg";

let panel_data = [
  {
    panel_id: 9186,
    lat: 1.316216659,
    lng: 103.8816816,
    loc: "300546",
    orientation: "PF",
  },
  {
    panel_id: 10093,
    lat: 1.301663045,
    lng: 103.9011815,
    loc: "6191",
    orientation: "PF",
  },
  {
    panel_id: 9122,
    lat: 1.368754906,
    lng: 103.8466101,
    loc: "300564",
    orientation: "TF",
  },
  {
    panel_id: 10050,
    lat: 1.376153348,
    lng: 103.8499921,
    loc: 300587,
    orientation: "PF",
  },
  {
    panel_id: 9561,
    lat: 1.298491389,
    lng: 103.7872067,
    loc: "6193",
    orientation: "TF",
  },
  {
    panel_id: 9494,
    lat: 1.326404021,
    lng: 103.8464203,
    loc: "300551",
    orientation: "TF",
  },
  {
    panel_id: 8867,
    lat: 1.281947795,
    lng: 103.8589706,
    loc: "300549",
    orientation: "TF",
  },
  {
    panel_id: 9944,
    lat: 1.285004677,
    lng: 103.8606111,
    loc: "300549",
    orientation: "PF",
  },
  {
    panel_id: 8865,
    lat: 1.28315,
    lng: 103.8600439,
    loc: "300549",
    orientation: "TF",
  },
  {
    panel_id: 9200,
    lat: 1.303384444,
    lng: 103.8648389,
    loc: "300597",
    orientation: "PF",
  },
  {
    panel_id: 9202,
    lat: 1.303213609,
    lng: 103.8650158,
    loc: "300597",
    orientation: "PF",
  },
  {
    panel_id: 9827,
    lat: 1.299746693,
    lng: 103.8511048,
    loc: "300597",
    orientation: "TF",
  },
  {
    panel_id: 9482,
    lat: 1.30097494,
    lng: 103.8521799,
    loc: "300597",
    orientation: "TF",
  },
  {
    panel_id: 9502,
    lat: 1.351003056,
    lng: 103.8476588,
    loc: 300542,
    orientation: "PF",
  },
  {
    panel_id: 10096,
    lat: 1.354640028,
    lng: 103.8470163,
    loc: "300542",
    orientation: "TF",
  },
  {
    panel_id: 9610,
    lat: 1.342470278,
    lng: 103.7327128,
    loc: "300598",
    orientation: "TF",
  },
  {
    panel_id: 170,
    lat: 1.298190028,
    lng: 103.8493744,
    loc: "300597",
    orientation: "TF",
  },
  {
    panel_id: 9182,
    lat: 1.367560375,
    lng: 103.7501642,
    loc: "300571",
    orientation: "TF",
  },
  {
    panel_id: 9922,
    lat: 1.323984722,
    lng: 103.8102992,
    loc: "300553",
    orientation: "PF",
  },
  {
    panel_id: 1914,
    lat: 1.282555246,
    lng: 103.849989,
    loc: 1603568,
    orientation: "PF",
  },
  {
    panel_id: 8887,
    lat: 1.316341705,
    lng: 103.8989162,
    loc: "300541",
    orientation: "TF",
  },
  {
    panel_id: 8953,
    lat: 1.397402697,
    lng: 103.7475549,
    loc: "1610322",
    orientation: "TF",
  },
  {
    panel_id: 9029,
    lat: 1.284496673,
    lng: 103.8490869,
    loc: "300549",
    orientation: "TF",
  },
  {
    panel_id: 8632,
    lat: 1.284245,
    lng: 103.8531081,
    loc: "300549",
    orientation: "PF",
  },
  {
    panel_id: 9114,
    lat: 1.302133056,
    lng: 103.7983908,
    loc: "300548",
    orientation: "PF",
  },
  {
    panel_id: 10117,
    lat: 1.297981567,
    lng: 103.8036025,
    loc: "300548",
    orientation: "PF",
  },
  {
    panel_id: 8955,
    lat: 1.314973993,
    lng: 103.765027,
    loc: "300565",
    orientation: "TF",
  },
  {
    panel_id: 9126,
    lat: 1.311234167,
    lng: 103.7783836,
    loc: "300565",
    orientation: "TF",
  },
  {
    panel_id: 10085,
    lat: 1.31168308,
    lng: 103.7787018,
    loc: "300565",
    orientation: "PF",
  },
  {
    panel_id: 8845,
    lat: 1.281795094,
    lng: 103.8489321,
    loc: "300549",
    orientation: "TF",
  },
  {
    panel_id: 10100,
    lat: 1.324695,
    lng: 103.8102625,
    loc: "300553",
    orientation: "PF",
  },
  {
    panel_id: 1989,
    lat: 1.288989622,
    lng: 103.8470898,
    loc: 300597,
    orientation: "PF",
  },
  {
    panel_id: 9241,
    lat: 1.279008197,
    lng: 103.8386036,
    loc: "300549",
    orientation: "TF",
  },
  {
    panel_id: 10070,
    lat: 1.281545833,
    lng: 103.8408772,
    loc: "300549",
    orientation: "TF",
  },
  {
    panel_id: 4553,
    lat: 1.300442518,
    lng: 103.836238,
    loc: 300597,
    orientation: "TF",
  },
  {
    panel_id: 9976,
    lat: 1.288709768,
    lng: 103.8373728,
    loc: "300549",
    orientation: "TF",
  },
  {
    panel_id: 9905,
    lat: 1.311029814,
    lng: 103.796044,
    loc: "300553",
    orientation: "PF",
  },
  {
    panel_id: 9120,
    lat: 1.371399983,
    lng: 103.8917097,
    loc: 300550,
    orientation: "PF",
  },
  {
    panel_id: 9544,
    lat: 1.3796172,
    lng: 103.7639096,
    loc: "300554",
    orientation: "PF",
  },
  {
    panel_id: 9174,
    lat: 1.334738999,
    lng: 103.740303,
    loc: 300576,
    orientation: "PF",
  },
  {
    panel_id: 9897,
    lat: 1.307091646,
    lng: 103.862197,
    loc: 300597,
    orientation: "PF",
  },
  {
    panel_id: 9142,
    lat: 1.293626774,
    lng: 103.8328385,
    loc: 300549,
    orientation: "TF",
  },
  {
    panel_id: 9981,
    lat: 1.272473333,
    lng: 103.8241878,
    loc: 300549,
    orientation: "TF",
  },
  {
    panel_id: 8945,
    lat: 1.29370722,
    lng: 103.7848914,
    loc: "6193",
    orientation: "TF",
  },
  {
    panel_id: 9041,
    lat: 1.300634446,
    lng: 103.8511401,
    loc: "300597",
    orientation: "TF",
  },
  {
    panel_id: 8904,
    lat: 1.324282923,
    lng: 103.9300363,
    loc: 300544,
    orientation: "TF",
  },
  {
    panel_id: 9924,
    lat: 1.323536453,
    lng: 103.928863,
    loc: 300544,
    orientation: "PF",
  },
  {
    panel_id: 8859,
    lat: 1.289738333,
    lng: 103.8488847,
    loc: "300549",
    orientation: "TF",
  },
  {
    panel_id: 9471,
    lat: 1.296672985,
    lng: 103.8544142,
    loc: 300597,
    orientation: "TF",
  },
  {
    panel_id: 8879,
    lat: 1.298207841,
    lng: 103.8554914,
    loc: "300597",
    orientation: "TF",
  },
  {
    panel_id: 9907,
    lat: 1.306325964,
    lng: 103.7908483,
    loc: 1569846,
    orientation: "PF",
  },
  {
    panel_id: 9514,
    lat: 1.306496986,
    lng: 103.7905812,
    loc: "1569846",
    orientation: "TF",
  },
  {
    panel_id: 9156,
    lat: 1.307517037,
    lng: 103.8850075,
    loc: "6191",
    orientation: "TF",
  },
  {
    panel_id: 9251,
    lat: 1.304536337,
    lng: 103.8290228,
    loc: 300549,
    orientation: "TF",
  },
  {
    panel_id: 2127,
    lat: 1.299309973,
    lng: 103.8452902,
    loc: 300597,
    orientation: "PF",
  },
  {
    panel_id: 9966,
    lat: 1.302113351,
    lng: 103.8343167,
    loc: 300597,
    orientation: "PF",
  },
  {
    panel_id: 6004,
    lat: 1.303237273,
    lng: 103.8325418,
    loc: 300548,
    orientation: "PF",
  },
  {
    panel_id: 10060,
    lat: 1.274814993,
    lng: 103.7967399,
    loc: "300558",
    orientation: "TF",
  },
  {
    panel_id: 10087,
    lat: 1.282780786,
    lng: 103.7821761,
    loc: "6193",
    orientation: "TF",
  },
  {
    panel_id: 9988,
    lat: 1.295215,
    lng: 103.7939239,
    loc: "6193",
    orientation: "PF",
  },
  {
    panel_id: 9991,
    lat: 1.300510831,
    lng: 103.7886429,
    loc: "6193",
    orientation: "TF",
  },
  {
    panel_id: 9146,
    lat: 1.40538071,
    lng: 103.9018667,
    loc: 1569699,
    orientation: "TF",
  },
  {
    panel_id: 10126,
    lat: 1.394494243,
    lng: 103.9120935,
    loc: "300582",
    orientation: "PF",
  },
  {
    panel_id: 9065,
    lat: 1.293509444,
    lng: 103.8427242,
    loc: "300549",
    orientation: "PF",
  },
  {
    panel_id: 9132,
    lat: 1.295751111,
    lng: 103.8360411,
    loc: "300597",
    orientation: "PF",
  },
  {
    panel_id: 9164,
    lat: 1.295931389,
    lng: 103.8393781,
    loc: "300597",
    orientation: "PF",
  },
  {
    panel_id: 10071,
    lat: 1.295911389,
    lng: 103.8362428,
    loc: "300597",
    orientation: "PF",
  },
  {
    panel_id: 10048,
    lat: 1.296169722,
    lng: 103.8325586,
    loc: "300548",
    orientation: "TF",
  },
  {
    panel_id: 9217,
    lat: 1.31133174,
    lng: 103.8368695,
    loc: "300597",
    orientation: "PF",
  },
  {
    panel_id: 8971,
    lat: 1.448031488,
    lng: 103.8189521,
    loc: "300562",
    orientation: "PF",
  },
  {
    panel_id: 9936,
    lat: 1.392339157,
    lng: 103.8960682,
    loc: 300574,
    orientation: "PF",
  },
  {
    panel_id: 9176,
    lat: 1.363982418,
    lng: 103.8657902,
    loc: "1569686",
    orientation: "PF",
  },
  {
    panel_id: 9160,
    lat: 1.340054962,
    lng: 103.9483811,
    loc: "300543",
    orientation: "TF",
  },
  {
    panel_id: 8898,
    lat: 1.320968592,
    lng: 103.9133278,
    loc: "300541",
    orientation: "TF",
  },
  {
    panel_id: 9983,
    lat: 1.346752599,
    lng: 103.9325766,
    loc: "1603557",
    orientation: "PF",
  },
  {
    panel_id: 9150,
    lat: 1.34567356,
    lng: 103.9359504,
    loc: "1603557",
    orientation: "TF",
  },
  {
    panel_id: 10025,
    lat: 1.356127989,
    lng: 103.9535011,
    loc: 1607589,
    orientation: "PF",
  },
  {
    panel_id: 9130,
    lat: 1.307253344,
    lng: 103.8954113,
    loc: "6191",
    orientation: "TF",
  },
  {
    panel_id: 8853,
    lat: 1.292526111,
    lng: 103.8608911,
    loc: 300549,
    orientation: "TF",
  },
  {
    panel_id: 7188,
    lat: 1.293551005,
    lng: 103.8583817,
    loc: 300549,
    orientation: "TF",
  },
  {
    panel_id: 9572,
    lat: 1.3423284,
    lng: 103.8361677,
    loc: "300542",
    orientation: "PF",
  },
  {
    panel_id: 8923,
    lat: 1.331157123,
    lng: 103.8501763,
    loc: "300551",
    orientation: "TF",
  },
  {
    panel_id: 9837,
    lat: 1.286077301,
    lng: 103.8424479,
    loc: "300549",
    orientation: "TF",
  },
  {
    panel_id: 9255,
    lat: 1.286011667,
    lng: 103.8463467,
    loc: "300549",
    orientation: "TF",
  },
  {
    panel_id: 9180,
    lat: 1.331324716,
    lng: 103.8689179,
    loc: "300551",
    orientation: "TF",
  },
  {
    panel_id: 9212,
    lat: 1.36026,
    lng: 103.8853842,
    loc: "1603383",
    orientation: "PF",
  },
  {
    panel_id: 9889,
    lat: 1.370165,
    lng: 103.89536,
    loc: "1603383",
    orientation: "PF",
  },
  {
    panel_id: 9090,
    lat: 1.353626646,
    lng: 103.8342217,
    loc: "300542",
    orientation: "TF",
  },
  {
    panel_id: 10040,
    lat: 1.353078316,
    lng: 103.834364,
    loc: "300542",
    orientation: "PF",
  },
  {
    panel_id: 10116,
    lat: 1.351446817,
    lng: 103.8359107,
    loc: "300542",
    orientation: "TF",
  },
  {
    panel_id: 9992,
    lat: 1.301172975,
    lng: 103.856114,
    loc: "300597",
    orientation: "PF",
  },
  {
    panel_id: 9198,
    lat: 1.300154944,
    lng: 103.8552332,
    loc: 300597,
    orientation: "PF",
  },
  {
    panel_id: 7878,
    lat: 1.296989512,
    lng: 103.853022,
    loc: 300597,
    orientation: "TF",
  },
  {
    panel_id: 8881,
    lat: 1.296848255,
    lng: 103.8525359,
    loc: "300597",
    orientation: "TF",
  },
  {
    panel_id: 9102,
    lat: 1.2985975,
    lng: 103.7634625,
    loc: "300565",
    orientation: "TF",
  },
  {
    panel_id: 9909,
    lat: 1.30415305,
    lng: 103.7645524,
    loc: "300565",
    orientation: "PF",
  },
  {
    panel_id: 9221,
    lat: 1.432081528,
    lng: 103.7745969,
    loc: "300581",
    orientation: "PF",
  },
  {
    panel_id: 10004,
    lat: 1.440886655,
    lng: 103.8001872,
    loc: "300583",
    orientation: "PF",
  },
  {
    panel_id: 9225,
    lat: 1.416254201,
    lng: 103.8325916,
    loc: "1603568",
    orientation: "PF",
  },
  {
    panel_id: 9082,
    lat: 1.294092217,
    lng: 103.8308378,
    loc: "300549",
    orientation: "TF",
  },
];

export default function Page() {
  const API_KEY = "4td2CjWPXL3YI9KXVcWVCZICaAgA2Cov";
  const [curr_weather, setCurrWeather] = useState(null);
  const [curr_orientation, setCurrOrientation] = useState("PF");

  let wet_player = useRef(null);
  let dry_player = useRef(null);
  useEffect(() => {
    setTimeout(() => {
      restartVdo();
    }, 8500);
  }, []);

  const restartVdo = () => {
    if ((wet_player && !wet_player?.current) || (dry_player && !dry_player?.current)) return;
    dry_player.current.currentTime = 0;
    wet_player.current.currentTime = 0;
    dry_player.current.play();
    wet_player.current.play();
    dry_player.current.loop = true;
    wet_player.current.loop = true;
  };
  const stopVdo = () => {
    if (!wet_player || !dry_player) return;
    dry_player.currentTime = 0;
    wet_player.currentTime = 0;
    dry_player.pause();
    wet_player.pause();
  };

  useEffect(() => {
    // Get Panel ID
    document.getElementById("wet-vdo").load();
    document.getElementById("dry-vdo").load();
    const urlParams = new URLSearchParams(window.location.search);
    let curr_panel = urlParams.get("panel");
    Start(curr_panel);
  }, []);

  const Start = async (curr_panel) => {
    // get loc key & orientation
    let loc = getAccuKey(curr_panel);
    let fifteen_mins_interval = 1000 * 60 * 15;
    fetchFirst(loc);
    setInterval(() => {
      fetchWeather(loc).then((weather) => {
        setCurrWeather(weather);
      });
    }, fifteen_mins_interval);
  };

  const fetchFirst = async (loc) => {
    let weather = await fetchWeather(loc);
    setCurrWeather(weather);
  };
  const getAccuKey = (curr_panel) => {
    if (!curr_panel) {
      alert("Panel ID is needed!");
    }
    let accu_key = panel_data.filter((panel) => panel.panel_id == curr_panel);
    let loc = panel_data[0].loc;
    if (accu_key.length == 0) {
      alert("Valid Panel ID is needed!");
    } else {
      loc = accu_key[0].loc;
      setCurrOrientation(accu_key[0].orientation);
    }
    return loc;
  };

  const fetchWeather = async (loc) => {
    let weather_conditions = await axios.get(`https://dataservice.accuweather.com/currentconditions/v1/${loc}?apikey=${API_KEY}`);
    return weather_conditions.data[0];
  };
  const checkWeather = (curr_orientation, curr_weather, type) => {
    let is_rain = Boolean(curr_weather?.PrecipitationType);
    if (curr_orientation == "PF" && is_rain && type == "wet-vdo") {
      return "block";
    } else if (curr_orientation == "PF" && !is_rain && type == "dry-vdo") {
      return "block";
    } else if (curr_orientation != "PF" && is_rain && type == "wet-img") {
      return "block";
    } else if (curr_orientation != "PF" && !is_rain && type == "dry-img") {
      return "block";
    }
    return "none";
  };
  //
  return (
    <div>
      <video ref={wet_player} loop muted style={{ display: checkWeather(curr_orientation, curr_weather, "wet-vdo"), width: "-webkit-fill-available" }} id="wet-vdo">
        <source src={WetVdo} type="video/mp4" />
      </video>

      <video loop ref={dry_player} muted style={{ display: checkWeather(curr_orientation, curr_weather, "dry-vdo"), width: "-webkit-fill-available" }} id="dry-vdo">
        <source src={DryVdo} type="video/mp4" />
      </video>
      <img src={WetImg} style={{ display: checkWeather(curr_orientation, curr_weather, "wet-img") }} alt="Wet Img" />
      <img src={DryImg} style={{ display: checkWeather(curr_orientation, curr_weather, "dry-img") }} alt="Dry Img" />
    </div>
  );
}
