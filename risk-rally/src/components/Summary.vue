<template>
    <h2 style="padding-bottom: 30pt;">
        Ergebnis
    </h2>
    <div style="display: flex; justify-content: center; flex-direction: column; text-align: end;">

        <table>
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
                    <td :class="{'owned_insurance': data.premiums !== 0}" style="text-align:left;">{{ name }}</td>
                    <td :class="{'owned_insurance': data.premiums !== 0}">{{ formatNumber(data.premiums) }}</td>
                    <td :class="{'owned_insurance': data.premiums !== 0}">{{ formatNumber(data.benefits) }}</td>
                    <td :class="{'owned_insurance': data.premiums !== 0}">{{ formatNumber(data.benefits - data.premiums) }}</td>
                </tr>
            </tbody>
        </table>
     <div style="justify-content: left; padding-top: 15pt; text-align: left; font-size: smaller;">In <span class="owned_insurance">fett</span> Ihre ausgewählten Versicherungen.</div>
     <div style="text-align: left; padding-top: 30pt;">
        Wie stehen Sie zu ihrer Auswahl an Versicherungen?
        <button>Zufrieden</button>
        <button>Eher zufrieden</button>
        <button>Eher unzufrieden</button>
        <button>Unzufrieden</button>
     </div>
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

<style>
    th {
        font-weight: bolder;
        font-size: larger;

    }
    .owned_insurance {
        font-weight: bold;
    }
</style>