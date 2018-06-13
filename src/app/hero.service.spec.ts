import {inject, TestBed} from "@angular/core/testing";
import {HeroService} from "./hero.service";
import {MessageService} from "./message.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('hjer.service', () => {
  let mockMessageService;
  let httpTestingController: HttpTestingController;
  let messageService: MessageService;
  let heroService: HeroService
  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(['add'])
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroService,
        {provide: MessageService, useValue: mockMessageService}]
    })
    httpTestingController = TestBed.get(HttpTestingController);
    messageService = TestBed.get(MessageService);
    heroService = TestBed.get(HeroService);
  })

  describe('getHero', () => {

    //inject option
    it('should call get with correct url (inject option)', inject([HeroService, HttpTestingController],
      (service: HeroService, httpTestingController: HttpTestingController) => {
        service.getHero(4).subscribe();
      }))

    // services variable option
    it('should call get with correct url (services variable option)',
      () => {
        let heroId = 4;
        heroService.getHero(heroId).subscribe(()=>{          console.log('fulfilled')        });
        heroService.getHero(heroId+1).subscribe(()=>{          console.log('fulfilled')        });
        const req = httpTestingController.expectOne(`api/heroes/${heroId}`);
        req.flush({id:44,name:'name-aa',strength:1});
        // httpTestingController.verify();
      })
  })
})
