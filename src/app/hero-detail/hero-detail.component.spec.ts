import {ComponentFixture, TestBed} from "@angular/core/testing";
import {HeroDetailComponent} from "./hero-detail.component";
import {ActivatedRoute} from "@angular/router";
import {HeroService} from "../hero.service";
import {Location} from '@angular/common'

describe('hero-detail.component', () => {
  let mockActivatedRoute, mockLocation, mockHeroService, fixture: ComponentFixture<HeroDetailComponent>
  beforeEach(() => {

    //mocks services

    mockHeroService = jasmine.createSpyObj(['getero', 'updateHero'])
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
      declarations: [HeroDetailComponent],
      providers: [
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: Location, useValue: mockLocation},
        {provide: HeroService, useValue: mockHeroService},
      ]
    })
    fixture = TestBed.createComponent(HeroDetailComponent);
    fixture.detectChanges();
  })

  it('should render hero name inside h2 tag', () => {

  })
})
