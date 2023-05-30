#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { PipelineStack } from '../lib/pipeline/pipeline-stack';

const app = new cdk.App();

new PipelineStack(app, 'CognitoDevPipelineStack', {
  // DEV account 
  branch: 'dev', 
  awsRegion: 'us-west-2',
  awsAccount: '822654339077', 
  env: { // management account 
    account: '411619406312', 
    region: 'us-west-2',
  }
})

new PipelineStack(app, 'CognitoProdPipelineStack', {
  // PROD account 
  branch: 'prod', 
  awsRegion: 'us-west-2',
  awsAccount: '779000149161', 
  env: { // management account 
    account: '411619406312', 
    region: 'us-west-2',
  }
})

app.synth()

// cdk deploy --profile default CognitoProdPipelineStack
//cdk bootstrap --profile ndg_dev --trust 411619406312 --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess aws://822654339077/us-west-2
//cdk bootstrap --profile ndg_prod --trust 411619406312 --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess aws://779000149161/us-west-2