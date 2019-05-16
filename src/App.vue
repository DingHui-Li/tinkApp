<template>
  <div id="app" class="md-layout">
    <swiper :options="swiperOption" 
      class="md-layout-item md-xsmall-size-95 md-small-size-75 md-medium-size-55 md-large-size-45 md-size-30 md-alignment-center-center" 
      style="height:100vh;" v-if="sensorData.length>0" ref='mySwiper'>
        <swiper-slide>
          <homePage :sensor="sensorData" @getIndex="getIndex"> </homePage>
        </swiper-slide>
        <swiper-slide>
          <weatherPage> </weatherPage>
        </swiper-slide>
        <swiper-slide v-for="(d,index) in sensorData.filter((item,index)=>index!=7&&index!=8&&index!=9)" :key="index">
          <page :sensor1='d' :color='cardColor(index)' :chartId='"chart"+index'/>
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
        speed:400,
        // grabCursor:true,
        notNextTick: true,
        spaceBetween: 1,
        grabCursor : true,
        scrollbar: {
          el: '.swiper-scrollbar',
          draggable: true,
        },
         on:{
            doubleTap: function(event){
              this.slideTo(0,1500)
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
       M.toast({html: '双击返回列表',classes:'toast',displayLength:1000});
       this.swiper.slideTo(index+2,1500);//跳转
     },
    cardColor:function(index){
      if(index==0)return '#1e88e5';
      else if(index==1) return '#795548';
      else if(index==2) return '#00796b';
      else if(index==3) return '#536DFE';
      else if(index==4) return '#212121';
      else if(index==5) return '#009688';
      else if(index==6) return '#0097A7';
      else if(index==10) return '#795548';
      else return '#00796b';
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
   
    	Vue.axios({//获取传感器列表
				method:'post',
				url:'/apis/tlink_interface/api/device/queryDevicesIndex.htm',
				data:JSON.stringify({"userId": userData.userid,"deviceId": userData.deviceid})
				}).then(res=>{
          this.sensorData=res.data.deviceList[0].sensorList;
				}).catch(function(err){
					console.log(err)
      })
      // Vue.axios({//获取触发器列表
      //   method:'post',
      //   url:'apis/tlink_interface/api/alarms/queryAlarms.htm',
      //   data:JSON.stringify({"userId": userData.userid,'deviceId':userData.deviceid})
      // }).then(res=>{
      //     if(res.data.flag==00){

      //     }
      //   })
  }
}
</script>
 
<style>
  .toast{
    background-color:#4CAF50;
    color:#fff;
  }
</style>
