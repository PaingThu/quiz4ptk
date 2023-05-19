<script setup>
    import Header from '/src/components/Header.vue'
    import Tabs from '/src/components/Tabs.vue'
    import AlphabetQuiz from '/src/pages/AlphabetQuiz.vue'

    const tabs = [
        { id:"mm01", label: "ကခဂဃင"  },
        { id:"mm02", label: "၁၂၃၄၅"  },
    ]

</script>

<template>
    <div class="flex flex-col gap-6">
        <Header />
        <!-- <Tabs :tabInfo="{ tabs: tabs }" /> -->
        <AlphabetQuiz :compInfo="{name: 'myanmar'}"/>
    </div>
</template>