import { ApplicationNode } from '@universal-robots/contribution-api';

export interface ScriptFileApplicationNode extends ApplicationNode {
  type: string;
  version: string;
}
