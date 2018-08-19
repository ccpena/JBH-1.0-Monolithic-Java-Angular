/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JbhTestModule } from '../../../test.module';
import { MembersGroupJbhDeleteDialogComponent } from 'app/entities/members-group-jbh/members-group-jbh-delete-dialog.component';
import { MembersGroupJbhService } from 'app/entities/members-group-jbh/members-group-jbh.service';

describe('Component Tests', () => {
    describe('MembersGroupJbh Management Delete Component', () => {
        let comp: MembersGroupJbhDeleteDialogComponent;
        let fixture: ComponentFixture<MembersGroupJbhDeleteDialogComponent>;
        let service: MembersGroupJbhService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JbhTestModule],
                declarations: [MembersGroupJbhDeleteDialogComponent]
            })
                .overrideTemplate(MembersGroupJbhDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MembersGroupJbhDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MembersGroupJbhService);
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
