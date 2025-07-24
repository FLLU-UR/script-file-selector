import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WebComponentDialogComponent } from '@universal-robots/contribution-api/angular';
import { ScriptFileDialogData } from './script-file-dialog.data';

@Component({
  standalone: false,
  //selector: 'app-preview-dialog',
  templateUrl: './script-file-dialog.component.html',
  styleUrl: './script-file-dialog.component.scss'
})
export class ScriptFileDialogComponent implements WebComponentDialogComponent, OnInit{
  @Input()
  inputData: ScriptFileDialogData;

  @Output()
  outputDataChange = new EventEmitter();

  @Output()
  canSave = new EventEmitter<boolean>();

  constructor() {}
  editorOptions = {theme: 'vs', language: 'python'};




  onCodeChanged(value) {
    console.log('CODE', value);
  }
  ngOnInit() {
      this.outputDataChange.emit(this.inputData);
  }
}
