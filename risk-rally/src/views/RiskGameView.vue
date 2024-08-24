<script setup>
import RiskGameEvent from "../components/RiskGameEvent.vue"

this.current_event = null;
this.user_state = new UserState(100000, 900000, 1100000)
this.start_date = new Date();
this.tick_time = 1000; //nr milliseconds
this.year = this.start_date.year;

async function update(that) {
    const months_since_start = (Date.now() - that.start_date.valueOf()) / that.tick_time + 1;
    that.year = months_since_start % 12;
    that.months = Math.Ceil(months_since_start / 12);
}

setInterval(update, this.tick_time, this);


const events = [
    //// I think doing both garden and house damages is too much detail for our game tbh
    //{
    //    description: "Rohrbruch",
    //    base_occurence_per_year: 5,
    //    increase_occurence_per_year: 2,
    //    "relative": {
    //        damages_house_min: [5, 15],//percent
    //        damages_garden_min: [0, 3]
    //    }
    //},
    //{
    //    description: "Erdbeben",
    //    base_occurence_per_year: 5,
    //    increase_occurence_per_year: 0,
    //    "relative": {
    //        "damages_house_min": [20, 30],//percent
    //        "damages_garden_min": [10, 30],
    //    }
    //},
    //{
    //    description: "Fensterschaden",
    //    base_occurence_per_year: 10,
    //    increase_occurence_per_year: 0.1,
    //    "absolute": {
    //        damages: [500, 1000]
    //    }
    //},
]


//TODO add actual probabilities, maybe add seperate garden damages back, (even more kinds of damages)
function createEventAbsoluteValue(insurance, description, occurence_per_year, occurence_increase_per_year, costs_min, costs_max) {
    events.push(
        {
            base_occurence_per_year: occurence_per_year,
            increase_occurence_per_year: occurence_increase_per_year,
            damages: {absolute: [costs_min, costs_max]},
            insurance: insurance
        }
    )
}

function createEventRelativeValue(insurance, description, occurence_per_year, occurence_increase_per_year, costs_min_percentage, costs_max_percentage) {
    events.push(
        {
            base_occurence_per_year: occurence_per_year,
            increase_occurence_per_year: occurence_increase_per_year,
            damages: {relative: {costs_min_percentage, costs_max_percentage}},
            insurance: insurance
        }
    )
}


const insurances = Object.freeze({
    solar: "GVB Solar- & Photovoltaikversicherung",
    feuer_element: "GVB Natura - Feuer- und Elementarversicherung",
    surroundings: "GVB Plus - Umgebungsversicherung",
    top: "GVB Top - Ergänzungsversicherung",
    bruch: "GVB Casco - Bruchversicherung",
    earthquake: "GVB Terra - Erdbebenversicherung",
    technic: "GVB Tech - Gebäudetechnikversicherung",
    water: "GVB Aqua - Wasserversicherung",
    legal: "GVB Lex – Immobilien-Rechtsschutzversicherung",
    haftpflicht: "Gebäudehaftpflichversicherung",
    hausrat: "Hausratsversicherung",
})


createEventRelativeValue(insurances.surroundings, "Ein Baum ist in ihrem Garten umgestürzt und hat Ihr Gartenhaus beschädigt.", 10, 1, 4000, 9000);
//- Besitzen sie ein altes Gebäude? besteht bei ihnen erhöhte gefahr vor vandalismus / insekten oder anderen Wildtiere?
createEventAbsoluteValue(insurances.top, "Ihre Wände wurden Vandalisiert", 4, 0, 2000, 3000);
//- Wollen Sie gegen einbrecher geschützt sein? Haben sie viele Verglasungen in ihrem Gebäude?
createEventAbsoluteValue(insurances.bruch, "Ein Fensterglas wurde von einem Fussball zerstört", 8, 0, 500, 1000);

//Immobilien-Rechtsschutzversicherung:
//- Wollen sie bei Rechtsstreitigkeiten auf der sicheren Seite sein? Haben sie Nachbaren mit welchen sie Häufig aneinander geraten?
createEventRelativeValue(insurances.legal, "Ihr Haus wurde umgebaut und sie sehen nach Abschluss Mängel der Arbeit. Die Baufirma streitet ihre Schuld ab und sie kommen in einen Rechtstreit.", 10, 0.5, 15000, 25000);

