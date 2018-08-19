import MatchService from '../services/MatchService.js'
// import GameService from '../services/GameService.js';
// export const LOAD_USER = 'User/actions/loadUser'

export default {
    state: {
        activities: [],
        userId: null,
        reqCount: 0,
        // newMatch: {}
    },
    mutations: {
        setMatch(state, payload) {
            state.activities = payload.activities
        },
        setCurrUserId(state, payload) {
            state.userId = payload.payload
        },
        logoutActivities(state) {
            state.activities = []
        }
    },
    getters: {
        getMatches(state){
            if (state.activities) {
                return state.activities.filter(activity => activity.isMatch)
            }
        },
        getRecieves(state) {
            // console.log('state activity:', state.activities);
            if (state.activities) {
                return state.activities.filter(activity => {
                    return activity.userPassive.userId === state.userId && !activity.isMatch;
                    })
            }
        },
        getRequestes(state) {
            if (state.activities) { 
                return state.activities.filter(activity => {
                    return activity.userActive.userId === state.userId && !activity.isMatch
                })
            }
        },
        // getNewMatch(state) {
        //     return state.newMatch;
        // }
    },
    actions: {
        getMatch(context, payload) {
            context.commit({type: 'setCurrUserId', payload: payload.user})
            // console.log('user in store###', payload );
            MatchService.getMatch(payload.user)
               .then(activities => {
                //    console.log('match from backend in front', activities);
                   context.commit({type: 'setMatch', activities})
                   })
        },
        createMatch(context, payload) {
            MatchService.createMatch(payload.newMatch)
            .then(match => {
                   console.log('match from backend in front', match);
               })
        },
        updateMatch(context, payload) {
            MatchService.updateMatch(payload.matchDetails)
            .then(activities => {
                   console.log('match from backend in front', activities);
               })
        },
        logoutActivity(context) {
           context.commit({type: 'logoutActivities'})
        }   
    }   
}


