<template>
  <div id="app" class="md-layout">
    <swiper :options="swiperOption" 
      class="md-layout-item md-xsmall-size-95 md-small-size-75 md-medium-size-55 md-large-size-45 md-size-30 md-alignment-center-center" 
      style="height:100vh" v-if="sensorData.length>0" ref='mySwiper'>
        <swiper-slide>
          <homePage :sensor="sensorData" @getIndex="getIndex"> </homePage>
        </swiper-slide>
        <swiper-slide>
          <weatherPage> </weatherPage>
        </swiper-slide>
        <swiper-slide>
          <page :sensor1='sensorData[0]' color='#1e88e5' chartId="chart0"/>
        </swiper-slide>
        <swiper-slide >
          <page :sensor1='sensorData[1]' color='#795548' chartId="chart1" />
        </swiper-slide>
        <swiper-slide>
          <page :sensor1='sensorData[2]' color='#00796b'chartId="chart2" />
        </swiper-slide>
        <swiper-slide>
          <page :sensor1='sensorData[6]' color='#2196F3' />
        </swiper-slide>
        <div class="swiper-scrollbar"  slot="scrollbar"></div>
    </swiper>
  </div>
</template>

<script>
 import page from './components/page.vue'
 import weatherPage from './components/weatherPage.vue'
 import homePage from './components/homePage.vue'
 import {userData} from './main.js'
 import Vue from 'vue'
export default {
  name: 'app',
  data(){
    return{
      swiperOption:{
        speed:1000,
        notNextTick: true,
        spaceBetween: 1,
        scrollbar: {
          el: '.swiper-scrollbar',
          draggable: true,
        },
         on:{
            doubleTap: function(event){
              this.slideTo(0)
            },
          },
      },
      sensorData:[],
    }
  },
  components:{
    page,weatherPage,homePage
  },
  methods:{
     getIndex:function(index){
       this.swiper.slideTo(index+2);//跳转
     }
  },
  computed:{
    swiper(){
      if(this.$refs.mySwiper!=undefined)
       return this.$refs.mySwiper.swiper;
    }
  },
  updated:function(){
  },
  mounted:function(){
    	Vue.axios({
				method:'post',
				url:'/apis/tlink_interface/api/device/queryDevicesInfo.htm',
				data:JSON.stringify({"userId": userData.userid,"deviceId": userData.deviceid})
				}).then(res=>{
          this.sensorData=res.data.device.sensorsList;
				}).catch(function(err){
					console.log(err)
			})
  }
}
</script>
 
<style>

</style>
