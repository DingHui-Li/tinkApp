<template>
	<div class="md-layout md-alignment-center-center" style="margin:10px 10px 0 10px" >
		<div class="md-layout-item md-size-100 md-elevation-5" :style="[cardStyle]" >
			<div class="md-layout md-alignment-center-center" style="height:100%;" v-if="weatherData.length>0" >
				<!-- 图标和地点 -->
				<div class="md-layout-item md-size-100 md-layout md-alignment-center-center" style="color:white;height:10%;font-size:2rem;">
							{{weatherData[0].basic.location}}
				</div>
				<!-- 更新时间 -->
				<div class="md-layout-item md-size-100 md-layout md-alignment-center-center" style="color:white;height:10%;">
							<span style="margin-right:5px">上次更新:</span>{{weatherData[0].update.loc}}
				</div>
				<!-- 温度 -->
				<div class="md-layout-item md-size-100 md-layout md-alignment-center-center" style="color:white;height:50%;font-size:10rem;">
							{{weatherData[0].now.tmp}}<span style="font-size:3rem;">℃</span>
				</div>
				<!-- 预报 -->
				<div class="md-layout-item md-size-100 md-layout md-alignment-top-center" style="color:white;height:25%;">
						<div class="md-layout md-layout-item md-size-30 md-alignment-bottom-center" v-for="(d,index) in forecastData[0]" :key="index" >
							<div class="md-layout md-layout-item md-size-100 md-alignment-top-center">
								{{d.date}}
							</div>
							<div class="md-layout md-layout-item md-size-100 md-alignment-top-center" style="margin-top:20px">
								{{d.cond_txt_d}}
							</div>
						</div>
					<div class="md-layout md-layout-item md-size-100 md-alignment-top-center" style="margin-top:20px;color:white;height:5%">
						降水概率
					</div>
					<div class="md-layout md-layout-item md-size-100 md-alignment-top-center" style="margin-top:20px;height:10%;color:white">
						<div class="md-layout md-layout-item md-size-30 md-alignment-bottom-center" v-for="(d,index) in forecastData[0]" :key="index" >
								<div class="md-layout md-layout-item md-size-100 md-alignment-top-center">
									{{d.pop}}%
								</div>
						</div>
					</div>
				</div>
				<div class="md-layout md-layout-item md-size-100 md-alignment-top-center" style="margin-top:20px;color:white;height:15%"></div>
			</div>
		</div>
  </div>
</template>
<script>
import Vue from 'vue'
import echarts from 'echarts'

export default {
	name:'weatherPage',
	data(){
		return{
			cardStyle:{
					height:'95vh',
					margin: 0,
					borderRadius:'10px',
					backgroundColor:'#00897b',
					backgroundImageRepeat:'no-repeat',
					backgroundImageSize:'100% 100%',
			},
			weatherData:[],
			forecastData:[],
			containerHeight:{
				height:'662px'
			}
		}
	},
	computed:{
	},
	methods:{
		getNow:function(){
			Vue.axios({
				method:'get',
				url:'https://free-api.heweather.net/s6/weather/now?location=auto_ip&key=e6757104a7154b6f89568d65b43c751d'
				}).then(res=>{
					this.weatherData=[];
					this.weatherData.push(res.data.HeWeather6[0]);
				})	
		},
		getForecast:function(){
			Vue.axios({
				method:'get',
				url:'https://free-api.heweather.net/s6/weather/forecast?location=auto_ip&key=e6757104a7154b6f89568d65b43c751d'
				}).then(res=>{
					this.forecastData=[];
					this.forecastData.push(res.data.HeWeather6[0].daily_forecast);
				})	
		}
	},
	created:function(){
		this.getNow();
		this.getForecast();
	},
	updated:function(){
	},
	mounted:function(){
	}
}
</script>
<style>
</style>
