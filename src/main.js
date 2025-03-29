import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // Import router đúng cách
import './style.css' 

const app = createApp(App);
app.use(router);     
app.mount('#app');