//Solar
//- Besitzt ihr Gebäude Solaranlagen und wollen sie 100% versichert auch für ihren entgangenen Strom und folgekosten ?
createEventAbsoluteValue(insurances.solar, "Nach Hagel wurden ihre Solaranlage erheblich beschädigt und der entgangene Strom und die Folgekosten kommen zu tragen", 10, 0.5, 2000, 3000);

//earthquake:
//- Erdbeben sind in der Schweiz die Naturgefahr mit dem grössten Schadenspotenzial, dennoch sind über 90% der Wohnungen in der Schweiz sind nicht nachweislich erdbebensicher gebaut, stört sie das?
const earthquake_text = "Ihr haus ist Teil der 90% der häuser welche nicht erdbebensicher gebaut sind. Ein erdbeben trifft in Ihrer Region ein und"
createEventRelativeValue(insurances.earthquake, `${earthquake_text} verursacht leichte Setzungsrisse.`, 20, 0, 5, 10);
createEventRelativeValue(insurances.earthquake, `${earthquake_text} verursacht stärkere Setzungsrisse.`, 30, 0, 10, 20);
createEventRelativeValue(insurances.earthquake, `${earthquake_text} Ihr Haus benötigt komplete rennovationen.`, 50, 0, 30, 50);

//Wasserversicherung:
//- Ist ihr Gebäude an einem Ort wo es mehrheitlich schneit?
//- Undichte Leitung sind oft schleichende Kosten, finden sie diese für nötig?
createEventRelativeValue(insurances.water, "Eine undichte Leiung hat ihren Boden als auch einige Möbel durchnässt, die behebung des Lecks macht die Wohnung unbewohnbar.", 15, 2, 10, 20);

//gebäudetechnikversicherung:
//- besitzen sie ein gebäude mit viel neuartiger technik? (steuerungsmechanismus der storen, Klimaanlage etc)?
createEventAbsoluteValue(insurances.technic, "Die Steuerung des Storen ist defekt.", 10, 1, 1000, 2000);




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


const feelingPossibleAnswersUninsured = [
    "Ich bin zufrieden mit dem Unversichert sein",
    "Versichert und nicht versichert zu sein sind mir hier genau gleich wertvoll",
    "Ich habe ein starkes bedauern unversichert gewesen zu sein",
    "Ich dachte ich wäre versichert"
]


const getMoney = () => {this.user_state.cash}
const getMortgatge = () => {this.user_state.mortgage}
const getHouseValue = () => {this.user_state.house_value}
const getWealth = () => {this.user_state.get_wealth()}


function lerpRound(l, h, f, round) {
    return Math.round((l + (h-l) * f)/round)*round;
}

//takes an event and the user_state and returns a FiredEvent
function fireEvent(event, user_state) {
    //event happened now calculate damages
    const least_amount = 500;
    let damages = 0;
    if ("absolute" in event.damages.keys()) {
        damages = lerpRound(damages.costs_min, damages.costs_max, Math.random(), least_amount);
    }
    else {
        damages = lerpRound(damages.costs_min_percentage, damages.costs_max_percentage, Math.random(), least_amount);
    }
    new FiredEvent(event.insurance, event.description, damages);

}


const getYearsMonths = () => {`${Math.round(this.months / 12)}Jahre, ${this.months%12} Monate`}


class FiredEvent {
  constructor(insurance, description, actual_damages) {
    this.insurance = insurance;
    this.description = description;
    this.actual_damages = actual_damages;
  }
}

class UserState {
  constructor(cash, mortgage, house_value) {
    this.cash = cash;
    this.mortgage = mortgage;
    this.house_value = house_value;
  }

  get_wealth() {
    return this.cash - this.mortgage + this.house_value;
  }
}

</script>

<template>
  <main>
    <div id = "user_state">
        <div id = "wealth">
            <span>
                <div>Dein Vermögen:</div>
                <div>{{ getWealth }} </div>
            </span>
        </div>
        <div id = "ingame_date">
            <span>
                <div>Jahre/Monate:</div>
                <div> {{ getYearsMonths }} </div>
            </span>
        </div>
    </div>
    <RiskGameEvent v-if="this.current_event != null" :fired_event = "fireEvent(this.current_event, this.user_state)"/>
  </main>
</template>

<script>
</script>