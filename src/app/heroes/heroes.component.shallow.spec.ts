import {ComponentFixture, TestBed} from "@angular/core/testing";
import {HeroesComponent} from "./heroes.component";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {HeroService} from "../hero.service";
import {of} from "rxjs/observable/of";
import {Hero} from "../hero";

describe('heroes.component (shallow)', () => {
  let mockHeroService;
  let heroes: Hero[]
  let fixture: ComponentFixture<HeroesComponent>
  beforeEach(() => {
    heroes = [
      {name: 'name-a', id: 1, strength: 11},
      {name: 'name-b', id: 2, strength: 22},
      {name: 'name-c', id: 3, strength: 33}
    ]
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero'])
    TestBed.configureTestingModule({
      declarations: [HeroesComponent],
      providers: [{provide: HeroService, useValue: mockHeroService}],
      schemas: [NO_ERRORS_SCHEMA]
    })
    fixture = TestBed.createComponent(HeroesComponent);
  })
  it('set heroes from the service', () => {
    mockHeroService.getHeroes.and.returnValue(of(heroes));
    fixture.detectChanges();
    expect(fixture.componentInstance.heroes.length).toEqual(3)
  })
})
