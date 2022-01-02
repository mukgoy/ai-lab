import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IframeWindowComponent } from './iframe-window.component';

describe('IframeWindowComponent', () => {
  let component: IframeWindowComponent;
  let fixture: ComponentFixture<IframeWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IframeWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IframeWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
