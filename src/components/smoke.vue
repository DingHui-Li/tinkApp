<template>
  <div>
      <div class="fog__img" :style="fog__imgFirst"></div>
      <div class="fog__img" :style="fog__imgSecond"></div>
  </div>
  </template>
<script>
export default {
  name:'smoke',
  data(){
    return{
      fog__imgFirst: {
					background: 'url('+require("./img/fog-1.png")+") repeat-x" ,
					backgroundSize: 'contain',
					backgroundPosition: 'center',
					animation:' marquee 60s linear infinite'
					},
				fog__imgSecond :{
					background:'url('+require("./img/fog-2.png")+") repeat-x",
					'background-size': 'contain',
					'background-position': 'center',
					animation: 'marquee 40s linear infinite'
				}
    }
  }
}
</script>

<style>
  .fog__img {
    position: absolute;
    height: 100vh;
    width: 300vw;
  }
  @keyframes marquee {
    0% {
      -webkit-transform: translate3d(0, 0, 0);
              transform: translate3d(0, 0, 0);
    }
    100% {
      -webkit-transform: translate3d(-200vw, 0, 0);
              transform: translate3d(-200vw, 0, 0);
    }
  }
</style>


