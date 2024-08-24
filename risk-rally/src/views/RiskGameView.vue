<script setup>
import RiskGameEvent from "../components/RiskGameEvent.vue";

this.current_event = null;
this.user_state = new UserState(100000, 900000, 1100000);
this.start_date = new Date();
this.tick_time = 1000; //nr milliseconds
this.year = this.start_date.year;

async function update(that) {
  const months_since_start =
    (Date.now() - that.start_date.valueOf()) / that.tick_time + 1;
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
];

//TODO add actual probabilities, maybe add seperate garden damages back, (even more kinds of damages)
function createEventAbsoluteValue(
  insurance,
  description,
  occurence_per_year,
  occurence_increase_per_year,
  costs_min,
  costs_max
) {
  events.push({
    base_occurence_per_year: occurence_per_year,
    increase_occurence_per_year: occurence_increase_per_year,
    damages: { absolute: [costs_min, costs_max] },
    insurance: insurance,
  });
}

function createEventRelativeValue(
  insurance,
  description,
  occurence_per_year,
  occurence_increase_per_year,
  costs_min_percentage,
  costs_max_percentage
) {
  events.push({
    base_occurence_per_year: occurence_per_year,
    increase_occurence_per_year: occurence_increase_per_year,
    damages: { relative: { costs_min_percentage, costs_max_percentage } },
    insurance: insurance,
  });
}

//TODO add monthly premium
const insurances = Object.freeze({
  solar: { name: "GVB Solar- & Photovoltaikversicherung", monthly_premium: 50 },
  feuer_element: {
    name: "GVB Natura - Feuer- und Elementarversicherung",
    monthly_premium: 100,
  },
  surroundings: { name: "GVB Plus - Umgebungsversicherung", monthly_premium: 80 },
  top: { name: "GVB Top - Ergänzungsversicherung", monthly_premium: 40 },
  bruch: { name: "GVB Casco - Bruchversicherung", monthly_premium: 30 },
  earthquake: { name: "GVB Terra - Erdbebenversicherung", monthly_premium: 35 },
  technic: { name: "GVB Tech - Gebäudetechnikversicherung", monthly_premium: 60 },
  water: { name: "GVB Aqua - Wasserversicherung", monthly_premium: 100 },
  legal: { name: "GVB Lex – Immobilien-Rechtsschutzversicherung", monthly_premium: 20 },
  haftpflicht: { name: "Gebäudehaftpflichversicherung", monthly_premium: 30 },
  hausrat: { name: "Hausratsversicherung", monthly_premium: 65 },
});

createEventRelativeValue(
  insurances.surroundings,
  "Ein Baum ist in ihrem Garten umgestürzt und hat Ihr Gartenhaus beschädigt.",
  10,
  1,
  4000,
  9000
);
//(https://www.police.be.ch/content/dam/police/dokumente/police-be-ch/d/statistik/kriminalstatistik/kriminalstatistik-2020-d.pdf)
// 1047473 Einwohner 2021 / 2.18 Personen pro haushalt =  480492 Haushälte 2021 / 8394 Vandalismus Fälle, 1 / 125 Wahrscheinlichkeit, 0.008%
//- Besitzen sie ein altes Gebäude? besteht bei ihnen erhöhte gefahr vor vandalismus / insekten oder anderen Wildtiere?
createEventAbsoluteValue(
  insurances.top,
  "Ihre Wände wurden Vandalisiert",
  4,
  0,
  2000,
  3000
);
//- Wollen Sie gegen einbrecher geschützt sein? Haben sie viele Verglasungen in ihrem Gebäude?
// Es gab 2023 5 Einbrüche pro 1000 Einwohner (https://www.bfs.admin.ch/bfs/de/home/statistiken/kriminalitaet-strafrecht/polizei/haeufigkeitszahlen.html)
// 1 / 200 Wahrscheinlichkeit, 0.005%
createEventAbsoluteValue(
  insurances.bruch,
  "Ein Fensterglas wurde von einem Fussball zerstört",
  8,
  0,
  500,
  1000
);
//Immobilien-Rechtsschutzversicherung:
//- Wollen sie bei Rechtsstreitigkeiten auf der sicheren Seite sein? Haben sie Nachbaren mit welchen sie Häufig aneinander geraten?
createEventRelativeValue(
  insurances.legal,
  "Ihr Haus wurde umgebaut und sie sehen nach Abschluss Mängel der Arbeit. Die Baufirma streitet ihre Schuld ab und sie kommen in einen Rechtstreit.",
  10,
  0.5,
  15000,
  25000
);

//Solar
//- Besitzt ihr Gebäude Solaranlagen und wollen sie 100% versichert auch für ihren entgangenen Strom und folgekosten ?
createEventAbsoluteValue(
  insurances.solar,
  "Nach Hagel wurden ihre Solaranlage erheblich beschädigt und der entgangene Strom und die Folgekosten kommen zu tragen",
  10,
  0.5,
  2000,
  3000
);

//earthquake:
// - Ist ihr Grundstück an einem Ort welcher Felssturz gefährdet ist?
// http://static.seismo.ethz.ch/ERM-CH23/risktool/index_DE.html (Erdbebenrisikotool)

