import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AseosComponent } from './aseos.component';

describe('AseosComponent', () => {
  let component: AseosComponent;
  let fixture: ComponentFixture<AseosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AseosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AseosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
