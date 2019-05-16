<template>
	<div style="height:100vh;width:100vw;">
			<canvas class="scene scene--full" style="height:100%" id="scene"></canvas>
	</div>
</template>
<script>
import * as THREE from 'three'
import {TweenMax} from 'gsap'
export default {
	name:'three',
	data(){
		return {
			lines:null,
			sphere:null,
			dots:null,
			renderer:null,
			scene:null,
			camera:null
		}
	},
	mounted:function(){
		this.init();
		this.animate();
	},
	methods:{
		init:function(){
			var canvas = document.querySelector('#scene');
			var width = canvas.offsetWidth,
				height = canvas.offsetHeight;

			this.renderer = new THREE.WebGLRenderer({
				canvas: canvas,
				antialias: true
			});
			this.renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
			this.renderer.setSize(width, height);
			this.renderer.setClearColor(0x191919);

			this.scene = new THREE.Scene();

			this.camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
			this.camera.position.set(0, 0, 280);

			this.sphere = new THREE.Group();
			this.scene.add(this.sphere);
			var mat1 = new THREE.LineBasicMaterial({
				color:0x4a4a4a
			});
			var mat2 = new THREE.LineBasicMaterial({
				color:0x3F51B5
			});

			var radius = 100;
			this.lines = 50;
			this.dots = 50;
			for(var i = 0; i < this.lines; i++) {
				var geometry = new THREE.Geometry();
				var line = new THREE.Line(geometry, (Math.random()>0.2)?mat1:mat2);
				line.speed = Math.random() * 300 + 250;
				line.wave = Math.random();
				line.radius = Math.floor(radius + (Math.random()-0.5) * (radius*0.2));
				for(var j=0;j<this.dots;j++){
					var x = ((j/this.dots) * line.radius * 2) - line.radius;
					var vector = new THREE.Vector3(x, 0, 0);
					geometry.vertices.push(vector);
				}
				line.rotation.x = Math.random() * Math.PI;
				line.rotation.y = Math.random() * Math.PI;
				line.rotation.z = Math.random() * Math.PI;
				this.sphere.add(line);
			}
	  },
		updateDots:function (a) {
				var i, j, line, vector, y;
				for(i=0;i<this.lines;i++){
					line = this.sphere.children[i];
					for(j=0;j<this.dots;j++){
						vector = this.sphere.children[i].geometry.vertices[j];
						var ratio = 1 - ((line.radius - Math.abs(vector.x)) / line.radius);
						y = Math.sin(a/line.speed + j*0.15) * 12 * ratio;
						vector.y = y;
					}
					line.geometry.verticesNeedUpdate = true;
				}
			},
	  render:function (a) {
				requestAnimationFrame(this.render);
				this.updateDots(a);
				this.sphere.rotation.y = (a * 0.0001);
				this.sphere.rotation.x = (-a * 0.0001);
				this.renderer.render(this.scene, this.camera);
			},
	  onResize:function () {
				canvas.style.width = '';
				canvas.style.height = '';
				width = canvas.offsetWidth;
				height = canvas.offsetHeight;
				this.camera.aspect = width / height;
				this.camera.updateProjectionMatrix();  
				this.renderer.setSize(width, height);
			},
      animate: function () {
     		requestAnimationFrame(this.render);
			var resizeTm;
			window.addEventListener("resize", function(){
				resizeTm = clearTimeout(resizeTm);
				resizeTm = setTimeout(onResize, 200);
			});
		}
	}
}
</script>
<style>
	@import './base.css';
</style>

