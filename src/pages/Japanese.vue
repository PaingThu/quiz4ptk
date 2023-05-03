<script setup>
    import AlphabetQuiz from '/src/pages/AlphabetQuiz.vue'
</script>

<template>
    <div class="flex flex-col items-center gap-6">
        <h3 class="text-3xl p-5">アルファベット</h3>
        <AlphabetQuiz :compInfo="{name: 'japanese'}"/>
    </div>
</template>