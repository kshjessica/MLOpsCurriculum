import * as awsx from '@pulumi/awsx';
import * as pulumi from '@pulumi/pulumi';

const cluster = new awsx.ecs.Cluster('mlops-curriculum-iac');
const dbListener = new awsx.elasticloadbalancingv2.NetworkListener('db', {
  port: 5432,
});
const serviceListener = new awsx.elasticloadbalancingv2.NetworkListener(
  'mlops-seohyun-srvc',
  { port: 3000 },
);
const endpoint = dbListener.endpoint;

const config = new pulumi.Config();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const service = new awsx.ecs.FargateService('mlops-seohyun-srvc', {
  cluster: cluster,
  taskDefinitionArgs: {
    containers: {
      container: {
        image:
          '854407906105.dkr.ecr.ap-northeast-2.amazonaws.com/mlopscurriculum:mlops-seohyun',
        cpu: 256,
        memory: 512,
        portMappings: [serviceListener],
        environment: endpoint.apply((e) => [
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
            value: e.port.toString(),
          },
          {
            name: 'DB_USERNAME',
            value: config.requireSecret('dbUsr'),
          },
        ]),
      },
    },
  },
});

export const serviceURL = serviceListener.endpoint;
