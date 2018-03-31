<template>
<div>
        {{new Date(event.startedAt).toJSON()}}
        {{event.appointedTimeFrame}} minutes 
        {{event.secondsRemaining}}
        {{event.isOngoing}}
</div>
</template>
<script>
export default {
  created: () => {
    this.intervalId = setInterval(this.updateTime, 1000)
  },
  computed: {
    eventCountDown: () => {
      return this.localTime - this.event.startedAt
    }
  },
  data () {
    this.localTime = new Date().getTime()
    this.secondsRemaining = 0
    this.intervalId = null
  },
  methods: {
    updateTime () {
      this.localTime = new Date().getTime()
      this.secondsRemaining = this.event.secondsRemaining
    }
  },
  props: ['event']
}
</script>
