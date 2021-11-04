import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalService } from './modal.service';

@Component({
  selector: 'app-dummy',
  template: `Dummy Component`,
})
class DummyComponent {}

describe('ModalService', () => {
  let modalService: ModalService;
  let ngbModalSpy: jasmine.SpyObj<NgbModal>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ModalService,
        DummyComponent,
        { provide: NgbModal, useValue: jasmine.createSpyObj('NgbModal', ['open', 'dismissAll']) },
      ],
    });
    modalService = TestBed.inject(ModalService);
    ngbModalSpy = TestBed.inject(NgbModal) as jasmine.SpyObj<NgbModal>;
  });

  it('should be created', () => {
    expect(modalService).toBeTruthy();
  });

  it('should open a modal', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const stubModalRef = { componentInstance: { initialize: () => {} } } as NgbModalRef;
    ngbModalSpy.open.and.returnValue(stubModalRef);

    const modalRef = modalService.open('Dummy Title', DummyComponent);

    expect(modalRef).withContext('service returned stub value').toBe(stubModalRef);
    expect(ngbModalSpy.open).toHaveBeenCalledTimes(1);
    expect(ngbModalSpy.open.calls.mostRecent().returnValue).toBe(stubModalRef);
  });

  it('should close all modals', () => {
    modalService.closeAll();

    expect(ngbModalSpy.dismissAll).toHaveBeenCalledTimes(1);
  });
});
