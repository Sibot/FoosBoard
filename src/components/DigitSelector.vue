<template>
<div>
  <div
    v-for="digit in digits"
    :key="digit"
    :class="{ highlighted:highlightedDigits.includes(digit), selected: selectedDigit === digit }"
    @click="selectDigit(digit)"
    class="digit">{{digit}}</div>
</div>
</template>
<script>
export default {
  name: 'DigitSelector',
  created: function () {
    this.init()
  },
  data () {
    return {
      digits: [],
      startDigit: this.start || 0,
      endDigit: this.end || 10,
      stepDigit: this.step || 1,
      highlightedDigits: this.highlighted || [3, 5, 8],
      preSelectedDigit: this.preSelected,
      selectedDigit: this.selected
    }
  },
  methods: {
    init () {
      let i = this.startDigit
      let digit = this.startDigit
      for (; i <= this.endDigit; i++) {
        this.digits.push(digit)
        digit += this.stepDigit
      }
    },
    isSelected (digit) {
      return digit === this.selectDigit
    },
    selectDigit (val) {
      this.selectedDigit = val
    }
  },
  props: [
    'start',
    'end',
    'step',
    'highlighted',
    'preSelected',
    'selected'
  ]
}
</script>
<style scoped>
.highlighted {
  background-color: rgb(174, 226, 228);
}
.selected {
  background-color: rgb(209, 228, 174);
}
</style>
