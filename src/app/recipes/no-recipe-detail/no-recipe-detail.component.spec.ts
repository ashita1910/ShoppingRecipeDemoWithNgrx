import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoRecipeDetailComponent } from './no-recipe-detail.component';

describe('NoRecipeDetailComponent', () => {
  let component: NoRecipeDetailComponent;
  let fixture: ComponentFixture<NoRecipeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoRecipeDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoRecipeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
