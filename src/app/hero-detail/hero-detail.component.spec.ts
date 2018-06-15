import {async, ComponentFixture, fakeAsync, flush, TestBed, tick} from "@angular/core/testing";
import {HeroDetailComponent} from "./hero-detail.component";
import {ActivatedRoute} from "@angular/router";
import {HeroService} from "../hero.service";
import {Location} from '@angular/common';
import {of} from "rxjs/observable/of";
import {FormsModule} from "@angular/forms";

describe('hero-detail.component', () => {
  let fixture: ComponentFixture<HeroDetailComponent>;
  let mockActivatedRoute, mockHeroService, mockLocation;

  beforeEach(() => {
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => {
            return '3';
          }
        }
      }
    }
    mockHeroService = jasmine.createSpyObj(['getHero', 'updateHero']);
    mockLocation = jasmine.createSpyObj(['back']);

    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [HeroDetailComponent],
      providers: [
        {provide: ActivatedRoute, useValue: mockActivatedRoute},
        {provide: HeroService, useValue: mockHeroService},
        {provide: Location, useValue: mockLocation},
      ]
    });
    fixture = TestBed.createComponent(HeroDetailComponent);

    mockHeroService.getHero.and.returnValue(of({id: 3, name: 'SuperDude', strength: 100}));
  });

  it('should render hero name in a h2 tag', () => {
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('h2').textContent).toContain('SUPERDUDE');
  });

  it('should call updateHero when save is called (settimeout)', () => {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();


    fixture.componentInstance.save();

    setTimeout(() => {
      expect(mockHeroService.updateHero).toHaveBeenCalled()
    }, 300)


  })

  xit('should call updateHero when save is called (not working cause fakeAsync)', fakeAsync(() => {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();

    fixture.componentInstance.save();
    fixture.detectChanges();

    expect(mockHeroService.updateHero).toHaveBeenCalled()

  }))

  it('should call updateHero when save is called (fakeAsync(tick))', fakeAsync(() => {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();

    fixture.componentInstance.save();

    tick(250);
    expect(mockHeroService.updateHero).toHaveBeenCalled()

  }))


  it('should call updateHero when save is called (fakeAsync(flush))', fakeAsync(() => {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();

    fixture.componentInstance.save();

    flush()
    expect(mockHeroService.updateHero).toHaveBeenCalled()

  }))

  xit('should call updateHero when save is called (not working (async))', async(() => {
    mockHeroService.updateHero.and.returnValue(of({}));
    fixture.detectChanges();

    fixture.componentInstance.save();

    fixture.whenStable()
      .then(() => {
        expect(mockHeroService.updateHero).toHaveBeenCalled()
      })
  }))
})



