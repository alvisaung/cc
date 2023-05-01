import React, { Component} from "react";
import Granim from "react-granim";
import './NetsBat.css'
import axios from "axios";
import { Fragment } from "react";
class NetsBat extends Component {
   panels = [
      { panelId: 3017, busStopId: 54248 ,busCarNo:74},//
      { panelId: 2034, busStopId: 1629 ,busCarNo:57},//
      { panelId: 2035, busStopId: 1619 ,busCarNo:100},//
      { panelId: 3052, busStopId: 53239 ,busCarNo:50},//
      { panelId: 3066, busStopId: 53229,busCarNo:52 },
      { panelId: 2081, busStopId: 8069 ,busCarNo:857},
      { panelId: 2082, busStopId: 2049 ,busCarNo:77},//
      { panelId: 5061, busStopId: 43391 ,busCarNo:173},//
      { panelId: 5130, busStopId: 41021 ,busCarNo:151},
      { panelId: 5118, busStopId: 41041 ,busCarNo:151},
      { panelId: 5114, busStopId: 40011 ,busCarNo:48},//
      { panelId: 7084, busStopId: 44539 ,busCarNo:190},
      { panelId: 5144, busStopId: 5319 ,busCarNo:186},
      { panelId: 5149, busStopId: 4329 ,busCarNo:64},//
      { panelId: 6056, busStopId: 17239 ,busCarNo:14},//
      { panelId: 5173, busStopId: 3019 ,busCarNo:10},//
      { panelId: 6086, busStopId: 17179 ,busCarNo:52},
      { panelId: 6102, busStopId: 19031 ,busCarNo:14},//
      { panelId: 6085, busStopId: 17171 ,busCarNo:52},
      { panelId: 5175, busStopId: 3041 ,busCarNo:186},
      { panelId: 5193, busStopId: 41079,busCarNo:151 },
      { panelId: 5204, busStopId: 10018 ,busCarNo:61},//
      { panelId: 6150, busStopId: 11419 ,busCarNo:61},//
      { panelId: 5317, busStopId: 28301 ,busCarNo:66},//
      { panelId: 9035, busStopId: 1311 ,busCarNo:61},//
      { panelId: 3261, busStopId: 53121 ,busCarNo:54},//
      { panelId: 5393, busStopId: 5039 ,busCarNo:124},//
      { panelId: 1222, busStopId: 84031 ,busCarNo:2},//
      { panelId: 1223, busStopId: 84039 ,busCarNo:2},//
      { panelId: 2260, busStopId: 80159 ,busCarNo:10},//
      { panelId: 6227, busStopId: 11361 ,busCarNo:74},//
      { panelId: 5406, busStopId: 9022 ,busCarNo:77},//
      { panelId: 5414, busStopId: 8041 ,busCarNo:190},
      { panelId: 5418, busStopId: 9011 ,busCarNo:124},//
      { panelId: 5560, busStopId: 8031 ,busCarNo:190},
      { panelId: 2276, busStopId: 8079 ,busCarNo:857},
      { panelId: 3289, busStopId: 65259 ,busCarNo:381},//
      { panelId: 5441, busStopId: 4211 ,busCarNo:32},//
      { panelId: 5454, busStopId: 3111 ,busCarNo:10},//
      { panelId: 5452, busStopId: 3071 ,busCarNo:10},//
      { panelId: 2291, busStopId: 7551 ,busCarNo:48},//
      { panelId: 4178, busStopId: 58251 ,busCarNo:117},//
      { panelId: 3341, busStopId: 67409 ,busCarNo:50},//
      { panelId: 2317, busStopId: 66271 ,busCarNo:73},//
      { panelId: 2360, busStopId: 83062 ,busCarNo:854},
      { panelId: 5491, busStopId: 5199 ,busCarNo:80},
      { panelId: 5495, busStopId: 4121 ,busCarNo:190},
      { panelId: 2388, busStopId: 7539 ,busCarNo:48},//
      { panelId: 1374, busStopId: 75221 ,busCarNo:8},//
      { panelId: 6355, busStopId: 5419 ,busCarNo:80},
      { panelId: 6387, busStopId: 14141 ,busCarNo:80},
      { panelId: 3395, busStopId: 52509 ,busCarNo:506},
      { panelId: 5498, busStopId: 28659 ,busCarNo:52},
      { panelId: 5545, busStopId: 5129 ,busCarNo:186},
      { panelId: 2466, busStopId: 63031 ,busCarNo:80},
      { panelId: 2472, busStopId: 1019 ,busCarNo:2},//
      { panelId: 2470, busStopId: 1113 ,busCarNo:2},//
      { panelId: 2474, busStopId: 1112 ,busCarNo:80},
      { panelId: 2471, busStopId: 1012 ,busCarNo:2},//
      { panelId: 3477, busStopId: 59079 ,busCarNo:169},
   ];
   constructor(props) {
      super(props);
      this.state = {

         number_of_people: 0,
         loading: true,
         data:[],
         service:[],
         busStop_id:null,
         bus_time:[],
         bus_time2:[],
         bus_time3:[],
         bus_no:[],
         timer:60,
         addTime:60,
         requiredBusNo:null
      }
   }
   componentDidMount() {
      const urlParams = new URLSearchParams(window.location.search);
      let panelId = urlParams.get("panel_id");
      // setInterval(() => {
      this.retrieveAccuId(panelId);
      // }, 30000);
   }

