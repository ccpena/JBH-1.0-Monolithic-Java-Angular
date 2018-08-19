/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JbhTestModule } from '../../../test.module';
import { AccountTypesJbhComponent } from 'app/entities/account-types-jbh/account-types-jbh.component';
import { AccountTypesJbhService } from 'app/entities/account-types-jbh/account-types-jbh.service';
import { AccountTypesJbh } from 'app/shared/model/account-types-jbh.model';

describe('Component Tests', () => {
    describe('AccountTypesJbh Management Component', () => {
        let comp: AccountTypesJbhComponent;
        let fixture: ComponentFixture<AccountTypesJbhComponent>;
        let service: AccountTypesJbhService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JbhTestModule],
                declarations: [AccountTypesJbhComponent],
                providers: []
            })
                .overrideTemplate(AccountTypesJbhComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AccountTypesJbhComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AccountTypesJbhService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new AccountTypesJbh(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.accountTypes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
