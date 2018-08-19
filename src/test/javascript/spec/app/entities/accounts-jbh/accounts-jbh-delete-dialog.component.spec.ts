/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JbhTestModule } from '../../../test.module';
import { AccountsJbhDeleteDialogComponent } from 'app/entities/accounts-jbh/accounts-jbh-delete-dialog.component';
import { AccountsJbhService } from 'app/entities/accounts-jbh/accounts-jbh.service';

describe('Component Tests', () => {
    describe('AccountsJbh Management Delete Component', () => {
        let comp: AccountsJbhDeleteDialogComponent;
        let fixture: ComponentFixture<AccountsJbhDeleteDialogComponent>;
        let service: AccountsJbhService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JbhTestModule],
                declarations: [AccountsJbhDeleteDialogComponent]
            })
                .overrideTemplate(AccountsJbhDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AccountsJbhDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AccountsJbhService);
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
