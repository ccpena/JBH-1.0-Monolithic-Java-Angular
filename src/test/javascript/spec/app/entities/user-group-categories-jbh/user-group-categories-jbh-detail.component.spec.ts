/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JbhTestModule } from '../../../test.module';
import { UserGroupCategoriesJbhDetailComponent } from 'app/entities/user-group-categories-jbh/user-group-categories-jbh-detail.component';
import { UserGroupCategoriesJbh } from 'app/shared/model/user-group-categories-jbh.model';

describe('Component Tests', () => {
    describe('UserGroupCategoriesJbh Management Detail Component', () => {
        let comp: UserGroupCategoriesJbhDetailComponent;
        let fixture: ComponentFixture<UserGroupCategoriesJbhDetailComponent>;
        const route = ({ data: of({ userGroupCategories: new UserGroupCategoriesJbh(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JbhTestModule],
                declarations: [UserGroupCategoriesJbhDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(UserGroupCategoriesJbhDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(UserGroupCategoriesJbhDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.userGroupCategories).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
