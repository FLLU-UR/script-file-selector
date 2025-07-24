import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ProgramPresenter, ProgramPresenterAPI, RobotSettings } from '@universal-robots/contribution-api';
import { ScriptFileProgramNode } from './script-file-program.node';
import { first } from 'rxjs/operators';
import { ScriptFileDialogData } from './script-file-dialog/script-file-dialog.data';
import { DialogSize, GenericDialogOptions } from '@universal-robots/ui-models';
import { VENDOR_ID, URCAP_ID } from 'src/generated/contribution-constants';
import { DialogRef } from '@universal-robots/ui-angular-components';

@Component({
    templateUrl: './script-file-program.component.html',
    styleUrls: ['./script-file-program.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})

export class ScriptFileProgramComponent implements OnChanges, ProgramPresenter {
    // presenterAPI is optional
    @Input() presenterAPI: ProgramPresenterAPI;

    // robotSettings is optional
    @Input() robotSettings: RobotSettings;
    // contributedNode is optional
    @Input() contributedNode: ScriptFileProgramNode;


    constructor(
        protected readonly translateService: TranslateService,
        protected readonly cd: ChangeDetectorRef
    ) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes?.robotSettings) {
            if (!changes?.robotSettings?.currentValue) {
                return;
            }

            if (changes?.robotSettings?.isFirstChange()) {
                if (changes?.robotSettings?.currentValue) {
                    this.translateService.use(changes?.robotSettings?.currentValue?.language);
                }
                this.translateService.setDefaultLang('en');
            }

            this.translateService
                .use(changes?.robotSettings?.currentValue?.language)
                .pipe(first())
                .subscribe(() => {
                    this.cd.detectChanges();
                });
        }
    }





    onFileSelected(event: any) {
        const file: File = event.target.files[0];
        this.contributedNode.fileName = file.name;
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                const fileContent = e.target.result;
                this.contributedNode.scriptContent = fileContent;
                this.saveNode()
            };
            reader.readAsText(file)
        }
    }

    showScriptCode() {
        const scriptFileDialogData: ScriptFileDialogData = {
            scriptContent: this.contributedNode.scriptContent ?? ""
        }

        const dialogOption: GenericDialogOptions = {
            cancelText: "Close without Saving",
            confirmText: "Save Changes",
            dialogSize: DialogSize.XXL,
            raiseForKeyboard: true,
            showHeader: false
        }

        this.presenterAPI.dialogService.openCustomDialog<ScriptFileDialogData>(
            `${VENDOR_ID}-${URCAP_ID}-script-file-dialog`,
            scriptFileDialogData,
            dialogOption
        ).then((result) => {
            if (result.returnData?.scriptContent) {
                this.contributedNode.scriptContent = result.returnData.scriptContent;
                this.saveNode();
            }
        });
    }

    // call saveNode to save node parameters
    async saveNode() {
        this.cd.detectChanges();
        await this.presenterAPI.programNodeService.updateNode(this.contributedNode);
        console.log(this.contributedNode.scriptContent)
    }
}
