/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JbhTestModule } from '../../../test.module';
import { MovementesOutgoingsJbhUpdateComponent } from 'app/entities/movementes-outgoings-jbh/movementes-outgoings-jbh-update.component';
import { MovementesOutgoingsJbhService } from 'app/entities/movementes-outgoings-jbh/movementes-outgoings-jbh.service';
import { MovementesOutgoingsJbh } from 'app/shared/model/movementes-outgoings-jbh.model';

describe('Component Tests', () => {
    describe('MovementesOutgoingsJbh Management Update Component', () => {
        let comp: MovementesOutgoingsJbhUpdateComponent;
        let fixture: ComponentFixture<MovementesOutgoingsJbhUpdateComponent>;
        let service: MovementesOutgoingsJbhService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JbhTestModule],
                declarations: [MovementesOutgoingsJbhUpdateComponent]
            })
                .overrideTemplate(MovementesOutgoingsJbhUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MovementesOutgoingsJbhUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MovementesOutgoingsJbhService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new MovementesOutgoingsJbh(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.movementesOutgoings = entity;
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
                    const entity = new MovementesOutgoingsJbh();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.movementesOutgoings = entity;
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
