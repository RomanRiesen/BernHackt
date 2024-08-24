<script setup>
const props = defineProps(['fired'])
</script>
<template>
    <div>
        {{ fired.event }}
    </div>
    <div>
        was in CHF {{ fired.actual_damages }} Kosten resultiert.
    </div>
</template>