class ResponseBuilder {
    constructor(source) {
        this.response ={
            fulfillmentMessages:[],
            source
        }
    }
    addText(text){
        let textArray =[]
        if(Array.isArray(text)){
            textArray = text;
        }else if (typeof text === 'string'){
            textArray.push(text);
        }else {
            textArray.push("")
        }
        const previous=this.response.fulfillmentMessages.findIndex(x => x.text);
        if(previous>=0){
            this.response.fulfillmentMessages[previous].text.text.push(textArray)
        }else {
            this.response.fulfillmentMessages.push({
                text: {
                    text: textArray
                }
            })
        }
    }
    addChips(chips){
        if(Array.isArray(chips)){
            const previous = this.response.fulfillmentMessages.findIndex(x => x.payload);
            console.log(previous)
            if(previous >= 0){
                const previousChips = this.response.fulfillmentMessages[previous].payload.richContent[0].findIndex(x => x.type === "chips");
                if(previousChips >= 0){
                    this.response.fulfillmentMessages[previous].payload.richContent[0][previousChips].options.push(chips)
                }
                else {
                    this.response.fulfillmentMessages[previous].payload.richContent[0].push({
                        type: "chips",
                        options: chips
                    })
                }
            }
            else {
                this.response.fulfillmentMessages.push({
                    payload: {
                        richContent: [
                            [
                                {
                                    type: "chips",
                                    options: chips
                                }
                            ]
                        ]
                    }
                })
            }
        }
    }
    addRawRichContent(content){
        if(typeof content === "object"){
            const  previous =this.response.fulfillmentMessages.findIndex(x => x.payload);
            if(previous>= 0){
                this.response.fulfillmentMessages[previous].payload.richContent[0].push(content);
            }
            else {
                this.response.fulfillmentMessages.push({
                    payload: {
                        richContent: [
                            [
                                content
                            ]
                        ]
                    }
                })
            }
        }
    }
    getResponse(){
        return this.response;
    }
}
module.exports = ResponseBuilder