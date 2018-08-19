/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { JbhTestModule } from '../../../test.module';
import { SubCategoriesJbhUpdateComponent } from 'app/entities/sub-categories-jbh/sub-categories-jbh-update.component';
import { SubCategoriesJbhService } from 'app/entities/sub-categories-jbh/sub-categories-jbh.service';
import { SubCategoriesJbh } from 'app/shared/model/sub-categories-jbh.model';

describe('Component Tests', () => {
    describe('SubCategoriesJbh Management Update Component', () => {
        let comp: SubCategoriesJbhUpdateComponent;
        let fixture: ComponentFixture<SubCategoriesJbhUpdateComponent>;
        let service: SubCategoriesJbhService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JbhTestModule],
                declarations: [SubCategoriesJbhUpdateComponent]
            })
                .overrideTemplate(SubCategoriesJbhUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(SubCategoriesJbhUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubCategoriesJbhService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new SubCategoriesJbh(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.subCategories = entity;
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
                    const entity = new SubCategoriesJbh();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.subCategories = entity;
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
