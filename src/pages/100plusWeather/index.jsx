import React from "react";
import axios from "axios";
import "./index.css";
class Weather extends React.Component {
  API_KEY = "4td2CjWPXL3YI9KXVcWVCZICaAgA2Cov";
  dayRefreshInterval;
  nightRefreshInterval;
  dayTimeMins = 600000;
  nightTimeMins = 1800000;
  time = new Date();
  panels = [
    { panelId: 9215, nearAccu: 1605071 },
    { panelId: 10094, nearAccu: 1605056 },
    { panelId: 9045, nearAccu: 1605009 },
    { panelId: 9154, nearAccu: 1605079 },
    { panelId: 6419, nearAccu: 1605079 },
    { panelId: 10067, nearAccu: 1605009 }, //
    { panelId: 10066, nearAccu: 1604989 },
    { panelId: 9110, nearAccu: 1569687 },
    { panelId: 8898, nearAccu: 1605071 }, //
    { panelId: 9104, nearAccu: 300546 },
    { panelId: 10097, nearAccu: 1603554 },
    { panelId: 9893, nearAccu: 1603343 }, //need
    { panelId: 10095, nearAccu: 1613209 },
    { panelId: 9940, nearAccu: 1569840 },
    { panelId: 9572, nearAccu: 1603556 },
    { panelId: 9227, nearAccu: 300551 },
    { panelId: 8923, nearAccu: 300551 },
    { panelId: 9180, nearAccu: 1603554 },
    { panelId: 8981, nearAccu: 1603568 },
    { panelId: 9544, nearAccu: 300554 },
    { panelId: 10098, nearAccu: 1569796 },
    { panelId: 10004, nearAccu: 1569720 },
    { panelId: 2796, nearAccu: 1569662 },
    { panelId: 9088, nearAccu: 1569687 },
    { panelId: 9610, nearAccu: 1603344 },
    { panelId: 9737, nearAccu: 1605009 },
    { panelId: 9029, nearAccu: 1605012 },
    { panelId: 9237, nearAccu: 1605012 },
    { panelId: 9035, nearAccu: 1605012 },
    { panelId: 8845, nearAccu: 1605071 }, //need
    { panelId: 9241, nearAccu: 1603503 },
    { panelId: 10070, nearAccu: 1603503 },
    { panelId: 10046, nearAccu: 1604993 },
    { panelId: 9498, nearAccu: 6193 },
    { panelId: 8911, nearAccu: 1569704 }, //up to here
    { panelId: 9055, nearAccu: 1604989 }, //need
    { panelId: 10021, nearAccu: 1605012 },
    { panelId: 9047, nearAccu: 1604961 }, //n
    { panelId: 10076, nearAccu: 1569673 },
    { panelId: 2490, nearAccu: 1569659 }, //n
    { panelId: 9977, nearAccu: 1604993 },
    { panelId: 8999, nearAccu: 1604961 },
    { panelId: 10078, nearAccu: 1605009 },
    { panelId: 9053, nearAccu: 1605012 },
    { panelId: 9484, nearAccu: 1605012 },
    { panelId: 9255, nearAccu: 1605012 },
    { panelId: 10075, nearAccu: 1604993 },
    { panelId: 10092, nearAccu: 1569671 },
    { panelId: 9561, nearAccu: 1569667 },
    { panelId: 9903, nearAccu: 1569662 },
    { panelId: 9219, nearAccu: 1569716 },
    { panelId: 8955, nearAccu: 6193 },
    { panelId: 10117, nearAccu: 1569667 },
    { panelId: 10069, nearAccu: 1603503 },
    { panelId: 9981, nearAccu: 1569673 },
    { panelId: 9514, nearAccu: 6193 },
    { panelId: 9253, nearAccu: 1603503 },
    { panelId: 9988, nearAccu: 1569667 },
    { panelId: 10091, nearAccu: 1569850 },
    { panelId: 9994, nearAccu: 1569731 },
    { panelId: 9474, nearAccu: 1569662 },
    { panelId: 9078, nearAccu: 1569673 },
    { panelId: 9182, nearAccu: 1603344 },
    { panelId: 9948, nearAccu: 1610322 },
    { panelId: 8953, nearAccu: 1610322 },
    { panelId: 9094, nearAccu: 300571 },
    { panelId: 9912, nearAccu: 300577 },
    { panelId: 9100, nearAccu: 300577 },
    { panelId: 9476, nearAccu: 1605012 },
    { panelId: 9897, nearAccu: 6191 }
  ];
  state = {
    accuId: null,
    data: null
  };
  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    let panelId = urlParams.get("panel_id");
    let hour = this.time.getHours();
    this.retrieveAccuId(panelId);
    if (hour >= 6 && hour <= 18) {
      this.dayRefresh(panelId);
    } else {
      this.nightRefresh(panelId);
    }
  }
  dayRefresh = panelId => {
    clearInterval(this.nightRefreshInterval);
    this.dayRefreshInterval = setInterval(() => {
      let hour = this.time.getHours();
      if (hour < 6 || hour > 18) {
        this.nightRefresh(panelId);
      }
      this.retrieveAccuId(panelId);
    }, this.dayTimeMins);
  };
  nightRefresh = panelId => {
    clearInterval(this.dayRefreshInterval);

    this.nightRefreshInterval = setInterval(() => {
      let hour = this.time.getHours();
      if (hour >= 6 && hour <= 18) {
        this.dayRefresh(panelId);
      }

      this.retrieveAccuId(panelId);
    }, this.nightTimeMins);
  };
  fetchWeather = () => {
    axios
      .get(
        `https://dataservice.accuweather.com/currentconditions/v1/${this.state.accuId}?apikey=${this.API_KEY}`
      )
      .then(res => {
        const data = res.data;
        this.setState({ data });
      });
  };
  retrieveAccuId = panelId => {
    this.panels.map(panel => {
      if (panelId == panel.panelId) {
        console.log(panel.nearAccu);
        this.setState({ accuId: panel.nearAccu }, () => {
          this.fetchWeather();
        });
      }
    });
  };
  render() {
    console.log(this.state.data);

    if (!this.state.data) {
      return (
        <div className="spin">
          <img src={`${image_url}Spin.gif`} alt="spin" />
        </div>
      );
    }
    const Metric = this.state.data[0].Temperature.Metric.Value;
    const { WeatherText } = this.state.data;
    if (
      WeatherText === "Sunny" ||
      WeatherText === "Mostly Sunny" ||
      WeatherText === "Partly Sunny" ||
      WeatherText === "Intermittent Clouds" ||
      WeatherText === "Hazy Sunshine" ||
      WeatherText === "Mostly Cloudy" ||
      WeatherText === "Hot" ||
      WeatherText === "Partly Sunny w/ Showers" ||
      WeatherText === "Partly Sunny w/ T-Storms" ||
      WeatherText === "Partly Sunny w/ Flurries"
    ) {
      return (
        <div>
          <img src={`${image_url}background-3.png`} />
          <div className="temp">{Metric}˚C</div>
        </div>
      );
    } else if (
      WeatherText === "Cold" ||
      WeatherText === "Windy" ||
      WeatherText === "Clear" ||
      WeatherText === "Rain and Snow" ||
      WeatherText === "Freezing Rain" ||
      WeatherText === "Sleet" ||
      WeatherText === "Ice" ||
      WeatherText === "Rain" ||
      WeatherText === "Showers" ||
      WeatherText === "Ice" ||
      WeatherText === "Snow" ||
      WeatherText === "Dreary (Overcast)" ||
      WeatherText === "Partly Cloudy w/ T-Storms" ||
      WeatherText === "Mostly Cloudy w/ T-Storms"
    ) {
      return (
        <div>
          <img src={`${image_url}background-1.png`} />
          <div className="temp">{Metric}˚C</div>
        </div>
      );
    } else {
      return (
        <div>
          <img src={`${image_url}background-2.png`} />
          <div className="temp">{Metric}˚C</div>
        </div>
      );
    }
  }
}

const image_url =
  "https://assets.cc.quanterdynamic.com/images/100plus-weather/";

export default Weather;
