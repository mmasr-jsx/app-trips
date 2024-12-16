import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoComponent } from './logo.component';
import { ActivatedRoute, RouterModule } from '@angular/router';

describe('LogoComponent', () => {
  let component: LogoComponent;
  let fixture: ComponentFixture<LogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoComponent, RouterModule],
      providers: [{ provide: ActivatedRoute, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(LogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have the logo img', () => {
    const logoImg = fixture.nativeElement.querySelector('img');
    expect(logoImg.src).toContain('/logo.jpg');
  });
});
