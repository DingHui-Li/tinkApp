<template>
	<div class="md-layout md-alignment-center-center" style="margin:10px 10px 0 10px" >
		<div :class="['md-layout-item','md-size-100','md-layout','md-alignment-center-center',windowSize>599?'md-elevation-2':'']" :style="[cardStyle]">	
				<!-- 天气信息 -->
			<swiper :options="swiperOpt" style="height:100%;width:100%">
				<swiper-slide style="height:20%;">
					<div class="md-layout md-layout-item md-size-100 md-alignment-center-center" @click="click(-1)" v-if="weatherData.length>0" 
							style="font-size:1.5rem;border-radius:5px;height:100%;color:#757575">
						<div class="md-layout md-layout-item md-size-50 md-alignment-center-center"  style="height:100%">
							<weatherIcon :cond_code="weatherData[0].now.cond_code"/>
						</div>	
						<div class="md-layout md-layout-item md-size-50 md-alignment-center-left" style="height:100%;">
							<div class="md-layout md-layout-item md-size-100 md-alignment-center-center" style="height:100%;">
								<div class="md-layout md-layout-item md-size-100 md-alignment-bottom-left" style="height:50%;">
									{{weatherData[0].basic.location}}
								</div>
								<div class="md-layout md-layout-item md-size-100 md-alignment-center-left" style="height:50%;">
									<div class="md-layout md-layout-item md-size-50 md-alignment-center-left">
										{{weatherData[0].now.cond_txt}}
									</div>
									<div class="md-layout md-layout-item md-size-50 md-alignment-center-left">
										{{weatherData[0].now.tmp}}℃
									</div>	
								</div>
							</div>
						</div>
					</div>
				</swiper-slide>
				<swiper-slide v-for="(d,index) in sensor.filter((item,index)=>index!=7&&index!=8&&index!=9)" :key="d.sensorId" style="height:20%;">
				<div class="md-layout-item md-size-100 sensorList md-layout  md-alignment-center-center" style="height:85%;">
					<div :class="cardItemClass"     @click="click(index)" style="margin-top:20px;">
						<div class="md-layout md-layout-item md-size-95 md-alignment-center-center" style="background-color:white;height:100%;border-radius:10px;">
							<div class="md-layout md-layout-item md-size-40 md-alignment-center-center" style="height:100%">
								<!-- 传感器名 -->
								<div class="md-layout md-layout-item md-size-100 md-alignment-bottom-center" style="height:50%;">
										{{d.sensorName}}
								</div>
								<!-- 在线 -->
								<div class="md-layout md-layout-item md-size-100 md-alignment-center-center" style="height:50%;">
									<div class="isLine" :style="{'background-color':d.isLine=='1'?'#4CAF50':'#F44336'}" ></div><span class="isLineTip">{{d.isLine=='1'?'在线':'离线'}}</span>
								</div>
							</div>
							<div class="md-layout md-layout-item md-size-40 md-alignment-center-center" style="height:100%;">
								<!-- 值 -->
											<!-- 数值型 -->
								<div class="md-layout md-layout-item md-size-100 md-alignment-bottom-center" style="height:50%;" v-if="d.sensorType==1">
										{{d.value}}{{d.unit}}
								</div>
											<!-- 开关型 -->
								<div class="md-layout md-layout-item md-size-100 md-alignment-bottom-center" style="height:50%;" v-else-if="d.sensorType==2">
									<md-switch v-model="switcher1" class="md-primary" style="margin:0"></md-switch>
								</div>
											<!-- 状态型 -->
								<div class="md-layout md-layout-item md-size-100 md-alignment-bottom-center" style="height:50%;" v-else-if="d.sensorType==5">
										<md-switch v-model="switcher" :switcher="switched(d.switcher)" class="md-primary" style="margin:0"></md-switch>
								</div>
								<!-- 更新时间 -->
								<div class="md-layout md-layout-item md-size-100 md-alignment-center-center" style="height:50%;font-size:0.7rem;">
									<div>
										<img :src="require('../assets/update.png')" style="height:15px;width:15px;margin-right:5px"> {{d.updateDateTime.split(" ")[0]}}
										<md-tooltip md-direction="top" style="color:white">上次更新：{{d.updateDateTime}}</md-tooltip>
									</div>
								</div>
							</div>
							<!-- 箭头图标 -->
							<div class="md-layout md-layout-item md-size-20 md-alignment-center-center">
								<img class="md-layout md-layout-item md-size-30 md-alignment-center-center" :src="require('../assets/arrow.png')"/>
							</div>
						</div>
					</div>
				</div>
				<!-- 底部链接 -->
				<!-- <div class="md-layout-item md-size-100 md-alignment-bottom-right" style="height:5%;">
					<div class="md-layout md-layout-item md-size-100 md-alignment-bottom-center" style="height:100%">
						<img style="height:15px;margin-right:5px" :src="require('../assets/github.png')"/>
						<a href="https://github.com/DingHui-Li/tinkApp" style="color:#4CAF50;font-size:0.7rem">https://github.com/DingHui-Li/tinkApp</a>
					</div>
				</div> -->
				</swiper-slide>
			</swiper>
		</div>
  </div>
</template>
<script>
import Vue from "vue"
import weatherIcon from './weatherIcon.vue'
export default {
	name:'homePage',
	props:['sensor'],
	components:{weatherIcon},
	data(){
		return{
			cardStyle:{
					height:'95vh',
					margin: 0,
					borderRadius:'10px',
					// backgroundColor:this.windowSize>599?'#fff':'#e0e0e0',
					backgroundImageRepeat:'no-repeat',
					backgroundImageSize:'100% 100%',
			},
			cardItemClass:[
				'md-layout',
				'md-layout-item',
				'md-size-100',
				'md-small-size-100',
				'md-alignment-center-center',
				'item',
			],
			weatherData:[],
			swiperOpt:{
				grabCursor : true,
				direction: 'vertical',
				freeMode: true,
				slidesPerView: 'auto',
				scrollbar: {
					el: '.swiper-scrollbar'
				},
				mousewheel: true
			},
			switcher:true,
			switcher1:this.sensor[6].switcher==1?true:false
		}
	},
	computed:{
		windowSize:function(){
			return document.body.clientWidth;
		}
	},
	methods:{
		click:function(index){
			this.$emit('getIndex',index)
		},
		getNow:function(){
			Vue.axios({
				method:'get',
				url:'https://free-api.heweather.net/s6/weather/now?location=auto_ip&key=e6757104a7154b6f89568d65b43c751d'
				}).then(res=>{
					this.weatherData=[];
					this.weatherData.push(res.data.HeWeather6[0]);
				})	
		},
		switched:function(switched){
			if(switched==0) this.switcher=false;
			else this.switcher=true;
			return this.switcher;
		}

	},
	created:function(){
		this.getNow();
	},
}
</script>
<style>
	.item{
		font-size:1.2rem;
		border-radius:10px;
		height:100%;
		margin-top:50px;
		color:#455A64;
	}
	.isLine{
		height:17px;
		width:17px;
		border-radius:50%;
	}
	.isLineTip{
		font-size:0.7rem;
		margin-left:5px;
		color:#757575
	}
</style>
