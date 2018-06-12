import {ComponentFixture, TestBed} from "@angular/core/testing";
import {HeroComponent} from "./hero.component";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('hero.component (shallow test)', () => {
  let fixture: ComponentFixture<HeroComponent>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeroComponent],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(HeroComponent);

  })
  it('HeroComponent has correct hero', () => {
    fixture.componentInstance.hero = {strength: 1, id: 1, name: 'name'}
    expect(fixture.componentInstance.hero.name).toEqual('name')
  })

  it('render the hero name in an anchor tag', () => {
    fixture.componentInstance.hero = {strength: 1, id: 1, name: 'name'};
    fixture.detectChanges();
    let debugElementAnchor=fixture.debugElement.query(By.css('a'));
    expect(debugElementAnchor.nativeElement.textContent).toContain('name')
    expect(fixture.nativeElement.querySelector('a').textContent).toContain('name')
  })
})
