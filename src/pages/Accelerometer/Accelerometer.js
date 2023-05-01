import React, { Component, Fragment } from "react";
import { TweenLite, TimelineMax } from "gsap";


class Accelerometer extends Component {


   componentDidMount() {
      window.addEventListener('deviceorientation', function (event) {
         console.log('event')
      }, false)
      // if (window.DeviceOrientationEvent) {
      //    // alert('device orientation')
      //    console.log('device orientation')
      //    document.addEventListener("deviceorientation", this.tilt)
      // } else if (window.DeviceMotionEvent) {
      //    alert('device motion')
      //    window.addEventListener('devicemotion', function (event) {
      //       this.tilt([event.acceleration.x * 2, event.acceleration.y * 2]);
      //    }, true);
      // } else {
      //    alert('nothing')
      //    window.addEventListener("MozOrientation", function (orientation) {
      //       this.tilt([orientation.x * 50, orientation.y * 50]);
      //    }, true);
      // }
   }

   tilt = () => {
      alert('tilt')
      // console.log('tile')
   }

   render(){
      return(
         <div>

         </div>
      )
   }

}

export default Accelerometer
