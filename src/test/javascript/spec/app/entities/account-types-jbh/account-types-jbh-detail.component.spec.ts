/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JbhTestModule } from '../../../test.module';
import { AccountTypesJbhDetailComponent } from 'app/entities/account-types-jbh/account-types-jbh-detail.component';
import { AccountTypesJbh } from 'app/shared/model/account-types-jbh.model';

describe('Component Tests', () => {
    describe('AccountTypesJbh Management Detail Component', () => {
        let comp: AccountTypesJbhDetailComponent;
        let fixture: ComponentFixture<AccountTypesJbhDetailComponent>;
        const route = ({ data: of({ accountTypes: new AccountTypesJbh(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JbhTestModule],
                declarations: [AccountTypesJbhDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AccountTypesJbhDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AccountTypesJbhDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.accountTypes).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
