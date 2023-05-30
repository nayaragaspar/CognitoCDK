const { Context } = require("aws-cdk/lib/settings")

exports.handler = async function (event, constext){
    console.log(event)

    context.done(null, event)
}