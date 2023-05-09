<script setup>
    import Navbar from '/src/components/Navbar.vue'
    import AlphabetQuiz from '/src/pages/AlphabetQuiz.vue'
    import Myanmar from '/src/pages/Myanmar.vue'
    import English from '/src/pages/English.vue'
    import Japanese from '/src/pages/Japanese.vue'
    import { goto } from '/src/router.js'
</script>

<template>
    <Navbar />
    <div class="container mx-auto p-5">
       <Myanmar v-if="$route.name == 'myanmar'"/>
       <English v-else-if="$route.name == 'english'"/>
       <Japanese v-else-if="$route.name == 'japanese'"/>
    </div>
</template>