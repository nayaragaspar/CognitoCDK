import * as cdk from "@aws-cdk/core"
import { CognitoAppStack } from "../stacks/cognitoApp-stack"

interface CognitoStageProps extends cdk.StageProps{
    branch: string
}

export class CognitoStage extends cdk.Stage{
    constructor(scope: cdk.Construct, id: string, props: CognitoStageProps){
        super(scope, id, props)

        const tags = {
            ['cost']: 'Cognito',
            ['team']: 'NdgCode'
        }

        // Application Stack
        const cognitoAppStack = new CognitoAppStack(this, 'CognitoApp', {
            branch: props.branch,
            tags: tags
        })
    }
}