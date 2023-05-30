const { Context } = require("aws-cdk/lib/settings")

exports.handler = async function (event, constext){
    console.log(event)

    if(event.request.userAttibutes.email === "email@gmail.com"){
        throw new Error("User blocked")
    }
    context.done(null, event)
}