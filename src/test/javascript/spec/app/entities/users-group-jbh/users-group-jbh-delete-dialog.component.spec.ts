/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JbhTestModule } from '../../../test.module';
import { UsersGroupJbhDeleteDialogComponent } from 'app/entities/users-group-jbh/users-group-jbh-delete-dialog.component';
import { UsersGroupJbhService } from 'app/entities/users-group-jbh/users-group-jbh.service';

describe('Component Tests', () => {
    describe('UsersGroupJbh Management Delete Component', () => {
        let comp: UsersGroupJbhDeleteDialogComponent;
        let fixture: ComponentFixture<UsersGroupJbhDeleteDialogComponent>;
        let service: UsersGroupJbhService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JbhTestModule],
                declarations: [UsersGroupJbhDeleteDialogComponent]
            })
                .overrideTemplate(UsersGroupJbhDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(UsersGroupJbhDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UsersGroupJbhService);
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
