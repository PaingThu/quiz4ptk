<script setup>
    const { tabInfo } = defineProps(['tabInfo'])
    console.log("tabInfo ", tabInfo)
</script>
<template>    
    <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul class="flex flex-wrap -mb-px">
            <template v-for="(tab, index) in tabInfo.tabs" :key="index">
                <li class="mr-2">
                    <span 
                        class="cursor-pointer inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"
                        :class="'active'"
                    >
                        {{ tab.label }}
                    </span>
                </li>
            </template>
            <!-- <li class="mr-2">
                <a href="#" class="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500" aria-current="page">Dashboard</a>
            </li>
            <li class="mr-2">
                <a href="#" class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Settings</a>
            </li>
            <li class="mr-2">
                <a href="#" class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Contacts</a>
            </li>
            <li>
                <a class="inline-block p-4 text-gray-400 rounded-t-lg cursor-not-allowed dark:text-gray-500">Disabled</a>
            </li> -->
        </ul>
    </div>
</template>