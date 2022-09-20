import * as awsx from '@pulumi/awsx';

const cluster = new awsx.ecs.Cluster('mlops-curriculum-iac');

export { cluster };
