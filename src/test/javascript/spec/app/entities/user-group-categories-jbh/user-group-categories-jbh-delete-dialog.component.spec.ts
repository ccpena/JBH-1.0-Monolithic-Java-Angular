/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JbhTestModule } from '../../../test.module';
import { UserGroupCategoriesJbhDeleteDialogComponent } from 'app/entities/user-group-categories-jbh/user-group-categories-jbh-delete-dialog.component';
import { UserGroupCategoriesJbhService } from 'app/entities/user-group-categories-jbh/user-group-categories-jbh.service';

describe('Component Tests', () => {
    describe('UserGroupCategoriesJbh Management Delete Component', () => {
        let comp: UserGroupCategoriesJbhDeleteDialogComponent;
        let fixture: ComponentFixture<UserGroupCategoriesJbhDeleteDialogComponent>;
        let service: UserGroupCategoriesJbhService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JbhTestModule],
                declarations: [UserGroupCategoriesJbhDeleteDialogComponent]
            })
                .overrideTemplate(UserGroupCategoriesJbhDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(UserGroupCategoriesJbhDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserGroupCategoriesJbhService);
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
