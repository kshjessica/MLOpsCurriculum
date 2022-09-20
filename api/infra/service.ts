import * as awsx from '@pulumi/awsx';
import * as pulumi from '@pulumi/pulumi';
import { cluster } from './cluster';
import { dbEndpoint } from './database';

const config = new pulumi.Config();

const bkndListener = new awsx.elasticloadbalancingv2.NetworkListener(
  'bkndIac',
  { port: 3000 },
);

const service = new awsx.ecs.FargateService('bkndIac', {
  cluster: cluster,
  taskDefinitionArgs: {
    containers: {
      bkndIac: {
        image:
          '854407906105.dkr.ecr.ap-northeast-2.amazonaws.com/mlopscurriculum:mlops-seohyun',
        cpu: 256,
        memory: 512,
        portMappings: [bkndListener],
        environment: dbEndpoint.apply((e) => [
          {
            name: 'DB_HOST',
            value: e.hostname,
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
            value: e.port.toString(),
          },
          {
            name: 'DB_USERNAME',
            value: config.requireSecret('dbUser'),
          },
        ]),
      },
    },
  },
});

export { service };
