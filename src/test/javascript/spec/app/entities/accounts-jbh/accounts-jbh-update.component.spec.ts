/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JbhTestModule } from '../../../test.module';
import { AccountsJbhUpdateComponent } from 'app/entities/accounts-jbh/accounts-jbh-update.component';
import { AccountsJbhService } from 'app/entities/accounts-jbh/accounts-jbh.service';
import { AccountsJbh } from 'app/shared/model/accounts-jbh.model';

describe('Component Tests', () => {
    describe('AccountsJbh Management Update Component', () => {
        let comp: AccountsJbhUpdateComponent;
        let fixture: ComponentFixture<AccountsJbhUpdateComponent>;
        let service: AccountsJbhService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JbhTestModule],
                declarations: [AccountsJbhUpdateComponent]
            })
                .overrideTemplate(AccountsJbhUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AccountsJbhUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AccountsJbhService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new AccountsJbh(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.accounts = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new AccountsJbh();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.accounts = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
