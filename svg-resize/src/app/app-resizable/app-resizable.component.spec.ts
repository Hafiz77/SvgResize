import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppResizableComponent } from './app-resizable.component';

describe('AppResizableComponent', () => {
  let component: AppResizableComponent;
  let fixture: ComponentFixture<AppResizableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppResizableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppResizableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
