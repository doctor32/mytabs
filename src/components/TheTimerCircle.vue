<template>
    <div class="timer" :class="timerClass">
        <svg class="progress" width="150" height="150"> 
            <circle ref="circle" class="progress__circle" stroke="#D03130" stroke-width="10" cx="75" cy="75" r="55" fill="transparent"/>
        </svg>
        <p class="timer__text">{{$store.state.timerValue}}s</p>
    </div>
</template>

<script>
    export default {
        props: ['timerClass'],
        data() {
            return {
            
            }
        },
        computed: {
            radius() {
                return this.$refs.circle.r.baseVal.value
            },
            circumFerence() {
                return 2 * Math.PI * this.radius
            },
        },
        methods: {
            setProgress(percent) {
                const offset = this.circumFerence - percent / 100 * this.circumFerence
                this.$refs.circle.style.strokeDashoffset = offset
            },
            addPercentEverySec () {
                const value = this.$store.state.timerValue
                const int = setInterval(() => {
                    this.$store.state.percent = this.$store.state.percent + 100/value
                    this.$store.state.timerValue--
                    this.setProgress(this.$store.state.percent)
                    if (this.$store.state.percent >= 99) {
                        clearInterval(int)
                    }
                }, 1000);
            }
        },
        mounted() {
                this.$refs.circle.style.strokeDasharray = `${this.circumFerence} ${this.circumFerence}`
                this.$refs.circle.style.strokeDashoffset = this.circumFerence
                this.setProgress(0)
                this.addPercentEverySec()
        },
    }
</script>

<style lang="scss" scoped>
.progress__circle {
    transform-origin: center;
    transform: rotate(-90deg)
}
.timer {
    position: relative;
}
.timer__text {
    position: absolute;
    top: 25px;
    left: 61px;
    font-size: 32px;
}
</style>