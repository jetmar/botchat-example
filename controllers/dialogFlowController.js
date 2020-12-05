const {getConnection} = require('../store/db')
const {generateCardNumber,formatter} = require('../utils/')
const {v4} = require('uuid')
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