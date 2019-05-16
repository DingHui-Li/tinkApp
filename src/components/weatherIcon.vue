<template>
	<div>
		<div class="weather" v-if="cond_code==100">
			<div class="weather__icon weather__icon-sun" ></div>
		</div>
		<div class="weather" v-if="cond_code>=101&&cond_code<=104">
            <div class="weather__icon weather__icon-cloud"></div>
        </div>
		 <div class="weather" v-if="cond_code>=305&&cond_code<=399">
            <div class="weather__icon weather__icon-cloud"></div>
            <div class="weather__icon weather__icon-rain">
                <span class="waterdrop drop-1"></span>
                <span class="waterdrop drop-2"></span>
                <span class="waterdrop drop-3"></span>
                <span class="waterdrop drop-4"></span>
            </div>
        </div>
		<div class="weather" v-if="cond_code>=400&&cond_code<=499">
            <div class="weather__icon weather__icon-cloud"></div>
            <div class="weather__icon weather__icon-snow">
                <span class="snowdrop drop-1"></span>
                <span class="snowdrop drop-2"></span>
                <span class="snowdrop drop-3"></span>
                <span class="snowdrop drop-4"></span>
            </div>
        </div>
		<div class="weather" v-if="cond_code>=300&&cond_code<=304">
            <div class="weather__icon weather__icon-cloud lightning"></div>
            <div class="weather__icon weather__icon-bolt">
                <span class="bolt bolt-1"></span>
                <span class="bolt bolt-2"></span>
            </div>
        </div>
	</div>
</template>
<script>
export default {
	name:'weatherIcon',
	props:['cond_code'],
}
</script>
<style>
	@import './weathweIcon.css'
</style>

