/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JbhTestModule } from '../../../test.module';
import { ActiveDebtsJbhComponent } from 'app/entities/active-debts-jbh/active-debts-jbh.component';
import { ActiveDebtsJbhService } from 'app/entities/active-debts-jbh/active-debts-jbh.service';
import { ActiveDebtsJbh } from 'app/shared/model/active-debts-jbh.model';

describe('Component Tests', () => {
    describe('ActiveDebtsJbh Management Component', () => {
        let comp: ActiveDebtsJbhComponent;
        let fixture: ComponentFixture<ActiveDebtsJbhComponent>;
        let service: ActiveDebtsJbhService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JbhTestModule],
                declarations: [ActiveDebtsJbhComponent],
                providers: []
            })
                .overrideTemplate(ActiveDebtsJbhComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ActiveDebtsJbhComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ActiveDebtsJbhService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new ActiveDebtsJbh(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.activeDebts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