// Durchschnittliche Anzahl von Erdbeben Basierend auf den Daten der letzten 54 Jahre sowie unserem Erdbebenarchiv mit Daten seit 1900 gibt es durchschnittlich etwa 1,100 Beben pro Jahr in der Nähe von Bern, Schweiz:
// Stärke 4 oder höher: 0.77 Beben pro Jahr (oder 1 Beben alle 1.3 Jahre)
// Stärke 3 oder höher: 10.8 Beben pro Jahr
// Stärke 2 oder höher: 125 Beben pro Jahr (oder 10.4 Beben pro Monat)
// Stärke 1 oder höher: 684 Beben pro Jahr (oder 57 Beben pro Monat)
// Bern hat ein mäßiges Maß an seismischer Aktivität. Bern hatte allerdings mindestens 42 Erdbeben der Stärke 4 oder höher seit 1970, was darauf hindeutet, dass größere Erdbeben
// dieser Stärke zwar selten, aber dennoch vorkommen,- im Durchschnitt wahrscheinlich etwa alle 1 bis 5 Jahre. //

//- Erdbeben sind in der Schweiz die Naturgefahr mit dem grössten Schadenspotenzial, dennoch sind über 90% der Wohnungen in der Schweiz sind nicht nachweislich erdbebensicher
// gebaut, stört sie das?
const earthquake_text =
  "Ihr haus ist Teil der 90% der häuser welche nicht erdbebensicher gebaut sind. Ein erdbeben trifft in Ihrer Region ein und";
createEventRelativeValue(
  insurances.earthquake,
  `${earthquake_text} verursacht leichte Setzungsrisse.`,
  20,
  0,
  5,
  10
);
createEventRelativeValue(
  insurances.earthquake,
  `${earthquake_text} verursacht stärkere Setzungsrisse.`,
  30,
  0,
  10,
  20
);
createEventRelativeValue(
  insurances.earthquake,
  `${earthquake_text} Ihr Haus benötigt komplete rennovationen.`,
  50,
  0,
  30,
  50
);

//Wasserversicherung:
//- Ist ihr Gebäude an einem Ort wo es mehrheitlich schneit? Haben sie teure Bodenbeläge?
// Alle 4 bis 5 Minuten kommt es zu wasserschaden in der Schweiz ( Quelle unsicher https://www.konsumer.ch/wasserschaden-wie-verhalte-ich-mich-richtig/)
//- Undichte Leitung sind oft schleichende Kosten, finden sie diese für nötig?
createEventRelativeValue(
  insurances.water,
  "Eine undichte Leiung hat ihren Boden als auch einige Möbel durchnässt, die behebung des Lecks macht die Wohnung unbewohnbar.",
  15,
  2,
  10,
  20
);

//gebäudetechnikversicherung:

//- besitzen sie ein gebäude mit viel neuartiger technik? (steuerungsmechanismus der storen, Klimaanlage etc)?
createEventAbsoluteValue(
  insurances.technic,
  "Die Steuerung des Storen ist defekt.",
  10,
  1,
  1000,
  2000
);

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

Quelle : Seite 30, Abb. 37. https://cms.vkg.ch/media/at1kb01p/vkf_analyse-schadendaten_de.pdf

Events (InGame)

Umgebungsversicherung:
33% der schweizer gebäude sind von den Elementarschäden erdbeben und überschwemmung betroffen, dazu kommt noch Feuerschäden, ca 36%
- Wie wichtig ist ihnen ihr Garten / ihre Terrasse / ihr grundstück welches nicht direkt ihr Gebäude ist? Verwalten sie dort Wertgegenstände?

- Feuer und Elementärschäden sind die häufigsten und insgesamt teuersten, 
jedoch ist nur das Haus selbst obligatorisch versichert, hätten sie diese weiteren Elemente(garten, terrasse) auch gern versichert?


Ergänzungsversicherung:



Bruchversicherung:


Solaranlagenversicherung:



*/

const feelingPossibleAnswersUninsured = [
  "Ich bin zufrieden mit dem Unversichert sein",
  "Versichert und nicht versichert zu sein sind mir hier genau gleich wertvoll",
  "Ich habe ein starkes bedauern unversichert gewesen zu sein",
  "Ich dachte ich wäre versichert",
];

const getMoney = () => {
  this.user_state.cash;
};
const getMortgatge = () => {
  this.user_state.mortgage;
};
const getHouseValue = () => {
  this.user_state.house_value;
};
const getWealth = () => {
  this.user_state.get_wealth();
};

function lerpRound(l, h, f, round) {
  return Math.round((l + (h - l) * f) / round) * round;
}

//takes an event and the user_state and returns a FiredEvent
function fireEvent(event, user_state) {
  //event happened now calculate damages
  const least_amount = 500;
  let damages = 0;
  if ("absolute" in event.damages.keys()) {
    damages =
      lerpRound(damages.costs_min, damages.costs_max, Math.random(), least_amount) *
      user_state.house_value();
  } else {
    damages = lerpRound(
      damages.costs_min_percentage,
      damages.costs_max_percentage,
      Math.random(),
      least_amount
    );
  }
  new FiredEvent(event.insurance, event.description, damages);
}

const getYearsMonths = () => {
  `${Math.round(this.months / 12)}Jahre, ${this.months % 12} Monate`;
};

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
    <div id="user_state">
      <div id="wealth">
        <span>
          <div>Dein Vermögen:</div>
          <div>{{ getWealth }}</div>
        </span>
      </div>
      <div id="ingame_date">
        <span>
          <div>Jahre/Monate:</div>
          <div>{{ getYearsMonths }}</div>
        </span>
      </div>
    </div>
    <RiskGameEvent
      v-if="this.current_event != null"
      :fired_event="fireEvent(this.current_event, this.user_state)"
    />
  </main>
</template>

<script></script>
