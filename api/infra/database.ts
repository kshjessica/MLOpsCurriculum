import * as awsx from '@pulumi/awsx';
import * as pulumi from '@pulumi/pulumi';
import { cluster } from './cluster';

const config = new pulumi.Config();

const dbListener = new awsx.elasticloadbalancingv2.NetworkListener('dbIac', {
  port: 5432,
});
const dbEndpoint = dbListener.endpoint;

const database = new awsx.ecs.FargateService('dbIac', {
  cluster: cluster,
  taskDefinitionArgs: {
    containers: {
      db: {
        image: 'postgres',
        memory: 512,
        portMappings: [dbListener],
        environment: [
          {
            name: 'POSTGRES_NAME',
            value: config.requireSecret('pgName'),
          },
          {
            name: 'POSTGRES_PASSWORD',
            value: config.requireSecret('pgPwd'),
          },
          {
            name: 'POSTGRES_USER',
            value: config.requireSecret('pgUser'),
          },
        ],
      },
    },
  },
});

export { database, dbEndpoint };