   retrieveAccuId = panelId => {
      this.panels.map((panel) => {
         if (panelId == panel.panelId) {
            this.setState({ busStop_id: panel.busStopId ,busCarNo: panel.busCarNo}, () => {
               this.fetchBus()
            });
         }
      });
   };
   fetchBus = () => {
      axios
      .get(
         `https://api.cc.quanterdynamic.com/api/nets-bat?busStopId=${this.state.busStop_id}`

      )
      .then(res => {
         const data = res.data;
         // console.log(data)
         this.setState({ data });
         this.showTime();
      });
   };
   timeIntervalOne=()=>{
         let localHour= new Date().toLocaleString()
         let localHour2= new Date(localHour)
         var localMinute=localHour2.getMinutes()
         var localSecond=localHour2.getSeconds()

               if(localMinute===19 && localSecond===0)
               {
                  this.addThree();
               }
               if(localMinute===20 && localSecond===0)
               {
                  this.addThree();
               }
   }
   addOne=()=>{
      this.setState({timer:100})
      this.setState({addTime:100})
   }
   addTwo=()=>{
      this.setState({timer:500})
      this.setState({addTime:500})
   }
   addThree=()=>{
      this.setState({timer:60})
      this.setState({addTime:60})

   }
   showTime=()=>{
      let bus_time =[]
      let bus_time2 =[]
      let bus_time3 =[]
      let bus_no=[]


      let {data} =this.state
      let service=data.Services
      // console.log(service)
      service.map((service,i)=>{

         let localTime= new Date().toLocaleString()
         let localTime2= new Date(localTime)

         let rtcTimestamp2= localTime2.getTime()/1000;
         // console.log("Line No",service.ServiceNo)
         // console.log("Require Line no",this.state.busCarNo)

         if(service.ServiceNo==this.state.busCarNo)
         {
            this.setState({requiredBusNo:i})
            // console.log("req line no index",this.state.requiredBusNo)

         }
         bus_no.push(service.ServiceNo)

         let firstBusChangedDate = new Date(service.NextBus.EstimatedArrival);
         let firstBusTimeStamp = firstBusChangedDate.getTime()/1000
         let remainTimeStamp=firstBusTimeStamp-rtcTimestamp2
         //  console.log("b1",remainTimeStamp)
         bus_time.push(remainTimeStamp)

         let secondBusChangedDate = new Date(service.NextBus2.EstimatedArrival);
         let secondBusTimeStamp = secondBusChangedDate.getTime()/1000
         let remainTimeStamp2=secondBusTimeStamp-rtcTimestamp2
         //  console.log("b2",remainTimeStamp2)

         bus_time2.push(remainTimeStamp2)

         let thirdBusChangedDate = new Date(service.NextBus3.EstimatedArrival);
         let thirdBusTimeStamp = thirdBusChangedDate.getTime()/1000
         //  console.log("ttttt",rtcTimestamp2)
         let remainTimeStamp3=thirdBusTimeStamp-rtcTimestamp2
         //  console.log("b3",remainTimeStamp3)


         bus_time3.push(remainTimeStamp3)

      })
      this.setState({ bus_no})

      this.timerInterval=setInterval(()=>{
         this.timeIntervalOne()
         let { timer } = this.state
         this.setState({ timer: timer - 1 })

         // console.log(this.state.timer)

         if(this.state.timer <= 0 ) {
            clearInterval(this.timerInterval)
            this.fetchBus()
            this.setState({timer:this.state.addTime})
         }
         service.map((service,i)=>{
            let localTime= new Date().toLocaleString()
            let localTime2= new Date(localTime)

            let rtcTimestamp= localTime2.getTime()/1000;
            let firstBusChangedDate = new Date(service.NextBus.EstimatedArrival);
            let firstBusTimeStamp = firstBusChangedDate.getTime()/1000
            let remainTimeStamp=firstBusTimeStamp-rtcTimestamp
            //   console.log("b1",remainTimeStamp)

            let secondBusChangedDate = new Date(service.NextBus2.EstimatedArrival);
            let secondBusTimeStamp = secondBusChangedDate.getTime()/1000
            let remainTimeStamp2=secondBusTimeStamp-rtcTimestamp
            //   console.log("b2",remainTimeStamp2)

            let thirdBusChangedDate = new Date(service.NextBus3.EstimatedArrival);
            let thirdBusTimeStamp = thirdBusChangedDate.getTime()/1000
            let remainTimeStamp3=thirdBusTimeStamp-rtcTimestamp
            //  console.log("b3",remainTimeStamp3)

            // if(remainTimeStamp<0 && remainTimeStamp >-60)
            // {
            //    console.log(remainTimeStamp,"of  fff",i)

            //    remainTimeStamp=remainTimeStamp+120;

            //    console.log(remainTimeStamp,"of",i)

            //    bus_time[i]=remainTimeStamp
            //    bus_time2[i]=remainTimeStamp2
            //    bus_time3[i]=remainTimeStamp3
            // }

               bus_time3[i]=remainTimeStamp3
               bus_time2[i]=remainTimeStamp2
               bus_time[i]=remainTimeStamp



            // if(remainTimeStamp2<0 && remainTimeStamp<0)
            // {
            //    remainTimeStamp=remainTimeStamp3
            //    bus_time[i]=remainTimeStamp
            //    remainTimeStamp2="remainTimeStamp2"
            //    // remainTimeStamp2=0
            //    bus_time2[i]=remainTimeStamp2
            //    remainTimeStamp3="remainTimeStamp3"
            //    // remainTimeStamp3=0
            //    bus_time3[i]=remainTimeStamp3

            // }
            // else{
            //    bus_time2[i]=remainTimeStamp2
            // }


            // if(remainTimeStamp<0)
            // {
            //    remainTimeStamp=remainTimeStamp2
            //    bus_time[i]=remainTimeStamp
            //    remainTimeStamp2=remainTimeStamp3
            //    bus_time2[i]=remainTimeStamp2
            //    remainTimeStamp3="arrived"
            //    // remainTimeStamp3=""
            //    bus_time3[i]=remainTimeStamp3
            // }
            // else{
            //    bus_time[i]=remainTimeStamp
            // }
         })

         this.setState({bus_time,bus_time3,bus_time2})
         //  console.log("bt",this.state.bus_time,this.state.bus_time2,this.state.bus_time3)
      },1000);

   }

