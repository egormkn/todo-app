import { EventEmitter, Injectable, Type } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from './modal.component';

export type UserInputs<T> = {
  [P in keyof T as string]?: T[P] extends EventEmitter<unknown> ? never : T[P];
};

export type UserOutputs<T> = {
  [P in keyof T as string]?: T[P] extends EventEmitter<infer E> ? (event: E) => any : never;
};

@Injectable()
export class ModalService {
  constructor(private ngbModalService: NgbModal) {}

  open<T>(
    title: string,
    componentType: Type<T>,
    inputs: UserInputs<T> = {},
    outputs: UserOutputs<T> = {},
  ) {
    const modalRef = this.ngbModalService.open(ModalComponent, {
      centered: true,
      scrollable: true,
    });
    (modalRef.componentInstance as ModalComponent<T>).initialize(
      title,
      componentType,
      inputs,
      outputs,
    );
    return modalRef;
  }

  closeAll() {
    this.ngbModalService.dismissAll();
  }
}
