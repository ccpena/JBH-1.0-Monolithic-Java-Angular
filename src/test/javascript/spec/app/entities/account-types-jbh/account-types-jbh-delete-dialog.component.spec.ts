/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JbhTestModule } from '../../../test.module';
import { AccountTypesJbhDeleteDialogComponent } from 'app/entities/account-types-jbh/account-types-jbh-delete-dialog.component';
import { AccountTypesJbhService } from 'app/entities/account-types-jbh/account-types-jbh.service';

describe('Component Tests', () => {
    describe('AccountTypesJbh Management Delete Component', () => {
        let comp: AccountTypesJbhDeleteDialogComponent;
        let fixture: ComponentFixture<AccountTypesJbhDeleteDialogComponent>;
        let service: AccountTypesJbhService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JbhTestModule],
                declarations: [AccountTypesJbhDeleteDialogComponent]
            })
                .overrideTemplate(AccountTypesJbhDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AccountTypesJbhDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AccountTypesJbhService);
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
