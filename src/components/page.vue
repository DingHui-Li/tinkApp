<template>
  <div class="md-layout md-alignment-center-center" style="margin:10px 10px 0 10px" >
		<div class="md-layout-item md-size-100 md-elevation-5" :style="[cardStyle,bgColor,background]"  v-if="sensor1">
			<div class="md-layout md-alignment-center-center" >
				<div class="md-layout-item md-size-100 md-layout" style="color:white;height:5vh;">
						<div class="md-layout-item md-size-20 md-alignment-top-left md-layout" style="margin:25px">
							<div :style="[isLineStyle,isLineColor]" >
								<md-tooltip md-direction="right" style="color:white">{{sensor1.isLine=='1'?'在线':'离线'}}</md-tooltip>
							</div>
						</div>
				</div>
				<div class="md-layout-item md-size-100 md-layout md-alignment-center-center" style="color:white;height:10vh;font-size:2rem;" v-if="sensor1.sensorType!=2">
							{{sensor1.sensorName}}
				</div>
				<div class="md-layout-item md-size-100 md-layout md-layout md-alignment-center-center" style="color:white;height:10vh;" v-if="sensor1.sensorType!=2">
							<span style="margin-right:5px">上次更新:</span>{{updateData.lastUpdateDate}}
				</div>
				<!-- 数值型 -->
				<div class="md-layout-item md-size-100 md-layout md-layout md-alignment-center-center" style="color:white;height:35vh;font-size:10rem;" v-if="sensor1.sensorType==1">
							{{updateData.value}}<span style="font-size:3rem;">{{sensor1.unit}}</span>
							<div v-if="sensor1.sensorName=='气体'" style="position:absolute;height:95vh;width:95%;top:10px;overflow:hidden;border-radius:10px">
								<smoke />
							</div>	
				</div>
				<!-- 开关型 -->
				<div class="md-layout-item md-size-100 md-layout md-layout md-alignment-bottom-center" style="color:white;height:55vh;font-size:2rem;" v-else-if="sensor1.sensorType==2">
							<switcher :ischecked='updateData.switcher'/>
							<div class="md-layout-item md-size-100 md-layout md-alignment-bottom-center" style="color:white;height:50%;font-size:2rem;">
								{{sensor1.sensorName}}
							</div>
							<md-switch v-model="updateData.switcher" class="md-primary" style="margin:0;z-index:99;"></md-switch>
				</div>
				<!-- 状态型 -->
				<div class="md-layout-item md-size-100 md-layout md-layout md-alignment-center-center" style="color:white;height:35vh;font-size:2rem;" v-else-if="sensor1.sensorType==5">
							{{updateData.switcher=='0'?'未检测到':'检测到'}}
				</div>
				<div class="md-layout-item md-size-100 md-layout md-layout md-alignment-center-center" style="height:35vh;" >
					<div :id="chartId" style="width:100%;height:100%;"></div>
				</div>
				<!-- <div class="md-layout-item md-layout md-size-100 md-alignment-center-center" style="color:white;height:5vh;font-size:0.7rem"></div> -->
			</div>
		</div>
  </div>
</template>

<script>
import Vue from 'vue'
import {userData} from '../main.js'
import { setInterval, clearInterval } from 'timers';
import echarts from 'echarts'
import switcher from './switcher.vue'
import smoke from './smoke.vue'
export default {
	name: 'page',
	props:['sensor1','color','cardBgImgChoice','chartId'],
	components:{switcher,smoke},
	data(){
		return{
				cardStyle:{
					height:'95vh',
					margin: 0,
					borderRadius:'10px',
					backgroundColor:this.color,
					backgroundImageRepeat:'no-repeat',
					backgroundImageSize:'100% 100%',
					transition: 'background-color 1s',
				},
				isLineStyle:{
					height:'20px',
					width:'20px',
					borderRadius:'50%'
				},
				updateData:{
					lastUpdateDate:'',
					value:'0',
					switcher:true
				},
				switcher:true,
			}
	},
	computed:{
			isLineColor:function(){
				if(this.sensor1.isLine=='1'){
					return {backgroundColor:'#4CAF50'};
				}else{
					return {backgroundColor:'#F44336'};
				}
			},
			createTime:function(){
				if(this.sensor1!=undefined){
					let tamp=new Date(this.sensor1.createDate.time);
					return tamp.toLocaleDateString().replace(/\//g, "-") + " " + tamp.toTimeString().substr(0, 8)
				}
			},
			bgColor:function(){
				if(this.sensor1!=undefined){
					if(this.sensor1.sensorTypeId==5||this.sensor1.sensorTypeId==2)
					return {'background-color':this.updateData.switcher?'#4CAF50':'#607D8B'};
				}
			},
			background:function(){
				if(this.color=="rainImage"){
					return {background:"url("+require('./img/rain.jpg')+')'}
				}
			}
			
	},
	created:function(){
		this.updateData={'lastUpdateDate':this.sensor1.updateDateTime,'value':this.sensor1.value,'switcher':(this.sensor1.switcher==1?true:false)};
	},
	mounted:function(){
		if(this.sensor1.sensorType==1){//传感器类型
			let data=[];
			let interval=null;
			var chart = echarts.init(document.getElementById(this.chartId));
					// 绘制图表
					chart.setOption({
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
			if(this.sensor1.isLine!='-1'){//是否在线
				interval=setInterval(()=>{
					Vue.axios({//更新传感器数据
						method:'post',
						url:'apis/tlink_interface/api/device/datapoint.htm',
						data:JSON.stringify({"sensorId": this.sensor1.sensorId,'deviceId':userData.deviceid})
					}).then(res=>{
							if(res.data.flag=='00'){
								this.updateData={'lastUpdateDate':res.data.timestamp,'value':res.data.value,'switcher':(res.data.switcher==1?true:false)};
								if(data.length>10) data.shift();
								data.push({'time':new Date(),'val':res.data.value});
								chart.setOption({
									dataset:{
										source:data
									}
								})
							}
						})
					},5000)
			}	
			else {
				clearInterval(interval);
			}
		}
	}
}
</script>

	