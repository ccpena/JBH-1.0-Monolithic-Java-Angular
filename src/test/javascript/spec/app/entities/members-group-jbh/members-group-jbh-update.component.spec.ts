/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JbhTestModule } from '../../../test.module';
import { MembersGroupJbhUpdateComponent } from 'app/entities/members-group-jbh/members-group-jbh-update.component';
import { MembersGroupJbhService } from 'app/entities/members-group-jbh/members-group-jbh.service';
import { MembersGroupJbh } from 'app/shared/model/members-group-jbh.model';

describe('Component Tests', () => {
    describe('MembersGroupJbh Management Update Component', () => {
        let comp: MembersGroupJbhUpdateComponent;
        let fixture: ComponentFixture<MembersGroupJbhUpdateComponent>;
        let service: MembersGroupJbhService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JbhTestModule],
                declarations: [MembersGroupJbhUpdateComponent]
            })
                .overrideTemplate(MembersGroupJbhUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MembersGroupJbhUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MembersGroupJbhService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MembersGroupJbh(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.membersGroup = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MembersGroupJbh();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.membersGroup = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
