<template>
  <v-card>
    <v-card-title>
      Enter time of play
    </v-card-title>
    <v-card-text>
      <v-date-picker
        first-day-of-week="1"
        v-model="dateOfGame"
        :allowed-dates="enabledDatesFn"
        full-width
        v-on:input="updateSelectedDate"></v-date-picker>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="saveFn" :disabled="disabledSaveFn">Save game</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: 'GameTime',
  props: ['selectedDate', 'saveFn', 'disabledSaveFn'],
  data () {
    return {
      dateOfGame: this.selectedDate
    }
  },
  methods: {
    enabledDatesFn: function (date) {
      return new Date(date) <= new Date()
    },
    updateSelectedDate: function () {
      this.$emit('update:selectedDate', this.dateOfGame)
    }
  }
}
</script>
