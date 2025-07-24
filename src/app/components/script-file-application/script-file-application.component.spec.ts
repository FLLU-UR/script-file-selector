import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ScriptFileApplicationComponent} from "./script-file-application.component";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {Observable, of} from "rxjs";

describe('ScriptFileApplicationComponent', () => {
  let fixture: ComponentFixture<ScriptFileApplicationComponent>;
  let component: ScriptFileApplicationComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScriptFileApplicationComponent],
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

    fixture = TestBed.createComponent(ScriptFileApplicationComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
