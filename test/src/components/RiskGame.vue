<template>
    <Questionnaire v-if="stage === 'questionnaire'" @done="stage = 'game'" />
    <RiskGameView v-if="stage === 'game'" @done="stage = 'summary'; this.summaryData = $event" />
    <Summary v-if="stage === 'summary'" , :summaryData="this.summaryData" />
</template>
<script>
import Questionnaire from './Questionnaire.vue'
import RiskGameView from './RiskGameView.vue'
import Summary from './Summary.vue'

export default {
    name: 'App',
    components: {
        Questionnaire,
        RiskGameView,
        Summary
    },
    data() {
        return {
            stage: "questionnaire",
            summaryData: null,
        }
    },
}
</script>