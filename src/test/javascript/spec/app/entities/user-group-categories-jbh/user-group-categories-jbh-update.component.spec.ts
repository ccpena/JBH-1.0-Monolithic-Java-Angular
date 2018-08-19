/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JbhTestModule } from '../../../test.module';
import { UserGroupCategoriesJbhUpdateComponent } from 'app/entities/user-group-categories-jbh/user-group-categories-jbh-update.component';
import { UserGroupCategoriesJbhService } from 'app/entities/user-group-categories-jbh/user-group-categories-jbh.service';
import { UserGroupCategoriesJbh } from 'app/shared/model/user-group-categories-jbh.model';

describe('Component Tests', () => {
    describe('UserGroupCategoriesJbh Management Update Component', () => {
        let comp: UserGroupCategoriesJbhUpdateComponent;
        let fixture: ComponentFixture<UserGroupCategoriesJbhUpdateComponent>;
        let service: UserGroupCategoriesJbhService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JbhTestModule],
                declarations: [UserGroupCategoriesJbhUpdateComponent]
            })
                .overrideTemplate(UserGroupCategoriesJbhUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(UserGroupCategoriesJbhUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserGroupCategoriesJbhService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new UserGroupCategoriesJbh(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.userGroupCategories = entity;
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
                    const entity = new UserGroupCategoriesJbh();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.userGroupCategories = entity;
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
