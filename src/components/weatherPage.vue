<template>
	<div class="md-layout md-alignment-center-center" style="margin:10px 10px 0 10px" >
		<div class="md-layout-item md-size-100 md-elevation-5" :style="[cardStyle]">
			<div class="md-layout md-alignment-center-center" style="height:100%;" v-if="weatherData.length>0">
				<div class="md-layout-item md-size-100 md-layout md-alignment-center-center" style="color:white;height:10%;font-size:2rem;">
							{{weatherData[0].basic.location}}
				</div>
				<div class="md-layout-item md-size-100 md-layout md-layout md-alignment-center-center" style="color:white;height:10%;">
							<span style="margin-right:5px">上次更新:</span>{{weatherData[0].update.loc}}
				</div>
				<div class="md-layout-item md-size-100 md-layout md-layout md-alignment-center-center" style="color:white;height:35%;font-size:10rem;">
							{{weatherData[0].now.tmp}}<span style="font-size:3rem;">℃</span>
				</div>
				<!-- <div class="md-layout-item md-size-100 md-layout md-alignment-bottom-center" style="height:20%;">
					<div id='mychart' ref='mychart' style="height:100%;width:100%">
					</div>
				</div> -->
				<div class="md-layout-item md-size-100 md-layout md-alignment-top-center" style="color:white;height:25%;">
						<div class="md-layout md-layout-item md-size-30 md-alignment-bottom-center" v-for="(d,index) in forecastData[0]" :key="index" >
							<div class="md-layout md-layout-item md-size-100 md-alignment-top-center">
								{{d.date}}
							</div>
							<div class="md-layout md-layout-item md-size-100 md-alignment-top-center">
								{{d.cond_txt_d}}
							</div>
						</div>
						<div class="md-layout md-layout-item md-size-100 md-alignment-center-center"><span>降水概率</span> </div>
						<div class="md-layout md-layout-item md-size-30 md-alignment-top-center" v-for="(d,index) in forecastData[0]" :key="'d'+index">
							<div class="md-layout md-layout-item md-size-100 md-alignment-top-center">
								{{d.pop}}%
							</div>
						</div>
				</div>
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
		},
		initChart:function(){
			let data1=[];
			let data2=[];
			let time=[];
			if(this.forecastData[0]!=undefined){
				data1=this.forecastData[0].map((item)=>item.tmp_max);
				data2=this.forecastData[0].map((item)=>item.tmp_min);
				time=this.forecastData[0].map((item)=>item.date);
			}
			let mychart = echarts.init(this.$refs.mychart);
					// 绘制图表
			mychart.setOption({
						title: {
							left: 'center'
						},
						tooltip:{
							axisPointer: {
								animation: false
							}
						},
						xAxis: {
							// type:'time',
							data:time,
							show:false,
							splitLine: {
								show: false
							},
							axisLine: {
								lineStyle: {
									color: '#fff'
								}
							},

						},
						yAxis: {
							show:false,
							splitLine: {
								show: false
							},
							axisLine: {
								lineStyle: {
									color: '#fff'
								}
							},
						},
						series: [{
							name: 'max',
							type: 'line',
							color:'#fff',
							smooth: true,
							data:data1
						},
						{
							name: 'min',
							type: 'line',
							color:'#fff',
							smooth: true,
							data:data2
						}]
				});
		},
	},
	created:function(){
		this.getNow();
		this.getForecast();
	},
	updated:function(){
		//this.initChart();
	}
}
</script>
