import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplaceCatalogComponent } from './replace-catalog.component';

describe('ReplaceCatalogComponent', () => {
  let component: ReplaceCatalogComponent;
  let fixture: ComponentFixture<ReplaceCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReplaceCatalogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplaceCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
