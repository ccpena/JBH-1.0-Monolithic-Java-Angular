/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JbhTestModule } from '../../../test.module';
import { AccountsJbhComponent } from 'app/entities/accounts-jbh/accounts-jbh.component';
import { AccountsJbhService } from 'app/entities/accounts-jbh/accounts-jbh.service';
import { AccountsJbh } from 'app/shared/model/accounts-jbh.model';

describe('Component Tests', () => {
    describe('AccountsJbh Management Component', () => {
        let comp: AccountsJbhComponent;
        let fixture: ComponentFixture<AccountsJbhComponent>;
        let service: AccountsJbhService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JbhTestModule],
                declarations: [AccountsJbhComponent],
                providers: []
            })
                .overrideTemplate(AccountsJbhComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AccountsJbhComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AccountsJbhService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new AccountsJbh(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.accounts[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
