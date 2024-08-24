<script>
import RiskGameEvent from '../components/RiskGameEvent.vue'
import { UserState, FiredEvent } from '../components/UserState.js'

export default {
    components: RiskGameEvent,
    data() {
        return {
            current_event: null,
            game_loop_interval: null,
            user_state: new UserState(100000, 900000, 1100000),
            start_date: null,
            tick_time: 100, // nr milliseconds
            start_year: null,
            years: null, // this.start_date.getYear(),
            months: null, // this.start_date.getMonth(),
            global_probability_multiplier: 3,
            insurance_statistics: {},
            events: [],
            feelingPossibleAnswersUninsured: [
                'Ich bin zufrieden mit dem Unversichert sein',
                'Versichert und nicht versichert zu sein sind mir hier genau gleich wertvoll',
                'Ich habe ein starkes bedauern unversichert gewesen zu sein',
                'Ich dachte ich wäre versichert'
            ],
            // TODO add monthly premium
            insurances: Object.freeze({
                solar: { name: 'GVB Solar- & Photovoltaikversicherung', monthly_premium: 50 },
                feuer_element: { name: 'GVB Natura - Feuer- und Elementarversicherung', monthly_premium: 100 },
                surroundings: { name: 'GVB Plus - Umgebungsversicherung', monthly_premium: 80 },
                top: { name: 'GVB Top - Ergänzungsversicherung', monthly_premium: 40 },
                bruch: { name: 'GVB Casco - Bruchversicherung', monthly_premium: 30 },
                earthquake: { name: 'GVB Terra - Erdbebenversicherung', monthly_premium: 35 },
                technic: { name: 'GVB Tech - Gebäudetechnikversicherung', monthly_premium: 60 },
                water: { name: 'GVB Aqua - Wasserversicherung', monthly_premium: 100 },
                legal: { name: 'GVB Lex – Immobilien-Rechtsschutzversicherung', monthly_premium: 20 },
                haftpflicht: { name: 'Gebäudehaftpflichversicherung', monthly_premium: 30 },
                hausrat: { name: 'Hausratsversicherung', monthly_premium: 65 }
            })
        }
    },
    mounted() {
        this.start_date = new Date()
        this.start_year = this.start_date.getFullYear()
        this.years = this.start_year
        this.start_month = this.start_date.getMonth()
        this.months = this.start_month;
        this.startGame()
        Object.keys(this.insurances).forEach(ins_k => {
            let insurance = this.insurances[ins_k]
            console.log(insurance.name)
            this.insurance_statistics[insurance.name] = {
                premiums: 0, benefits: 0
            }
        });
        console.log("SATS", this.insurance_statistics)
        console.log("SATS", this.insurance_statistics)
        console.log("SATS", this.insurance_statistics)
        console.log("SATS", this.insurance_statistics)
        this.createEvents()
    },
    methods: {
        startGame() {
            this.current_event = null;
            this.current_fired_event = null;
            this.game_loop_interval = setInterval(this.update, this.tick_time)
        },
        stopGame() {
            clearInterval(this.game_loop_interval)
        },
        update() {
            console.log('update')
            this.months++;
            if (this.months === 13) {
                this.months = 1;
                this.years++;
                this.events.forEach(e => {
                    //is it quite ugly to change "base" occurence here? yes. Would renaming help? yes.
                    e.base_occurence_per_year += e.increase_occurence_per_year;
                    console.log("ebaseocc", e.base_occurence_per_year, e.increase_occurence_per_year)
                });
            }
            if (this.years - this.start_year > 2) {
                this.stopGame()
                console.log(this.insurance_statistics)
                // TODO end game
            }

            let shuffled_events = this.events
                .map(value => ({ value, sort: Math.random() }))
                .sort((a, b) => a.sort - b.sort)
                .map(({ value }) => value)

            // yes events are not actually independent because only 1 can happen per update steps for ux reasons
            let event_index = 0;
            let event_happened = false;
            for (let [i, e] of shuffled_events.entries()) {

                event_happened = e.base_occurence_per_year > Math.random()*100*12 / this.global_probability_multiplier;
                console.log("happened", event_happened, e.base_occurence_per_year)
                if (event_happened)
                {
                    event_index = i;
                    break;
                }
            }


            for (let ins_k of Object.keys(this.insurances)) {
                let insurance = this.insurances[ins_k];
                this.insurance_statistics[insurance.name].premiums += insurance.monthly_premium;
            }

            if (event_happened) {
                this.current_event = this.events[event_index]
                this.current_fired_event = this.fireEvent(this.current_event, this.user_state);
                this.stopGame();
                //TODO figure out if actually covered
                console.log(this.current_event.insurance)
                this.insurance_statistics[this.current_event.insurance.name].benefits += this.current_fired_event.actual_damages;
            }
        },

        createEventAbsoluteValue(insurance, description, occurence_per_year, occurence_increase_per_year, costs_min, costs_max) {
            this.events.push(
                {
                    description: description,
                    base_occurence_per_year: occurence_per_year,
                    increase_occurence_per_year: occurence_increase_per_year,
                    is_absolute: true,
                    damages_min: costs_min,
                    damages_max: costs_max,
                    insurance: insurance
                }
            )
        },

        createEventRelativeValue(insurance, description, occurence_per_year, occurence_increase_per_year, costs_min_percentage, costs_max_percentage) {
            this.events.push(
                {
                    description: description,
                    base_occurence_per_year: occurence_per_year,
                    increase_occurence_per_year: occurence_increase_per_year,
                    //relative value means in percentage of house value
                    is_absolute: false,
                    damages_min: costs_min_percentage,
                    damages_max: costs_max_percentage,
                    insurance: insurance
                }
            )
        },

        createEvents() {
            this.createEventAbsoluteValue(this.insurances.surroundings, 'Ein Baum ist in ihrem Garten umgestürzt und hat Ihr Gartenhaus beschädigt.', 10, 1, 4000, 9000)
            this.createEventAbsoluteValue(this.insurances.surroundings, 'Ein Hagelsturm beschädigt Ihr Gewächshaus', 10, 0.1, 3000, 5000);
            // - Besitzen sie ein altes Gebäude? besteht bei ihnen erhöhte gefahr vor vandalismus / insekten oder anderen Wildtiere?
            this.createEventAbsoluteValue(this.insurances.top, 'Ihre Wände wurden Vandalisiert', 45, 0, 2000, 3000)
            // - Wollen Sie gegen einbrecher geschützt sein? Haben sie viele Verglasungen in ihrem Gebäude?
            this.createEventAbsoluteValue(this.insurances.bruch, 'Ein Fensterglas wurde von einem Fussball zerstört', 20, 0, 500, 1000)

            // Immobilien-Rechtsschutzversicherung:
            // - Wollen sie bei Rechtsstreitigkeiten auf der sicheren Seite sein? Haben sie Nachbaren mit welchen sie Häufig aneinander geraten?
            this.createEventAbsoluteValue(this.insurances.legal, 'Ihr Haus wurde umgebaut und sie sehen nach Abschluss Mängel der Arbeit. Die Baufirma streitet ihre Schuld ab und sie kommen in einen Rechtstreit.', 10, 0.5, 15000, 25000)

            // Solar
            // - Besitzt ihr Gebäude Solaranlagen und wollen sie 100% versichert auch für ihren entgangenen Strom und folgekosten ?
            this.createEventAbsoluteValue(this.insurances.solar, 'Nach Hagel wurden ihre Solaranlage erheblich beschädigt und der entgangene Strom und die Folgekosten kommen zu tragen', 10, 0.5, 2000, 3000)

            // earthquake:
            // - Erdbeben sind in der Schweiz die Naturgefahr mit dem grössten Schadenspotenzial, dennoch sind über 90% der Wohnungen in der Schweiz sind nicht nachweislich erdbebensicher gebaut, stört sie das?
            const earthquake_text = 'Ihr haus ist Teil der 90% der Häuser welche nicht erdbebensicher gebaut sind. Ein erdbeben trifft in Ihrer Region ein und';
            this.createEventRelativeValue(this.insurances.earthquake, `${earthquake_text} verursacht leichte Setzungsrisse.`, 10, 0, 5, 10);
            this.createEventRelativeValue(this.insurances.earthquake, `${earthquake_text} verursacht stärkere Setzungsrisse.`, 5, 0, 10, 20);
            this.createEventRelativeValue(this.insurances.earthquake, `${earthquake_text} Ihr Haus benötigt eine komplette Rennovation.`, 2.5, 0, 30, 50);

            // Wasserversicherung:
            // - Ist ihr Gebäude an einem Ort wo es mehrheitlich schneit?
            // - Undichte Leitung sind oft schleichende Kosten, finden sie diese für nötig?
            this.createEventRelativeValue(this.insurances.water, 'Eine undichte Leiung hat ihren Boden als auch einige Möbel durchnässt, die behebung des Lecks macht die Wohnung unbewohnbar.', 10, 2, 10, 20)

            // gebäudetechnikversicherung:
            // - besitzen sie ein gebäude mit viel neuartiger technik? (steuerungsmechanismus der storen, Klimaanlage etc)?
            this.createEventAbsoluteValue(this.insurances.technic, 'Die Steuerung des Storen ist defekt.', 20, 1, 1000, 2000)



            //Hausratversicherung
            this.createEventAbsoluteValue(this.insurances.hausrat, 'Eine Überschwemmung beschädigt Ihren Kellerinhalt', 8, 0.5, 8000, 12000);
            this.createEventAbsoluteValue(this.insurances.hausrat, 'Ein Sturm beschädigt Ihren Garten stark', 8, 0.5, 2000, 3000);

            /*
                  versicherung:
      
                  Schadenstatistik :
      
                  Wasserversicherung
      
                  gebäudehaftpflichversicherung (falls keine privatversicherung)
      
                  //TODO
                  Hausratversicherung
      
                  durchschnittlicher schaden hagel: 4865 chf
      
                  durchschnittlicher schaden überschwemmung: 10506 chf
      
                  durchschnittlicher schaden sturm: 2236 chf
      
                  Events (InGame)
      
                  Umgebungsversicherung:
      
                  - Wie wichtig ist ihnen ihr Garten / ihre Terrasse / ihr grundstück welches nicht direkt ihr Gebäude ist? Verwalten sie dort Wertgegenstände?
      
                  Ergänzungsversicherung:
      
                  Bruchversicherung:
      
                  Solaranlagenversicherung:
      
                  */
        },

        lerpRound(l, h, f, round) {
            return Math.round((l + (h - l) * f) / round) * round
        },

        // takes an event and the user_state and returns a FiredEvent
        fireEvent(event, user_state) {
            // event happened now calculate damages
            const least_amount = 500;
            let damages = least_amount;
            if (event.is_absolute) {
                damages = this.lerpRound(event.damages_min, event.damages_max, Math.random(), least_amount) 
            } else {
                let min_dmg = this.user_state.house_value * event.damages_min;
                let max_dmg = this.user_state.house_value * event.damages_max;
                console.log("min_dmg", min_dmg, " max_dmg", max_dmg)
                damages = this.lerpRound(min_dmg, max_dmg, Math.random(), least_amount)/100
            }
            this.user_state.house_value -= damages;
            return new FiredEvent(event.insurance, event.description, damages)
        },
        getYearsMonths() { return `${Math.round(this.years)}.${this.months?.toString().padStart(2, "0")}`; }
    },
    beforeUnmount() {
        this.stopGame()
    }
}
</script>
<template>
    <main>
        <div id="game_information">
            <div id="game_wealth">
                <div>Dein Vermögen:</div>
                <div>{{ this.user_state.get_wealth() }} </div>
            </div>
            <div id="game_date">
                <div>Jahre/Monate seit Beginn:</div>
                <div> {{ this.getYearsMonths() }} </div>
            </div>
        </div>
        <!--<RiskGameEvent v-if="this.current_event !== null" :fired="this.fireEvent(this.current_event, this.user_state)" />-->
        <div id="event_information">
            <div>{{ this.current_event?.description }}</div>
            <div>{{ this.current_fired_event?.actual_damages}}</div>
            <div>{{ this.current_fired_event?.insurance.name }}</div>
            <button @click="this.startGame">Resume</button>
        </div>
    </main>
</template>