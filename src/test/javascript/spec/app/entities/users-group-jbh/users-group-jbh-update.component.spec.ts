/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JbhTestModule } from '../../../test.module';
import { UsersGroupJbhUpdateComponent } from 'app/entities/users-group-jbh/users-group-jbh-update.component';
import { UsersGroupJbhService } from 'app/entities/users-group-jbh/users-group-jbh.service';
import { UsersGroupJbh } from 'app/shared/model/users-group-jbh.model';

describe('Component Tests', () => {
    describe('UsersGroupJbh Management Update Component', () => {
        let comp: UsersGroupJbhUpdateComponent;
        let fixture: ComponentFixture<UsersGroupJbhUpdateComponent>;
        let service: UsersGroupJbhService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JbhTestModule],
                declarations: [UsersGroupJbhUpdateComponent]
            })
                .overrideTemplate(UsersGroupJbhUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(UsersGroupJbhUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UsersGroupJbhService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new UsersGroupJbh(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.usersGroup = entity;
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
                    const entity = new UsersGroupJbh();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.usersGroup = entity;
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
