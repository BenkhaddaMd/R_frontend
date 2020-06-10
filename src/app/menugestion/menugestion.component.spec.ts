import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenugestionComponent } from './menugestion.component';

describe('MenugestionComponent', () => {
  let component: MenugestionComponent;
  let fixture: ComponentFixture<MenugestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenugestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenugestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
