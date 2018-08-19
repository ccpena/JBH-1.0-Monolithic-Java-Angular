/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JbhTestModule } from '../../../test.module';
import { ActiveDebtsJbhDeleteDialogComponent } from 'app/entities/active-debts-jbh/active-debts-jbh-delete-dialog.component';
import { ActiveDebtsJbhService } from 'app/entities/active-debts-jbh/active-debts-jbh.service';

describe('Component Tests', () => {
    describe('ActiveDebtsJbh Management Delete Component', () => {
        let comp: ActiveDebtsJbhDeleteDialogComponent;
        let fixture: ComponentFixture<ActiveDebtsJbhDeleteDialogComponent>;
        let service: ActiveDebtsJbhService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JbhTestModule],
                declarations: [ActiveDebtsJbhDeleteDialogComponent]
            })
                .overrideTemplate(ActiveDebtsJbhDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ActiveDebtsJbhDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ActiveDebtsJbhService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
