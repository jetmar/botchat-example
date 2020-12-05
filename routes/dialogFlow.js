const express = require('express');
const router = express.Router();
const controller = require('../controllers/dialogFlowController')
router.post('/', async function (req, res, next) {
    //console.log(req.body.queryResult.parameters.name);
    const action = req.body.queryResult.action;
    if(action){
        try {
            const result = await controller[action](req.body);
            res.json(result)
        }
        catch (e) {
            console.log(e);
            res.json({error:e});
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