import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RokuroComponent } from './rokuro.component';

describe('RokuroComponent', () => {
  let component: RokuroComponent;
  let fixture: ComponentFixture<RokuroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RokuroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RokuroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
