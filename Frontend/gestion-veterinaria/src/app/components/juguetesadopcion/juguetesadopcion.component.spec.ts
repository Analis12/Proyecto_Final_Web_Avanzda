import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuguetesadopcionComponent } from './juguetesadopcion.component';

describe('JuguetesadopcionComponent', () => {
  let component: JuguetesadopcionComponent;
  let fixture: ComponentFixture<JuguetesadopcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JuguetesadopcionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JuguetesadopcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
