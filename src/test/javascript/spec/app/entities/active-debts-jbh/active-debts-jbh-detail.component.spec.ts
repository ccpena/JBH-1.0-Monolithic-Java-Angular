/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JbhTestModule } from '../../../test.module';
import { ActiveDebtsJbhDetailComponent } from 'app/entities/active-debts-jbh/active-debts-jbh-detail.component';
import { ActiveDebtsJbh } from 'app/shared/model/active-debts-jbh.model';

describe('Component Tests', () => {
    describe('ActiveDebtsJbh Management Detail Component', () => {
        let comp: ActiveDebtsJbhDetailComponent;
        let fixture: ComponentFixture<ActiveDebtsJbhDetailComponent>;
        const route = ({ data: of({ activeDebts: new ActiveDebtsJbh(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JbhTestModule],
                declarations: [ActiveDebtsJbhDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ActiveDebtsJbhDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ActiveDebtsJbhDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.activeDebts).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
