<script setup>
this.cash = 100000;
this.mortgage = 900000;
this.house_value = 1100000;
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
    {
        name: "Rohrbruch",
        base_occurence_per_year: 5,
        increase_occurence_per_year: 2,
        "percentage": {
            damages_house_min: [5, 15],//percent
            damages_garden_min: [0, 3]
        }
    },
    {
        name: "Erdbeben",
        base_occurence_per_year: 5,
        increase_occurence_per_year: 0,
        "percentage": {
            damages_house_min: [20, 30],//percent
            damages_garden_min: [10, 30],
        }
    },
    {
        name: "Fensterschaden",
        base_occurence_per_year: 10,
        increase_occurence_per_year: 0.1,
        "absolute": {
            damages: [500, 1000]
        }
    }
]


const feelingPossibleAnswersUninsured = [
    "Ich bin glücklich unversichert zu sein",
    "Starkes bedauern unversichert gewesen zu sein",
    "Ich dachte ich wäre versichert"
]

const getMoney = () => {this.cash}
const getMortgatge = () => {this.mortgage}
const getHouseValue = () => {this.house_value}
const getWealth = () => {this.cash - this.mortgage + this.house_value}


const getYearsMonths = () => {`${Math.round(this.months / 12)}Jahre, ${this.months%12} Monate`}

</script>

<template>
  <main>
    <div id = "wealth">
        <span>
            <div>Dein Vermögen:</div>
            <div>{{ getWealth }} </div>
        </span>
    </div>
    <div id = "">
        <span>
            <div>Jahre/Monate:</div>
            <div> {{ getYearsMonths }} </div>
        </span>
    </div>
  </main>
</template>

<script>
</script>