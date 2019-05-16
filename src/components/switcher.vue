<template>
	<div style="position:absolute;width:100%;height:100%;top:10px;z-index:99">
		<div id="filo"></div>
		<input type="radio" name="switch" value="on"  :checked="checked1" />
		<input type="radio" name="switch" value="off" :checked="checked2"/>
		<label for="switch"></label>
	</div>
</template>
<script>
export default {
	name:'switcher',
	props:['ischecked'],
	data(){
		return{
			
		}
	},
	computed:{
		checked1:function(){
			return this.ischecked=='1'?'checked':'';
		}, 
		checked2:function(){
			return this.ischecked=='1'?'':'checked';
		}, 
	},
}
</script>
<style>
	#filo {
		position: relative;
		background-color: #000000;
		width: 2px;
		height: 150px;
		left: 50%;
		margin-left: -1px;
		z-index: 1;
		transform-origin: 0% 0%;
		animation: oscillaFilo .9s ease-in-out 0s infinite alternate;
	}
	#filo:after {
		content: " ";
		left: -5px;
		top: 100%;
		position: absolute;
		border-bottom: 15px solid #000000;
		border-left: 4px solid transparent;
		border-right: 4px solid transparent;
		height: 0;
		width: 4px;
	}
	input[value="off"]:checked ~
	#filo {
			box-shadow: -80px -10px 7px 0 rgba(0,0,0,0.1);
	}
	input[value="off"]:checked ~
	#filo:after {
			box-shadow: -80px -10px 10px -2px rgba(0,0,0,0.1);
	}
	label {
		width: 51px;
		height: 51px;
		position: absolute;
		left: 50%;
		margin-left: -24px;
		margin-top:15px;
		border-radius: 100%;
		animation: oscillaLampadina .9s ease-in-out 0s infinite alternate;
	}           
	input[value="off"]:checked ~
	label {
		background: rgba(255,255,255,0.03);
		box-shadow: inset 0px 1px 5px rgba(255,255,255,0.1), inset 0px 2px 20px rgba(255,255,255,0.07), -80px -15px 15px -5px rgba(0,0,0,0.1);
	}
	input[value="on"]:checked ~
	label {
		background: rgba(255,255,255,1);
		box-shadow: 0px 0px 10px rgba(255,255,255,0.8), 0px 0px 30px rgba(255,255,255,0.8), 0px 0px 50px rgba(255,255,255,0.6), 0px 0px 70px rgba(255,255,255,0.6), -80px -15px 120px 0px rgba(255,255,255,0.4);
	}

	input[value="off"]:checked ~
	label:after {
		content: " ";
		width: 15px;
		height: 15px;
		top: 0;
		position: absolute;
		left: 0;
		margin-left: 15px;
				border-radius: 100%;
		border: 2px solid rgba(255,255,255,0.03);
	}
	@keyframes oscillaFilo {
		from {
			transform:rotate(5deg);
		} to {
			transform:rotate(-5deg);
		}
	}

	@keyframes oscillaLampadina {
		from {
			transform: rotate(3deg) translate(-16.4px,-1px);
		} to {
			transform: rotate(-3deg) translate(16.4px,-1px);
		}
	}

	@keyframes ombraTesto {
		from {
			transform: translate(1px,0px) scale(1.01,1.06) skew(0.9deg, 0deg);
		} to {
			transform: translate(-1px,0px) scale(1.01,1.06) skew(-0.9deg, 0deg);
		}
	}
</style>
