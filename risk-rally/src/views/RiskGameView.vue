<script setup>
const events = [
  {
    name: 'Rohrbruch',
    base_occurence_per_year: 5,
    increase_occurence_per_year: 2,
    damages_house_min: [5, 15] //percent
  }
]

const getMoney = () => {
  this.money
}

const getYearsMonths = () => {
  ;`${Math.round(this.months / 12)}Jahre, ${this.months % 12} Monate`
}
</script>

<template>
  <main>
    <div>Dein Vermögen:</div>
    <div>{{ getMoney }}</div>
    <div>Jahre/Monate</div>
    <div>
      {{ getYearsMonths }}
    </div>
  </main>
</template>
