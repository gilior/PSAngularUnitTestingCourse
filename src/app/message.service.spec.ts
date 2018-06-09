import {MessageService} from "./message.service";

describe('message.service',()=>{
  let messageService:MessageService;

  beforeEach(()=>{

  })

  it('no msgs',()=>{
    messageService=new MessageService();
    expect(messageService.messages.length).toEqual(0)
  })

  it('add msg if called',()=>{
    messageService=new MessageService();
    messageService.add('1st msg');
    expect(messageService.messages.length).toEqual(1)
  })

  it('clr msgs if called',()=>{
    messageService=new MessageService();
    messageService.add('1st msg');
    messageService.clear();
    expect(messageService.messages.length).toEqual(0)
  })
})
