/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JbhTestModule } from '../../../test.module';
import { MembersGroupJbhDetailComponent } from 'app/entities/members-group-jbh/members-group-jbh-detail.component';
import { MembersGroupJbh } from 'app/shared/model/members-group-jbh.model';

describe('Component Tests', () => {
    describe('MembersGroupJbh Management Detail Component', () => {
        let comp: MembersGroupJbhDetailComponent;
        let fixture: ComponentFixture<MembersGroupJbhDetailComponent>;
        const route = ({ data: of({ membersGroup: new MembersGroupJbh(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JbhTestModule],
                declarations: [MembersGroupJbhDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MembersGroupJbhDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MembersGroupJbhDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.membersGroup).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
