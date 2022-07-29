import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

const config = new pulumi.Config();

const db = new aws.rds.Instance('mlops-seohyun-db-iac', {
  allocatedStorage: 10,
  engine: 'postgres',
  engineVersion: '14.1',
  instanceClass: 'db.t3.micro',
  name: config.requireSecret('dbName'),
  parameterGroupName: 'default.postgres14',
  password: config.requireSecret('dbPwd'),
  skipFinalSnapshot: true,
  username: config.requireSecret('dbUsr'),

  //   port: 5432,
  //   storageType: 'gp2',
  //   publiclyAccessible: false,
  //   vpcSecurityGroupIds: ['sg-0d74b2ca330144c7c'],
});

export { db };
