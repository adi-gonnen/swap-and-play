import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Contact from './views/Contact.vue'
import Gallery from './views/Gallery.vue'
import Login from './views/Login.vue'
import EditGame from './views/EditGame.vue'
import GameDetails from './views/GameDetails.vue'
import UserProfile from './views/ProfileDetails.vue'
import UserActivity from './views/UserActivities.vue'
import UserMatch from './views/UserMatches.vue'
import UserRequest from './views/UserRequests.vue'
import UserRecieve from './views/UserRecieved.vue'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    },
    {
      path: '/game',
      name: 'game',
      component: Gallery
    },
    {
      path: '/game/edit/:gameId?',
      name: 'edit',
      component: EditGame
    },
    {
      path: '/game/edit/user/:userId?',
      name: 'edit-user',
      component: EditGame
    },
    {
      path: '/game/:gameId?',
      name: 'game-details',
      component: GameDetails
    },
    {
      path: '/user/:userId',
      name: 'user',
      component: UserProfile
    },
    {
      path: '/user/activity/:userId',
      name: 'activity',
      component: UserActivity,
        children: [
          {
            path: 'match/',
            component: UserMatch
          },
          {
            path: 'request',
            component: UserRequest
          },
          {
            path: 'recieve',
            component: UserRecieve
          }
        ]
    }
  ]
})
