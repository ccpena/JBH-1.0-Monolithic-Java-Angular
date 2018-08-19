/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JbhTestModule } from '../../../test.module';
import { ActiveDebtsJbhUpdateComponent } from 'app/entities/active-debts-jbh/active-debts-jbh-update.component';
import { ActiveDebtsJbhService } from 'app/entities/active-debts-jbh/active-debts-jbh.service';
import { ActiveDebtsJbh } from 'app/shared/model/active-debts-jbh.model';

describe('Component Tests', () => {
    describe('ActiveDebtsJbh Management Update Component', () => {
        let comp: ActiveDebtsJbhUpdateComponent;
        let fixture: ComponentFixture<ActiveDebtsJbhUpdateComponent>;
        let service: ActiveDebtsJbhService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JbhTestModule],
                declarations: [ActiveDebtsJbhUpdateComponent]
            })
                .overrideTemplate(ActiveDebtsJbhUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ActiveDebtsJbhUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ActiveDebtsJbhService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new ActiveDebtsJbh(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.activeDebts = entity;
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
                    const entity = new ActiveDebtsJbh();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.activeDebts = entity;
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
