/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JbhTestModule } from '../../../test.module';
import { UsersGroupJbhComponent } from 'app/entities/users-group-jbh/users-group-jbh.component';
import { UsersGroupJbhService } from 'app/entities/users-group-jbh/users-group-jbh.service';
import { UsersGroupJbh } from 'app/shared/model/users-group-jbh.model';

describe('Component Tests', () => {
    describe('UsersGroupJbh Management Component', () => {
        let comp: UsersGroupJbhComponent;
        let fixture: ComponentFixture<UsersGroupJbhComponent>;
        let service: UsersGroupJbhService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JbhTestModule],
                declarations: [UsersGroupJbhComponent],
                providers: []
            })
                .overrideTemplate(UsersGroupJbhComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(UsersGroupJbhComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UsersGroupJbhService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new UsersGroupJbh(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.usersGroups[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
