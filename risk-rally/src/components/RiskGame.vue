<template>
    <HelloWorld v-if="stage==='hello'" @done="stage='questionnaire'"/>
    <Questionnaire v-if="stage === 'questionnaire'" @done="stage = 'game'; this.questionnaire_answers = $event"/>
    <RiskGameView v-if="stage === 'game'" :questionnaireAnswers = "this.questionnaire_answers" @done="stage = 'summary'; this.summaryData = $event" />
    <Summary v-if="stage === 'summary'" :summaryData="this.summaryData" />
</template>
<script>
import HelloWorld from './HelloWorld.vue'
import Questionnaire from '../views/Questionnaire.vue'
import RiskGameView from './RiskGameView.vue'
import Summary from './Summary.vue'

export default {
    name: 'App',
    components: {
        HelloWorld,
        Questionnaire,
        RiskGameView,
        //FIXME rename, evidently there is a html element of the same name
        Summary
    },
    data() {
        return {
            stage: "hello",
            summaryData: null,
            questionnaire_answers_and_qs: {questions: [], answers: []}
        }
    },
}
</script>