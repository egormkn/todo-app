import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  EventEmitter,
  Input,
  OnInit,
  SimpleChanges,
  Type,
  ViewChild,
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalDirective } from './modal.directive';
import { UserInputs, UserOutputs } from './modal.service';

type ComponentInputs<T> = ComponentFactory<T>['inputs'];
type ComponentOutputs<T> = ComponentFactory<T>['outputs'];

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent<T> implements OnInit {
  @Input() title = '';
  @Input() componentType?: Type<T>;
  @Input() inputs: UserInputs<T> = {};
  @Input() outputs: UserOutputs<T> = {};

  @ViewChild(ModalDirective, { static: true }) modal!: ModalDirective;

  constructor(
    public activeModal: NgbActiveModal,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) {}

  ngOnInit(): void {
    console.log('modal onInit');
  }

  ngOnDestroy(): void {
    console.log('modal onDestroy');
    // this.subscription.next(void 0);
    // this.subscription.complete();
  }

  // See https://dev.to/this-is-angular/advance-angular-dynamic-component-12e

  initialize(
    title: string,
    componentType: Type<T>,
    inputs: UserInputs<T>,
    outputs: UserOutputs<T>,
  ) {
    this.title = title;
    this.componentType = componentType;
    this.inputs = inputs;
    this.outputs = outputs;

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      this.componentType,
    );
    const viewContainerRef = this.modal.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<T>(componentFactory);
    console.log(`Binding inputs:`, this.inputs);
    this.bindInputs(componentRef.instance, componentFactory.inputs);
    console.log(`Binding outputs:`, this.outputs);
    this.bindOutputs(componentRef.instance, componentFactory.outputs);
  }

  private bindInputs(componentInstance: T, componentInputs: ComponentInputs<T>) {
    const userInputs = this.inputs as Record<string, T[keyof T]>; // FIXME: TypeScript compiler bug

    Object.keys(userInputs).forEach((userInputKey) => {
      if (!componentInputs.some(({ templateName }) => templateName === userInputKey)) {
        throw new Error(
          `Input ${userInputKey} is not a ${this.componentType?.name ?? 'dynamic component'} input`,
        );
      }
    });

    componentInputs.forEach(({ propName, templateName }) => {
      const value = userInputs[templateName];
      if (value) {
        componentInstance[propName as keyof T] = value;
      }
    });
  }

  private bindOutputs(componentInstance: T, componentOutputs: ComponentOutputs<T>) {
    const userOutputs = this.outputs as Record<string, (event: any) => void>; // FIXME: TypeScript compiler bug

    componentOutputs.forEach(({ propName }) => {
      if (!(componentInstance[propName as keyof T] instanceof EventEmitter)) {
        throw new Error(`Output ${propName} must be an instance of EventEmitter`);
      }
    });

    Object.keys(userOutputs).forEach((userOutputKey) => {
      if (!componentOutputs.some(({ templateName }) => templateName === userOutputKey)) {
        throw new Error(
          `Output ${userOutputKey} is not a ${
            this.componentType?.name ?? 'dynamic component'
          } output.`,
        );
      }
      if (!(userOutputs[userOutputKey] instanceof Function)) {
        throw new Error(`Output ${userOutputKey} must be a function`);
      }
    });

    componentOutputs.forEach(({ propName, templateName }) => {
      const handler = userOutputs[templateName];
      if (handler) {
        (componentInstance[propName as keyof T] as unknown as EventEmitter<any>)
          // .pipe(takeUntil(this.subscription))
          .subscribe((event) => {
            handler(event);
          });
      }
    });
  }
}
