/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JbhTestModule } from '../../../test.module';
import { AccountsJbhDetailComponent } from 'app/entities/accounts-jbh/accounts-jbh-detail.component';
import { AccountsJbh } from 'app/shared/model/accounts-jbh.model';

describe('Component Tests', () => {
    describe('AccountsJbh Management Detail Component', () => {
        let comp: AccountsJbhDetailComponent;
        let fixture: ComponentFixture<AccountsJbhDetailComponent>;
        const route = ({ data: of({ accounts: new AccountsJbh(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JbhTestModule],
                declarations: [AccountsJbhDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AccountsJbhDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AccountsJbhDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.accounts).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
