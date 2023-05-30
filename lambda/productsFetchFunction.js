const AWS = require("aws-sdk");
const AWSXRay = require("aws-xray-sdk-core");
 
const xRay = AWSXRay.captureAWS(require("aws-sdk"));
const awsRegion = process.env.AWS_REGION
 
AWS.config.update({
   region: awsRegion,
});

const cognitoIdentityProvider = new AWS.CognitoIdentityServiceProvider({apiVersion: '2016-04-18'})
 
exports.handler = async function (event, context) {
   const apiRequestId = event.requestContext.requestId;
   const lambdaRequestId = context.awsRequestId;
   const method = event.httpMethod;

   const params = {
      AccessToken: event.headers.Authorization
   }
   const userInfo = await cognitoIdentityProvider.getUser(params).promise()
   console.log(userInfo)

   console.log(
     `API Gateway RequestId: ${apiRequestId} - Lambda RequestId: ${lambdaRequestId}`
   );
 
   if (event.resource === '/products') {
      return {
         statusCode: 200,
         headers: {},
         body: JSON.stringify("GET /products"),  
      }   
   }else if(event.resource === '/products/{id}') {
      //web 
      const productId = event.pathParameters.productId

      return {
         statusCode: 200, 
         headers: {},
         body: JSON.stringify(`GET /products/${productId}`)
      }
   }
 
   return {
      statusCode: 400,
      headers: {},
      body: JSON.stringify("Bad request"),  
   }
}