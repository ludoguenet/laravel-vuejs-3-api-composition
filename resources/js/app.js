require('./bootstrap');

require('alpinejs');

import { createApp } from "vue";
import router from "./router";

import CustomerIndex from "./components/CustomerIndex.vue";


createApp({
    components: {
        CustomerIndex
    }
})
.use(router)
.mount('#app');
