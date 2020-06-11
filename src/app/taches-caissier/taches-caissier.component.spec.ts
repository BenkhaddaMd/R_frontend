import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TachesCaissierComponent } from './taches-caissier.component';

describe('TachesCaissierComponent', () => {
  let component: TachesCaissierComponent;
  let fixture: ComponentFixture<TachesCaissierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TachesCaissierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TachesCaissierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
