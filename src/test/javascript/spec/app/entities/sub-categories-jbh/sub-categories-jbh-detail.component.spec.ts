/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JbhTestModule } from '../../../test.module';
import { SubCategoriesJbhDetailComponent } from 'app/entities/sub-categories-jbh/sub-categories-jbh-detail.component';
import { SubCategoriesJbh } from 'app/shared/model/sub-categories-jbh.model';

describe('Component Tests', () => {
    describe('SubCategoriesJbh Management Detail Component', () => {
        let comp: SubCategoriesJbhDetailComponent;
        let fixture: ComponentFixture<SubCategoriesJbhDetailComponent>;
        const route = ({ data: of({ subCategories: new SubCategoriesJbh(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JbhTestModule],
                declarations: [SubCategoriesJbhDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(SubCategoriesJbhDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(SubCategoriesJbhDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.subCategories).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
