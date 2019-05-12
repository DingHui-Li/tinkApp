<template>
	<div class="md-layout md-alignment-center-center" style="margin:10px 10px 0 10px" >
		<div class="md-layout-item md-size-100 md-elevation-5 md-layout md-alignment-center-center" :style="[cardStyle]">
				<div class="md-layout-item md-size-100" style="height:5%"></div>
				<div :class="cardItemClass" @click="click(-1)" v-if="weatherData.length>0">
					<div class="md-layout md-layout-item md-size-40 md-alignment-center-center">
						{{weatherData[0].basic.location}}
					</div>	
					<div class="md-layout md-layout-item md-size-40 md-alignment-center-left">
						<div class="md-layout md-layout-item md-size-40 md-alignment-center-center">
							{{weatherData[0].now.cond_txt}}
						</div>
						<div class="md-layout md-layout-item md-size-60 md-alignment-center-right">
							{{weatherData[0].now.tmp}}℃
						</div>
					</div>
					<div class="md-layout md-layout-item md-size-20 md-alignment-center-center">
  						<img class="md-layout md-layout-item md-size-30 md-alignment-center-center" :src="require('../assets/arrow.png')"/>
					</div>	
				</div>
				<div :class="cardItemClass" v-for="(d,index) in sensor.filter((item,index)=>index==0||index==1||index==2||index==6)" :key="d.id" @click="click(index)">
					<div :class="titleClass" md-effect="opacity">
					 	{{d.sensorName}}
					</div>
					<div :class="isLineClass" >
						<div class="isLine" :style="{'background-color':d.isLine==1?'#4CAF50':'#F44336'}" ></div><span class="isLineTip">{{d.isLine==1?'在线':'离线'}}</span>
					</div>
					<div class="md-layout md-layout-item md-size-20 md-alignment-center-center">
  						<img class="md-layout md-layout-item md-size-30 md-alignment-center-center" :src="require('../assets/arrow.png')"/>
					</div>
				</div>
				<div class="md-layout-item md-size-100 md-alignment-bottom-right" style="height:5%;">
					<div class="md-layout md-layout-item md-size-100 md-alignment-bottom-center" style="height:100%">
						<img style="height:15px;margin-right:5px" :src="require('../assets/github.png')"/>
						<a href="https://github.com/DingHui-Li/tinkApp" style="color:#4CAF50;font-size:0.7rem">https://github.com/DingHui-Li/tinkApp</a>
					</div>
				</div>
			</div>
  </div>
</template>
<script>
import Vue from "vue"
export default {
	name:'homePage',
	props:['sensor'],
	data(){
		return{
			cardStyle:{
					height:'95vh',
					margin: 0,
					borderRadius:'10px',
					backgroundColor:'#e0e0e0',
					backgroundImageRepeat:'no-repeat',
					backgroundImageSize:'100% 100%',
			},
			cardItemClass:[
				'md-layout',
				'md-layout-item',
				'md-size-90',
				'md-alignment-center-left',
				'title'
			],
			titleClass:[
				'md-layout',
				'md-layout-item',
				'md-size-40',
				'md-alignment-bottom-center'
			],
			isLineClass:[
				'md-layout',
				'md-layout-item',
				'md-size-40',
				'md-alignment-bottom-right',
			],
			weatherData:[]
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
	},
	created:function(){
		this.getNow();
	},
}
</script>
<style>
	.title{
		font-size:1.2rem;
		border-radius:5px;
		height:15%;
		background-color: white;
		color:#455A64
	}
	.isLine{
		height:20px;
		width:20px;
		border-radius:50%;
	}
	.isLineTip{
		font-size:0.8rem;
		margin-left:5px;
		color:#757575
	}
	
</style>
