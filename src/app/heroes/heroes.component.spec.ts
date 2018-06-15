import {HeroesComponent} from "./heroes.component";
import {Hero} from "../hero";
import {of} from "rxjs/observable/of";

describe('heroes.component', () => {
  let heroesComponent: HeroesComponent;
  let heroes: Hero[];
  let mockHeroService;
  beforeEach(() => {
    heroes = [
      {name: 'name-a', id: 1, strength: 11},
      {name: 'name-b', id: 2, strength: 22},
      {name: 'name-c', id: 3, strength: 33}
    ]
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero'])
      heroesComponent = new HeroesComponent(mockHeroService);
  })
  describe('del hero', () => {
    it('del hero when deleted', () => {
      mockHeroService.deleteHero.and.returnValue(of(true))
      heroesComponent.heroes = heroes;
      heroesComponent.delete(heroes[2])
      expect(heroesComponent.heroes.length).toEqual(2)
    })
    it('call del hero (of service...)',()=>{
      mockHeroService.deleteHero.and.returnValue(of(true))
      heroesComponent.heroes = heroes;
      heroesComponent.delete(heroes[2])
      expect(mockHeroService.deleteHero).toHaveBeenCalled();
      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(heroes[2]);
    })
  })
})
