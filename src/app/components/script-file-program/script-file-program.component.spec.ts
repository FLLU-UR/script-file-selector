import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ScriptFileProgramComponent} from "./script-file-program.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {Observable, of} from "rxjs";

describe('ScriptFileProgramComponent', () => {
  let fixture: ComponentFixture<ScriptFileProgramComponent>;
  let component: ScriptFileProgramComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScriptFileProgramComponent],
      imports: [TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader, useValue: {
            getTranslation(): Observable<Record<string, string>> {
              return of({});
            }
          }
        }
      })],
    }).compileComponents();

    fixture = TestBed.createComponent(ScriptFileProgramComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
