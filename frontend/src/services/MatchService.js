import axios from 'axios'


const MATCH_URL = (process.env.NODE_ENV !== 'development')? '/match': '//localhost:3000/match';

function getMatch(userId) {
    // console.log('matchId****:', userId);
    return axios.get(`${MATCH_URL}/${userId}`, {match: userId})
        .then(res => {
            // console.log('matchId%%:', res.data);
            const match = res.data;
            return match;
        })
        .catch(err => err)
}

function createMatch(matchStarter){
    // console.log('match service recived1:',matchStarter)
    return axios.post(`${MATCH_URL}`, matchStarter)
    .then(res => {
        // console.log('add match in front - res', res)
        return res.data
    })
    .catch(err => console.log('Problem talking to server', err))

}

function updateMatch(matchDetails){
    // console.log('&&&match service details:',matchDetails)
    return axios.put(`${MATCH_URL}/${matchDetails.matchId}`, {match: matchDetails})
            .then(res => res.data)
            .catch(err => console.log('Problem talking to server', err))
}

export default {
    getMatch,
    createMatch,
    updateMatch
}
