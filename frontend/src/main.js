import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import router from './router'
import store from './stores/store.js'
import 'element-ui/lib/theme-chalk/index.css';
import './registerServiceWorker'
import './assets/scss/style.scss'
import axios from 'axios'
import moment from 'moment'
import { library } from '@fortawesome/fontawesome-svg-core'
// import { faGithub } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faUser, faBell, faExchangeAlt, faArrowLeft, faSearch , faFilter, faTimes, faHome, faClock } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import i18n from 'vue-i18n';
import socketIo from 'vue-socket.io';



import { faInfo } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faUpload} from '@fortawesome/free-solid-svg-icons'
// import { faAt } from '@fortawesome/free-solid-svg-icons'
// import { faLinkedin } from '@fortawesome/free-solid-svg-icons'
// import { faFacebook } from '@fortawesome/free-solid-svg-icons'
// import { faGithub } from '@fortawesome/free-solid-svg-icons'
// import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons'

const PORT = process.env.NODE_ENV !== 'production' ? '//localhost:3000' : '/';
Vue.use(socketIo, PORT, store);

Vue.component('font-awesome-icon', FontAwesomeIcon)

library.add(faCoffee);
library.add(faInfo);
library.add(faTrash);
library.add(faPen);
library.add(faPlus);
library.add(faUser);
library.add(faBell);
library.add(faAngleLeft);
library.add(faEnvelope);
library.add(faSearch);
library.add(faExchangeAlt);
library.add(faFilter); 
library.add(faTimes); 
library.add(faArrowLeft); 
library.add(faHome); 
library.add(faClock); 
library.add(faUpload); 
// library.add(faAt); 
// library.add(faLinkedin); 
// library.add(faFacebook); 
// library.add(faGithub); 


/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   components: { App },
//   template: '<App/>'
// })

Vue.use(i18n);
Vue.use(require('vue-moment'));
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.filter('getDate', (timestamp) => {  
  return moment(timestamp).fromNow();
})

axios.defaults.withCredentials = true;
Vue.config.productionTip = false
Vue.use(Element)




new Vue({
  router,
  store,
  render: h => h(App),
  created(){
    var user = localStorage.getItem('loggedInUser')
    user = JSON.parse(user)
    if (user) {
      this.$store.commit({type: 'setUser', user})
    }
  }
}).$mount('#app')
