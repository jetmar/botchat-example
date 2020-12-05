const {getConnection} = require('../store/db')
const {generateCardNumber,formatter} = require('../utils/')
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
            fulfillmentText: `${user.name}! tu saldo actual es de ${formatter.format(user.balance) }`, source: 'session'
        }
    },
    INDICATORS:async ({queryResult}) =>{
        try {
            const data = ['valor en CLP']
            const {parameters} = queryResult;
            if(parameters && parameters.indicator){
                const resp = await axios.get(`https://mindicador.cl/api/${parameters.indicator}`);
                data.push(`${resp.data.nombre}: $${resp.data.serie[0].valor}`);
            }
            else {
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
                    }], source: 'session'
            };

        }catch (e) {
            console.log(e);
            return {
                fulfillmentText: `los datos economicos no estan disponibles en este momento`, source: 'session'
            }
        }
    }
}
module.exports = actions;

/*
ref.on("value",(snapshot) => {
                    const users = snapshot.val()
                    console.log(users);
                    //res.json({fulfillmentText: 'hola que tal el dia ' + user.name + '?', source: 'session'});
                    Object.entries(snapshot).map(([k,v]) => v)
                    res.json(users);
                },(errorObject) => {
                    console.log("The read failed: " + errorObject.code);
                    const newUser = {
                        name: username,
                        phone:" +56972636554",
                        account_number:generateCardNumber(),
                        balance:500000
                    }
                    ref.push(newUser);
                    res.json({fulfillmentText: 'hola que tal el dia ' + newUser.name + '?', source: 'session'});
                })

 */