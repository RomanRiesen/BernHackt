<template>
    <HelloWorld v-if="stage === 'hello'" @done="stage = 'questionnaire'"/>
    <Questionnaire v-if="stage === 'questionnaire'" @done="stage = 'game'" />
    <RiskGameView v-if="stage === 'game'" @done="stage = 'summary'; this.summaryData = $event" />
    <Summary v-if="stage === 'summary'" , :summaryData="this.summaryData" />
</template>
<script>
import HelloWorld from './HelloWorld.vue';
import Questionnaire from './Questionnaire.vue'
import RiskGameView from './RiskGameView.vue'
import Summary from './Summary.vue'

export default {
    name: 'App',
    components: {
        HelloWorld,
        Questionnaire,
        RiskGameView,
        Summary
    },
    data() {
        return {
            stage: "hello",
            summaryData: null,
        }
    },
}
</script>