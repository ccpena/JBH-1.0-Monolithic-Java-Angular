/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JbhTestModule } from '../../../test.module';
import { CategoriesJbhDetailComponent } from 'app/entities/categories-jbh/categories-jbh-detail.component';
import { CategoriesJbh } from 'app/shared/model/categories-jbh.model';

describe('Component Tests', () => {
    describe('CategoriesJbh Management Detail Component', () => {
        let comp: CategoriesJbhDetailComponent;
        let fixture: ComponentFixture<CategoriesJbhDetailComponent>;
        const route = ({ data: of({ categories: new CategoriesJbh(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JbhTestModule],
                declarations: [CategoriesJbhDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(CategoriesJbhDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(CategoriesJbhDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.categories).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
