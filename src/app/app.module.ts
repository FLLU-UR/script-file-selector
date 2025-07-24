import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { ScriptFileProgramComponent } from './components/script-file-program/script-file-program.component';
import { ScriptFileApplicationComponent } from './components/script-file-application/script-file-application.component';
import { UIAngularComponentsModule } from '@universal-robots/ui-angular-components';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { HttpBackend, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {MultiTranslateHttpLoader} from 'ngx-translate-multi-http-loader';
import { PATH } from '../generated/contribution-constants';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
//import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { FormsModule} from '@angular/forms'
import { ScriptFileDialogComponent } from './components/script-file-program/script-file-dialog/script-file-dialog.component';
import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor-v2';
export const httpLoaderFactory = (http: HttpBackend) =>
    new MultiTranslateHttpLoader(http, [
        { prefix: PATH + '/assets/i18n/', suffix: '.json' },
        { prefix: './ui/assets/i18n/', suffix: '.json' },
    ]);

    const monacoConfig: NgxMonacoEditorConfig = {
        baseUrl: 'fllu/script-file-selector/script-file-selector/assets/monaco/min/vs'
    }

@NgModule({
    declarations: [
        ScriptFileProgramComponent,
        ScriptFileApplicationComponent,
        ScriptFileDialogComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        UIAngularComponentsModule,
        HttpClientModule,
        FormsModule,
        MonacoEditorModule.forRoot(monacoConfig),        
        TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useFactory: httpLoaderFactory, deps: [HttpBackend] },
            useDefaultLang: false,
        })
    ],
    providers: [],
})

export class AppModule implements DoBootstrap {
    constructor(private injector: Injector) {
    }

    ngDoBootstrap() {
        const scriptfileprogramComponent = createCustomElement(ScriptFileProgramComponent, {injector: this.injector});
        customElements.define('fllu-script-file-selector-script-file-program', scriptfileprogramComponent);
        const scriptfileapplicationComponent = createCustomElement(ScriptFileApplicationComponent, {injector: this.injector});
        customElements.define('fllu-script-file-selector-script-file-application', scriptfileapplicationComponent);
        const scriptfiledialogComponent = createCustomElement(ScriptFileDialogComponent, {injector: this.injector});
        customElements.define('fllu-script-file-selector-script-file-dialog', scriptfiledialogComponent);
    }

    // This function is never called, because we don't want to actually use the workers, just tell webpack about them
    registerWorkersWithWebPack() {
        new Worker(new URL('./components/script-file-application/script-file-application.behavior.worker.ts'
            /* webpackChunkName: "script-file-application.worker" */, import.meta.url), {
            name: 'script-file-application',
            type: 'module'
        });
        new Worker(new URL('./components/script-file-program/script-file-program.behavior.worker.ts'
            /* webpackChunkName: "script-file-program.worker" */, import.meta.url), {
            name: 'script-file-program',
            type: 'module'
        });
    }
}

