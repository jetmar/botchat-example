const express = require('express');
const router = express.Router();

router.post('/', function (req, res, next) {
    //console.log(req.body.queryResult.parameters.name);
    const action = req.body.queryResult.action;
    if(action){
        switch (action) {
            case 'AUTH':
                const user = req.body.queryResult.parameters.name;
                res.json({fulfillmentText: 'hola que tal el dia ' + user + '?', source: 'session'});
                break;
            default:
                res.json({fulfillmentText: 'creo que no entendi eso', source: 'session'});
        }
    }

})
/*router.post('/getmovie', (req, res) => {
    const movieToSearch = req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.movie ? req.body.result.parameters.movie : ''
    const reqUrl = encodeURI(`http://www.omdbapi.com/?t=${movieToSearch}&apikey=${process.env.API_KEY}`)
    http.get(reqUrl, responseFromAPI => {
        let completeResponse = ''
        responseFromAPI.on('data', chunk => {
            completeResponse += chunk
        })
        responseFromAPI.on('end', () => {
            const movie = JSON.parse(completeResponse)
            let dataToSend = movieToSearch
            dataToSend = `${movie.Title} was released in the year ${movie.Year}. It is directed by ${movie.Director} and stars ${movie.Actors}.\n Here some glimpse of the plot: ${movie.Plot}. }`
            return res.json({fulfillmentText: dataToSend, source: 'getmovie'})
        })
    }, error => {
        return res.json({fulfillmentText: 'Could not get results at this time', source: 'getmovie'})
    })
})*/
module.exports = router;