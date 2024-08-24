<script setup>
const props = defineProps(['fired'])
</script>
<template>
    <div>
        {{ fired.event }}
    </div>
    <div>
        was in CHF {{ fired.actual_damages }} Kosten resultiert.
        Hätte durch {{ fired.insurance.name }} welche {{ fired.insurance.monthly_premium }} gekostet hätte verhindert werden können.
    </div>
</template>