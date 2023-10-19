import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityCostCalculatorComponent } from './opportunity-cost-calculator.component';

describe('OpportunityCostCalculatorComponent', () => {
  let component: OpportunityCostCalculatorComponent;
  let fixture: ComponentFixture<OpportunityCostCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpportunityCostCalculatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpportunityCostCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
