/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JbhTestModule } from '../../../test.module';
import { AccountTypesJbhUpdateComponent } from 'app/entities/account-types-jbh/account-types-jbh-update.component';
import { AccountTypesJbhService } from 'app/entities/account-types-jbh/account-types-jbh.service';
import { AccountTypesJbh } from 'app/shared/model/account-types-jbh.model';

describe('Component Tests', () => {
    describe('AccountTypesJbh Management Update Component', () => {
        let comp: AccountTypesJbhUpdateComponent;
        let fixture: ComponentFixture<AccountTypesJbhUpdateComponent>;
        let service: AccountTypesJbhService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JbhTestModule],
                declarations: [AccountTypesJbhUpdateComponent]
            })
                .overrideTemplate(AccountTypesJbhUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(AccountTypesJbhUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AccountTypesJbhService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new AccountTypesJbh(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.accountTypes = entity;
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
                    const entity = new AccountTypesJbh();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.accountTypes = entity;
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
