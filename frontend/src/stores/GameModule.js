import GameService from '../services/GameService.js'

export default {
    state: {
        gamesLoading: false,
        games: [],
        gamesForHomepage: [],
        gamesBabyHome: [],
        gamesChildHome: [],
        gamesTeenHome: [],
        loggedUserGames: [],
        game: null,  
        filterSearchHome: {},           
        filterBy: {
            allByName: true,
            name: '',
            allTypes: true,
            type: [],
            allCategories: true,
            category: [],
            userId: '',
          },
        allFilterTypes: ['baby', 'child', 'teen'],
        allFilterCategories: ['console', 'doll', 'board-game', 'lego', 'playmobil', 'puzzle', 'wheels'],
    },
    mutations: {
        setGamesLoading(state, { isLoading }) {
            state.gamesLoading = isLoading;
        },
        setGames(state, { games }) {
            state.games = games;
        },
        setGame(state, { game }) {
            state.game = game;
        },
        removeGame(state, { gameId }) {
            state.games = state.games.filter(game => game._id !== gameId)
        },
        saveGame(state, { game }) {
            // console.log('mutation saveGame', game);
            let foundGameIdx = -1;
            foundGameIdx = state.games.findIndex(searchGame => searchGame._id === game._id);
            if (foundGameIdx !== -1) state.games.splice(foundGameIdx, 1, game);
            else state.games.push(game);
        },
        gamesByFilterServer(state, { games }) {
            // console.log('mutation gamesByFilterServer', games);
            state.games = games;
        },
        gamesByFilterSearch(state, { games }) {
            // console.log('mutation gamesByFilterSearch', games);
            state.games = games;
        },
        loadGamesForHomepage(state, { games }) {
            // console.log('mutation loadGamesForHomepage', games);
            state.loadGamesForHomepage = games;
            state.gamesBabyHome = state.loadGamesForHomepage.filter(game => game.type === 'baby');            
            state.gamesChildHome = state.loadGamesForHomepage.filter(game => game.type === 'child');
            state.gamesTeenHome = state.loadGamesForHomepage.filter(game => game.type === 'teen');
        },
        setFilter(state, { filterBy }) {
            // console.log('mutation setFilter', filterBy);
            state.filterBy = filterBy;
            // console.log('mutation setFilter state.filterBy', state.filterBy);
        },
        setSearchHome(state, { filterBy }) {
            // console.log('mutation setSearchHome', filterBy);
            state.filterSearchHome = filterBy;
            // console.log('mutation setFilter state.filterSearchHome', state.filterSearchHome);
        },
        loggedUserGames(state,{ games }){
            state.loggedUserGames = games;
            console.log('@@@this.loggedUserGames', state.loggedUserGames)
        }
    },
    getters: {
        types(state) {
            return state.allFilterTypes
        },
        categories(state) {
            // console.log('categories', state.allFilterCategories);
            return state.allFilterCategories
        },
        gamesByFilterServer(state) {
            // console.log('stateGames', state.games);
            return state.games
        },
        setFilter(state) {
            // console.log('stateGames', state.games);
            return state.filterBy;
        },
        gamesForBabyHomeDisplay(state) {
            return state.gamesBabyHome
        },
        gamesForChildHomeDisplay(state) {
            return state.gamesChildHome
        },
        gamesForTeenHomeDisplay(state) {
            return state.gamesTeenHome
        },
        getUserGames(state){
            return state.loggedUserGames
        },
        gameForDisplay(state) {
            // console.log('stateGame', state.game);
            return state.game
        },
        gamesLoading(state) {
            return state.gamesLoading
        }
        
    },
    actions: {
        loadGames(context) {
            context.commit({ type: 'setGamesLoading', isLoading: true })
            return GameService.query()
                .then(games => {
                    context.commit({ type: 'setGames', games })
                    return games;
                })
                .finally(() => {
                    context.commit({ type: 'setGamesLoading', isLoading: false })
                })
        },
        loadGamesForHomepage(context) {
            context.commit({ type: 'setGamesLoading', isLoading: true })
            return GameService.query()
                .then(games => {
                    context.commit({ type: 'loadGamesForHomepage', games })
                    return games;
                })
                .finally(() => {
                    context.commit({ type: 'setGamesLoading', isLoading: false });
                })
        },

        loadGame(context, { gameId }) {
            context.commit({ type: 'setGamesLoading', isLoading: true })
            // console.log('route, gameId', { gameId });
            return GameService.getGameById(gameId)
                .then((game) => {
                    context.commit({ type: 'setGame', game })
                    return game;
                })
                .finally(() => {
                    context.commit({ type: 'setGamesLoading', isLoading: false });
                })
        },
        removeGame(context, { gameId }) {
            return GameService.removeGame(gameId)
                .then(() => {
                    // console.log('remove after game service');
                    context.commit({ type: 'removeGame', gameId })
                })
        },
        saveGame(context, { savedGame }) {
            console.log('newgame in action', savedGame)
            return GameService.saveGame(savedGame)
                .then((game) => {
                    console.log('savegame in store', game);
                    context.commit({ type: 'saveGame', game })
                    return game;
                })
        },
        setFilter(context, { filterBy }) {
            context.commit({ type: 'setGamesLoading', isLoading: true })
            context.commit({ type: 'setFilter', filterBy })
            // console.log('setFilter in store: filterBy', filterBy)
            return GameService.query(filterBy)
                .then((games) => {
                    // console.log('users from server after sentFilter in store', games);
                    context.commit({ type: 'gamesByFilterServer', games })
                })
                .finally(() => {
                    context.commit({ type: 'setGamesLoading', isLoading: false });
                })
        },
        setSearchHome(context, { filterBy }){
            context.commit({ type: 'setFilter', filterBy })
            // console.log('setSearchHome in store: filterBy', filterBy)
            return GameService.query(filterBy)
                .then((games) => {
                    // console.log('users from server after setSearchHome in store', games);
                    context.commit({ type: 'gamesByFilterSearch', games })
                })
        },
        gamesById(context, { games }) {
            context.commit({ type: 'setGamesLoading', isLoading: true })
            Promise.all(
                games.map(gameId => {
                    return GameService.getGameById(gameId)
                })
            )
            .then(games =>{
                // console.log('gamesssss', games);
                context.commit({ type: 'loggedUserGames', games })
                context.commit({ type: 'setGamesLoading', isLoading: false })
            })
            // .catch(err =>{
            //     context.commit({ type: 'setGamesLoading', isLoading: false })
            // })
        }
    }
};





