const express = require('express');
const router = express.Router();
const controller = require('../controllers/dialogFlowController')
const path = require('path')
router.post('/', async (req, res, next) => {
    const action = req.body.queryResult.action;
    const url = req.protocol + '://' + req.get('host');
    if (action) {
        try {
            const result = await controller[action](req.body, url);
            res.json(result)
        } catch (e) {
            res.json({
                fulfillmentText: `no podemos procesar tu solicitud en estos momentos`, source: 'error'
            });
        }
    }

})
router.get('/proof', (req, res) => {
    let doc = req.query.doc;
    const directoryPath = path.join(appRoot, "documents/");

    res.download(directoryPath + "/" + doc, doc, (err) => {
        if (err) {
            res.status(500).send({
                message: "no se puede descargar en archivo " + err,
            });
        }
    });
})
module.exports = router;