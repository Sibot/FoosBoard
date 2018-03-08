<template>
  <md-card>
    <md-card-header>
      <h4 class="md-subheading">Enter time of play</h4>
    </md-card-header>
    <md-card-content>
      <md-datepicker v-model="selectedDate" :md-disabled-dates="disabledDatesFn"></md-datepicker>
    </md-card-content>
    <md-card-actions>
      <md-button class="md-raised md-primary" @click="saveFn()" :disabled="disabledSaveFn">Save game</md-button>
    </md-card-actions>
  </md-card>
</template>
<script>
export default {
  name: 'GameTime',
  props: ['selectedDate', 'saveFn', 'disabledSaveFn', 'disabledDatesFn']
}
</script>
