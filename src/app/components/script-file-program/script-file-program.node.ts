import { ProgramNode } from '@universal-robots/contribution-api';

export interface ScriptFileProgramNode extends ProgramNode {
    type: string;
    fileName?: string;
    scriptContent?: string;
    lockChildren?: boolean;
    allowsChildren?: boolean;

}