   render() {
      const {bus_no,bus_time3,bus_time2,bus_time,busCarNo,requiredBusNo} = this.state


      let m1 =Math.floor(bus_time[requiredBusNo] / 60);

      return(
         <div className="app">
         {bus_no.length>0 ?
               <div className="home">
                  {m1>0?
                     <div className="bus-number"><p className="bus-number-p">BUS {busCarNo} ARRIVES IN</p></div>
                     :
                     <div className="bus-number-arr"><p className="bus-number-arr-p">BUS {busCarNo} IS</p></div>
                  }
                  {m1>0?
                     <div className="bus-time"><p className="bus-time-p">{m1} MINUTES</p></div>
                     :
                     <div className="bus-time-arr"><p className="bus-time-arr-p">ARRIVING</p></div>
                  }
               </div>
               // bus_no.map((busno,i)=>{
               //    let h1= Math.floor(bus_time[i] / 3600);
               //    let m1 =Math.floor(bus_time[i] / 60);
               //    let s1= Math.floor(bus_time[i] -m1 * 60);

               //    let h2= Math.floor(bus_time2[i] / 3600);
               //    let m2 =Math.floor(bus_time2[i] / 60);
               //    let s2= Math.floor(bus_time2[i] -m2 * 60);

               //    let h3= Math.floor(bus_time3[i] / 3600);
               //    let m3 =Math.floor(bus_time3[i] / 60);
               //    let s3= Math.floor(bus_time3[i] -m3 * 60);
               //    return(
               //       // <Fragment key={i}>
               //       //    <div className="time-group">
               //       //       <div className="time">Bus-line-{busno}<br/></div>
               //       //       <div id={`time_1_${i}`} className="time">First bus will arrive in {h1}:{m1}:{s1}<br/></div>
               //       //       {!isNaN(h2) &&
               //       //       <div id={`time_2_${i}`} className="time">Second bus will arrive in {h2}:{m2}:{s2}<br/></div>
               //       //       }
               //       //       {!isNaN(h3) &&
               //       //       <div id={`time_3_${i}`} className="time">Third bus will arrive in {h3}:{m3}:{s3}<br/></div>
               //       //       }
               //       //    </div>
               //       // </Fragment>


               //    )

               // })
               :
               <div className="hello">Hello</div>
            }

         </div>
      )

   }

}

export default NetsBat
