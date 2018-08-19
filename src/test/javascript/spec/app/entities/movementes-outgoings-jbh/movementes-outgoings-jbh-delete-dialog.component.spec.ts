/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JbhTestModule } from '../../../test.module';
import { MovementesOutgoingsJbhDeleteDialogComponent } from 'app/entities/movementes-outgoings-jbh/movementes-outgoings-jbh-delete-dialog.component';
import { MovementesOutgoingsJbhService } from 'app/entities/movementes-outgoings-jbh/movementes-outgoings-jbh.service';

describe('Component Tests', () => {
    describe('MovementesOutgoingsJbh Management Delete Component', () => {
        let comp: MovementesOutgoingsJbhDeleteDialogComponent;
        let fixture: ComponentFixture<MovementesOutgoingsJbhDeleteDialogComponent>;
        let service: MovementesOutgoingsJbhService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JbhTestModule],
                declarations: [MovementesOutgoingsJbhDeleteDialogComponent]
            })
                .overrideTemplate(MovementesOutgoingsJbhDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MovementesOutgoingsJbhDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MovementesOutgoingsJbhService);
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
