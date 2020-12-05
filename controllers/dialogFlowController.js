const {getConnection} = require('../store/db')
const {generateCardNumber, formatter} = require('../utils/')
const {v4} = require('uuid')
const axios = require('axios');
const actions = {
    AUTH: (context) => {
        const db = getConnection();
        const username = context.queryResult.parameters.name
        let user = db.get('users').find({name: username}).value();
        if (!user) {
            user = {
                id: v4(),
                name: username,
                phone: " +56972636554",
                account_number: generateCardNumber(),
                balance: 500000
            }
            db.get('users').push(user).write();
        }
        return {
            fulfillmentMessages: [
                {
                    text: {
                        text: [
                            `En que puedo ayudarte ${user.name}?`
                        ]
                    }
                }], source: 'session'
        }
    },
    BALANCE: ({queryResult}) => {
        const username = queryResult.outputContexts[0].parameters.name;

        const db = getConnection();
        const user = db.get('users').find({name: username}).value()
        return {
            fulfillmentText: `${user.name}! tu saldo actual es de ${formatter.format(user.balance)}`, source: 'session'
        }
    },
    INDICATORS: async ({queryResult}) => {
        try {
            const data = ['valor en CLP']
            const {parameters} = queryResult;
            if (parameters && parameters.indicator) {
                const resp = await axios.get(`https://mindicador.cl/api/${parameters.indicator}`);
                data.push(`${resp.data.nombre}: $${resp.data.serie[0].valor}`);
            } else {
                const resp = await axios.get("https://mindicador.cl/api");

                for (const key in resp.data) {
                    if (key === "dolar" || key === "utm" || key === "uf") {
                        const ind = resp.data[key];
                        data.push(`${ind.nombre}: $${ind.valor}`)
                    }
                }
            }
            return {
                fulfillmentMessages: [
                    {
                        text: {
                            text: data
                        }
                    }], source: 'indicators'
            };

        } catch (e) {
            return {
                fulfillmentText: `los datos economicos no estan disponibles en estos momento`, source: 'indicators'
            }
        }
    },
    TRANSFER: ({queryResult}) => {
        const {parameters} = queryResult;
        const username = queryResult.outputContexts[0].parameters.name;
        if (username && parameters && parameters.account && parameters.amount) {
            const db = getConnection();
            const amount =  parseInt(parameters.amount);
            const user = db.get('users').find({name: username}).value();
            const userDest = db.get('users').find({account_number: parameters.account}).value();
            if (user.balance < parseInt(parameters.amount)) {
                return {
                    fulfillmentText: `Su cuenta bancario no cuenta con el saldo suficiente para realizar esta operación`,
                    source: 'session'
                }
            }
            if (userDest) {
                db.get('users')
                    .find({id: userDest.id})
                    .assign({balance: userDest.balance + amount})
                    .write();
            }
            db.get('users')
                .find({id: user.id})
                .assign({balance: user.balance - amount})
                .write();
            const transfer = {
                id: v4(),
                amount: amount,
                date: new Date(),
                user_id:user.id,
                target_account: parameters.account,
                origin_account: user.account_number
            }
            db.get('transfer').push(transfer).write();
            return {
                fulfillmentMessages: [
                    {
                        text: {
                            text: [
                                `Estimado ${user.name} Se realizo con éxito la transferencia a la cuenta bancaria n°${parameters.account}`+
                                ` por el monto de ${formatter.format(amount)}`,
                                "En que mas te puedo ayudar ?"
                            ]
                        }
                    }], source: 'session'
            }

        }
    }
}
module.exports = actions;
