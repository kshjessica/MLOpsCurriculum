import * as awsx from '@pulumi/awsx';
import * as pulumi from '@pulumi/pulumi';
import { cluster } from './cluster';

const config = new pulumi.Config();

const database = new awsx.ecs.FargateService('db-iac', {
  cluster: cluster,
  taskDefinitionArgs: {
    containers: {
      db: {
        image: 'postgres',
        memory: 512,
        portMappings: [{ containerPort: 5432 }],
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

const bkndListener = new awsx.elasticloadbalancingv2.NetworkListener('lb-iac', {
  port: 5432,
});

export { cluster, database, bkndListener };
