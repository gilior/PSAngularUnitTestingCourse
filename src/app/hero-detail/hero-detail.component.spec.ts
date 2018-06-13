import {ComponentFixture, TestBed} from "@angular/core/testing";
import {HeroDetailComponent} from "./hero-detail.component";
import {ActivatedRoute} from "@angular/router";
import {HeroService} from "../hero.service";
import {Location} from '@angular/common'
import {By} from "@angular/platform-browser";
import {of} from "rxjs/observable/of";
import {FormsModule} from "@angular/forms";
import {Hero} from "../hero";

describe('hero-detail.component', () => {
  let mockActivatedRoute, mockLocation, mockHeroService, fixture: ComponentFixture<HeroDetailComponent>
  beforeEach(() => {

    //mocks services

    mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero'])
    mockLocation = jasmine.createSpyObj(['back'])
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => {
            return '3'
          }
        }
      }
    }
    TestBed.configureTestingModule({
      imports:[FormsModule],
      declarations: [HeroDetailComponent],
      providers: [
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: Location, useValue: mockLocation},
        {provide: HeroService, useValue: mockHeroService},
      ]
    })
    fixture = TestBed.createComponent(HeroDetailComponent);
    mockHeroService.getHero.and.returnValue(of(<Hero>{name:'foo',id:1,strength:11}))
    fixture.detectChanges();
  })

  it('should render hero name inside h2 tag', () => {
    // let h2NativeElement = fixture.debugElement.query(By.css('h2')).nativeElement;
    fixture.detectChanges();
    let h2NativeElement = fixture.nativeElement.querySelector('h2');
    expect(h2NativeElement.textContent).toContain('FOO')
  })
})
