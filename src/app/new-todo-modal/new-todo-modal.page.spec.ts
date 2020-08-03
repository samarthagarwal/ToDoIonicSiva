import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewTodoModalPage } from './new-todo-modal.page';

describe('NewTodoModalPage', () => {
  let component: NewTodoModalPage;
  let fixture: ComponentFixture<NewTodoModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTodoModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewTodoModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
