<template>
    <h2>
        Statistics
    </h2>
    <div style="display: flex; justify-content: center;">

    <table >
        <thead>
            <tr>
                <th style="text-align: left;">Name</th>
                <th>Prämien</th>
                <th>Auszahlungen</th>
                <th>Differenz</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(data, name) in sortedInsuranceData" :key="name">
                <td style="text-align:left;">{{ name }}</td>
                <td>{{ formatNumber(data.premiums) }}</td>
                <td>{{ formatNumber(data.benefits) }}</td>
                <td>{{ formatNumber(data.benefits - data.premiums) }}</td>
            </tr>
        </tbody>
    </table>
    </div>
</template>

<script>
export default {
    props: {
        summaryData: {
            type: Object,
            required: true
        }
    },
    computed: {
        sortedInsuranceData() {
            return Object.entries(this.summaryData.insuranceStats)
                .sort((a, b) => (b[1].benefits - b[1].premiums) - (a[1].benefits - a[1].premiums))
                .reduce((obj, [key, value]) => {
                    obj[key] = value;
                    return obj;
                }, {});
        }
    },
    methods: {
    formatNumber(num) {
      return new Intl.NumberFormat().format(num);
    }
  }
}
</script>