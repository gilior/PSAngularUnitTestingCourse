import {ComponentFixture, TestBed} from "@angular/core/testing";
import {HeroesComponent} from "./heroes.component";
import {Component, Input, NO_ERRORS_SCHEMA} from "@angular/core";
import {HeroService} from "../hero.service";
import {of} from "rxjs/observable/of";
import {Hero} from "../hero";
import {By} from "@angular/platform-browser";


describe('heroes.component (shallow)', () => {
  let mockHeroService;
  let heroes: Hero[]
  let fixture: ComponentFixture<HeroesComponent>

  @Component({
    selector: 'app-hero',
    template: '<div></div>',
    // templateUrl: './hero.component.html',
    // styleUrls:  ['./hero.component.css']
  })
  class FakeHeroComponent {
    @Input() hero: Hero;
    // @Output() delete = new EventEmitter();

    // onDeleteClick($event): void {
    //   $event.stopPropagation();
    //   this.delete.next();
    // }
  }

  beforeEach(() => {
    heroes = [
      {name: 'name-a', id: 1, strength: 11},
      {name: 'name-b', id: 2, strength: 22},
      {name: 'name-c', id: 3, strength: 33}
    ]
    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero'])
    TestBed.configureTestingModule({
      declarations: [HeroesComponent, FakeHeroComponent],
      providers: [{provide: HeroService, useValue: mockHeroService}],
      // schemas: [NO_ERRORS_SCHEMA]
    })
    fixture = TestBed.createComponent(HeroesComponent);
  })
  it('set heroes from the service', () => {
    mockHeroService.getHeroes.and.returnValue(of(heroes));
    fixture.detectChanges();
    expect(fixture.componentInstance.heroes.length).toEqual(3)
  })

  it('create 1 li for each hero', () => {
    mockHeroService.getHeroes.and.returnValue(of(heroes));
    fixture.detectChanges();
    let debugElementAnchor = fixture.debugElement.queryAll(By.css('li'));
    expect(debugElementAnchor.length).toEqual(3);
    // expect(fixture.nativeElement.querySelector('a').count).toEqual(3)
  })
})
