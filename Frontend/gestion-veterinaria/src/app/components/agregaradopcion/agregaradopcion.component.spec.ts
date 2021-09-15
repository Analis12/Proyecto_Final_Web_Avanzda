import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregaradopcionComponent } from './agregaradopcion.component';

describe('AgregaradopcionComponent', () => {
  let component: AgregaradopcionComponent;
  let fixture: ComponentFixture<AgregaradopcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregaradopcionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregaradopcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
