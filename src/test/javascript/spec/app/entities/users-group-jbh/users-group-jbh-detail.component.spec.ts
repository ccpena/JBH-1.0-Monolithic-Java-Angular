/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JbhTestModule } from '../../../test.module';
import { UsersGroupJbhDetailComponent } from 'app/entities/users-group-jbh/users-group-jbh-detail.component';
import { UsersGroupJbh } from 'app/shared/model/users-group-jbh.model';

describe('Component Tests', () => {
    describe('UsersGroupJbh Management Detail Component', () => {
        let comp: UsersGroupJbhDetailComponent;
        let fixture: ComponentFixture<UsersGroupJbhDetailComponent>;
        const route = ({ data: of({ usersGroup: new UsersGroupJbh(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JbhTestModule],
                declarations: [UsersGroupJbhDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(UsersGroupJbhDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(UsersGroupJbhDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.usersGroup).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
