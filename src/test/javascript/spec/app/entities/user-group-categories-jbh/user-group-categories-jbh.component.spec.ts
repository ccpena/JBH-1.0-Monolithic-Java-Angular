/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JbhTestModule } from '../../../test.module';
import { UserGroupCategoriesJbhComponent } from 'app/entities/user-group-categories-jbh/user-group-categories-jbh.component';
import { UserGroupCategoriesJbhService } from 'app/entities/user-group-categories-jbh/user-group-categories-jbh.service';
import { UserGroupCategoriesJbh } from 'app/shared/model/user-group-categories-jbh.model';

describe('Component Tests', () => {
    describe('UserGroupCategoriesJbh Management Component', () => {
        let comp: UserGroupCategoriesJbhComponent;
        let fixture: ComponentFixture<UserGroupCategoriesJbhComponent>;
        let service: UserGroupCategoriesJbhService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JbhTestModule],
                declarations: [UserGroupCategoriesJbhComponent],
                providers: []
            })
                .overrideTemplate(UserGroupCategoriesJbhComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(UserGroupCategoriesJbhComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserGroupCategoriesJbhService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new UserGroupCategoriesJbh(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.userGroupCategories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
