<template>
  <div class="md-layout md-alignment-center-center" style="margin:10px 10px 0 10px" >
		<div class="md-layout-item md-size-100 md-elevation-5" :style="[cardStyle,bgColor]"  v-if="sensor1">
			<div class="md-layout md-alignment-center-center" >
				<div class="md-layout-item md-size-100 md-layout" style="color:white;height:5vh;">
						<div class="md-layout-item md-size-20 md-alignment-top-left md-layout" style="margin:25px">
							<div :style="[isLineStyle,isLineColor]" >
								<md-tooltip md-direction="right" style="color:white">{{sensor1.isLine==1?'在线':'离线'}}</md-tooltip>
							</div>
						</div>
				</div>
				<div class="md-layout-item md-size-100 md-layout md-alignment-center-center" style="color:white;height:10vh;font-size:2rem;">
							{{sensor1.sensorName}}
				</div>
				<div class="md-layout-item md-size-100 md-layout md-layout md-alignment-center-center" style="color:white;height:10vh;">
							<span style="margin-right:5px">上次更新:</span>{{updateData.lastUpdateDate}}
				</div>
				<div class="md-layout-item md-size-100 md-layout md-layout md-alignment-center-center" style="color:white;height:35vh;font-size:10rem;" v-if="sensor1.sensorTypeId==1">
							{{updateData.value}}<span style="font-size:3rem;">{{sensor1.unit}}</span>
				</div>
				<div class="md-layout-item md-size-100 md-layout md-layout md-alignment-center-center" style="height:35vh;" v-if="sensor1.sensorTypeId==2">
					<md-switch v-model="boolean" class="md-primary" ></md-switch>
				</div>
				<div class="md-layout-item md-size-100 md-layout md-layout md-alignment-center-center" style="height:30vh;" >
					<div :id="chartId" style="width:100%;height:100%;"></div>
				</div>
				<div class="md-layout-item md-layout md-size-100 md-alignment-center-center" style="color:white;height:5vh;font-size:0.7rem">创建时间:{{createTime}}</div>
			</div>
		</div>
  </div>
</template>

<script>
import Vue from 'vue'
import {userData} from '../main.js'
import { setInterval } from 'timers';
import echarts from 'echarts'
export default {
	name: 'page',
	props:['sensor1','color','cardBgImgChoice','chartId'],
	data(){
		return{
				boolean:false,
				cardStyle:{
					height:'95vh',
					margin: 0,
					borderRadius:'10px',
					backgroundColor:this.color,
					backgroundImageRepeat:'no-repeat',
					backgroundImageSize:'auto 100%',
					transition: 'background-color 1s',
				},
				isLineStyle:{
					height:'20px',
					width:'20px',
					borderRadius:'50%'
				},
				updateData:{
					lastUpdateDate:'',
					value:'0'
				}
			}
	},
	watch:{
		boolean:function(newD,oldD){
			// Vue.axios({
			// 	method:'post',
			// 	url:'apis/tlink_interface/api/device/updateDevices.htm',

			// })
		}
	},
	computed:{
			isLineColor:function(){
				if(this.sensor1.isLine==1){
					return {backgroundColor:'#4CAF50'};
				}else{
					return {backgroundColor:'#F44336'};
				}
			},
			// cardBgImg:function(){
			// 	if(this.cardBgImgChoice==0){
			// 		return {backgroundImage:'none'}
			// 	}
			// 	else if(this.cardBgImgChoice==1){
			// 		return {backgroundImage:'url('+require('../assets/bg1.jpg')+')'}
			// 	}
			// 	else if(this.cardBgImgChoice==2){
			// 		return {backgroundImage:'url('+require('../assets/bg2.png')+')'}
			// 	}
			// 	else if(this.cardBgImgChoice==3){
			// 		return {backgroundImage:'url('+require('../assets/bg3.png')+')'}
			// 	}
			// },
			createTime:function(){
				if(this.sensor1!=undefined){
					let tamp=new Date(this.sensor1.createDate.time);
					return tamp.toLocaleDateString().replace(/\//g, "-") + " " + tamp.toTimeString().substr(0, 8)
				}
			},
			bgColor:function(){
				if(this.sensor1.sensorTypeId==2)
				return {'background-color':this.boolean?'#4CAF50':'#607D8B'};
			}
	},
	mounted:function(){
		if(this.sensor1.sensorTypeId==1){
			let data=[];
			var chart = echarts.init(document.getElementById(this.chartId));
					// 绘制图表
					chart.setOption({
						title: {
							left: 'center'
						},
						tooltip:{
							axisPointer: {
								animation: false
							}
						},
						xAxis: {
							type:'time',
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
							splitLine: {
								show: false
							},
							axisLine: {
								lineStyle: {
									color: '#fff'
								}
							},
						},
						dataset: {
							source: data
						},
						series: [{
							name: this.sensorName,
							type: 'line',
							showSymbol: false,
							color:'#fff'
						}]
				});
			if(this.sensor1.isLine==1){
				setInterval(()=>{
					Vue.axios({//更新数据
						method:'post',
						url:'apis/tlink_interface/api/device/datapoint.htm',
						data:JSON.stringify({"sensorId": this.sensor1.id,'deviceId':userData.deviceid})
					}).then(res=>{
							if(res.data.flag=='00'){
								this.updateData={'lastUpdateDate':res.data.timestamp,'value':res.data.value};
								if(data.length>10) data.shift();
								data.push({'time':new Date(),'val':res.data.value});
								console.log(data)
								chart.setOption({
									dataset:{
										source:data
									}
								})
							}
						})
					},5000)
			}	
		}
	}
}
</script>
	
<style>

</style>