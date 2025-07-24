/// <reference lib="webworker" />
import {
    InsertionContext,
    OptionalPromise,
    ProgramBehaviors,
    ProgramNode,
    registerProgramBehavior,
    ScriptBuilder,
    ValidationContext,
    ValidationResponse
} from '@universal-robots/contribution-api';
import { ScriptFileProgramNode } from './script-file-program.node';

// programNodeLabel is required
const createProgramNodeLabel = async (node: ScriptFileProgramNode): Promise<string> => {
    if(node.scriptContent !== undefined && node.fileName !== undefined) {
        return `${node.fileName}`;
    } else if (node.scriptContent !== undefined) {
        const firstLine = node.scriptContent.split('\n')[0];
        return firstLine;
    } else {
        return `Script not defined`;
    }
};

// factory is required
const createProgramNode = (): OptionalPromise<ScriptFileProgramNode> => ({
    type: 'fllu-script-file-selector-script-file-program',
    version: '1.0.0',
    lockChildren: false,
    allowsChildren: false,

});

// generateCodeBeforeChildren is optional
const generateScriptCodeBefore =  async (node: ScriptFileProgramNode): Promise<ScriptBuilder> => {     const builder = new ScriptBuilder();
    if(node.scriptContent){
        builder.addRaw(node.scriptContent)  
    }  
    return builder;
}

// generateCodeAfterChildren is optional
const generateScriptCodeAfter = (node: ScriptFileProgramNode): OptionalPromise<ScriptBuilder> => new ScriptBuilder();

// generateCodePreamble is optional
const generatePreambleScriptCode = (node: ScriptFileProgramNode): OptionalPromise<ScriptBuilder> => new ScriptBuilder();

// validator is optional
const validate = (node: ScriptFileProgramNode, validationContext: ValidationContext): OptionalPromise<ValidationResponse> => ({
    isValid: node.scriptContent !== undefined 
});

// allowsChild is optional
const allowChildInsert = (node: ProgramNode, childType: string): OptionalPromise<boolean> => true;

// allowedInContext is optional
const allowedInsert = (insertionContext: InsertionContext): OptionalPromise<boolean> => true;

// upgradeNode is optional
const nodeUpgrade = (loadedNode: ProgramNode): ProgramNode => loadedNode;

const behaviors: ProgramBehaviors = {
    programNodeLabel: createProgramNodeLabel,
    factory: createProgramNode,
    generateCodeBeforeChildren: generateScriptCodeBefore,
    generateCodeAfterChildren: generateScriptCodeAfter,
    generateCodePreamble: generatePreambleScriptCode,
    validator: validate,
    allowsChild: allowChildInsert,
    allowedInContext: allowedInsert,
    upgradeNode: nodeUpgrade
};

registerProgramBehavior(behaviors);
