import * as awsx from '@pulumi/awsx';
import * as pulumi from '@pulumi/pulumi';

const cluster = new awsx.ecs.Cluster('mlops-curriculum-iac');

const config = new pulumi.Config();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const service = new awsx.ecs.FargateService('mlops-seohyun-srvc', {
  cluster: cluster,
  taskDefinitionArgs: {
    containers: {
      container: {
        image: config.requireSecret('image'),
        cpu: 256,
        memory: 512,
        portMappings: [{ containerPort: 3000 }],
        environment: [
          {
            name: 'DB_HOST',
            value: config.requireSecret('dbHost'),
          },
          {
            name: 'DB_NAME',
            value: config.requireSecret('dbName'),
          },
          {
            name: 'DB_PASSWORD',
            value: config.requireSecret('dbPwd'),
          },
          {
            name: 'DB_PORT',
            value: config.require('dbPort'),
          },
          {
            name: 'DB_USERNAME',
            value: config.requireSecret('dbUsr'),
          },
        ],
      },
    },
  },
});

export const serviceURL = service;
