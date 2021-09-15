import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadohistoriasclinicasComponent } from './listadohistoriasclinicas.component';

describe('ListadohistoriasclinicasComponent', () => {
  let component: ListadohistoriasclinicasComponent;
  let fixture: ComponentFixture<ListadohistoriasclinicasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadohistoriasclinicasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadohistoriasclinicasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
