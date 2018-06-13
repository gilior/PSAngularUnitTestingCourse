import {ComponentFixture, TestBed} from "@angular/core/testing";
import {HeroesComponent} from "./heroes.component";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {HeroService} from "../hero.service";
import {of} from "rxjs/observable/of";
import {Hero} from "../hero";
import {HeroComponent} from "../hero/hero.component";
import {By} from "@angular/platform-browser";


describe('heroes.component (deep)', () => {
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
      declarations: [HeroesComponent, HeroComponent],
      providers: [{provide: HeroService, useValue: mockHeroService}],
      schemas: [NO_ERRORS_SCHEMA]
    })
    fixture = TestBed.createComponent(HeroesComponent);
    mockHeroService.getHeroes.and.returnValue(of(heroes));
    fixture.detectChanges();
  })
  it('render each hero as hero component', () => {


    //run ng ngOnInit()

    let heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent))
    expect(heroComponents.length).toEqual(3);
    // expect(heroComponents[0].componentInstance.hero.name).toEqual('name-a')
    // expect(heroComponents[1].componentInstance.hero.name).toEqual('name-b')
    // expect(heroComponents[2].componentInstance.hero.name).toEqual('name-c')
  })

  it('should render correct heroes names', () => {
    let l = fixture.debugElement.queryAll(By.directive(HeroComponent));
    l.forEach(i => {
      heroes.map(i => i.name).indexOf(i.componentInstance.hero.name) != -1
    })
  })


})
