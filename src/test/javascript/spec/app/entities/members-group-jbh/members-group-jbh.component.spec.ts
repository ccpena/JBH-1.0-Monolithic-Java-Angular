/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JbhTestModule } from '../../../test.module';
import { MembersGroupJbhComponent } from 'app/entities/members-group-jbh/members-group-jbh.component';
import { MembersGroupJbhService } from 'app/entities/members-group-jbh/members-group-jbh.service';
import { MembersGroupJbh } from 'app/shared/model/members-group-jbh.model';

describe('Component Tests', () => {
    describe('MembersGroupJbh Management Component', () => {
        let comp: MembersGroupJbhComponent;
        let fixture: ComponentFixture<MembersGroupJbhComponent>;
        let service: MembersGroupJbhService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JbhTestModule],
                declarations: [MembersGroupJbhComponent],
                providers: []
            })
                .overrideTemplate(MembersGroupJbhComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MembersGroupJbhComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MembersGroupJbhService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new MembersGroupJbh(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.membersGroups[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
