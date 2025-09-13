import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodResponseComponent } from './mood-response.component';

describe('MoodResponseComponent', () => {
  let component: MoodResponseComponent;
  let fixture: ComponentFixture<MoodResponseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoodResponseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoodResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
