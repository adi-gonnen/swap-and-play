
import axios from 'axios'


const GAME_URL = (process.env.NODE_ENV !== 'development')? '/game': '//localhost:3000/game';

function query(criteria = {allByName: true, name: '', type: [], category: [], userId: ''}) {
    // console.log('criteria in query', criteria);
    var typeStr = '';
    if (criteria.type) typeStr = criteria.type.join(',');
    // console.log('typeStr', typeStr);
    var categoryStr = '';
    if (criteria.category) categoryStr = criteria.category.join(',');
    // console.log('categoryStr', categoryStr);
    var queryParams = `?allByName=${criteria.allByName}&name=${criteria.name}&type=${typeStr}&category=${categoryStr}&userId=${criteria.userId}`;

    // var queryParams = `?name=${criteria.name}&type=${criteria.type}&category=${criteria.category}&userId=${criteria.userId}`;
    return axios.get(GAME_URL + queryParams)
        .then(res => {
            return res.data})
}

export default {
    query,
    getGameById,
    removeGame,
    saveGame,
    createEmptyGame,
    getUserById
    // sentFilter
}

function removeGame(gameId) {
    return axios.delete(`${GAME_URL}/${gameId}`)
        .then(res => res.data)
}

function getGameById(gameId) {
    // console.log('getgameById in game service front', gameId);
    return axios.get(`${GAME_URL}/${gameId}`)
        .then(res => {
            // console.log('getgameById from server', res.data)
            return res.data
        })
        .catch(err => console.log('Problem talking to server', err))
}

function getUserById(userId) {
    // console.log('getUserById in game service front', userId);
    return axios.get(`${GAME_URL}s/${userId}`)
        .then(res => {
            // console.log('getUserById from server', res.data)
            return res.data
        })
        .catch(err => console.log('Problem talking to server!', err))
}





function saveGame(game) {
    // console.log('upadte game in fron service', game)
    if (game._id) {
        // update
        return axios.put(`${GAME_URL}/${game._id}`, game)
            .then(res => res.data)
            .catch(err => console.log('Problem talking to server', err))
    
    } else {
        //add new
        // console.log('new toy in fron service', game)
        return axios.post(`${GAME_URL}`, game)
            .then(res => {
                // console.log('add new in front after server', res.data)
                // console.log('add new in front - res', res)
                // console.log('add new in front - id', res.data.insertId)
                return res.data
            })
            .catch(err => console.log('Problem talking to server', err))
    }
}


function createEmptyGame(userId) {
    // console.log('userrrrrr ', userId);    
    var game = {
            name: '',
            type: '',
            desc: '',
            src: '',
            condition:'',
            category: '',
            addedAt: Date.now(),
            isAvailble: true,
            isNew: true,
            userId: userId
    }
    return game;
}

