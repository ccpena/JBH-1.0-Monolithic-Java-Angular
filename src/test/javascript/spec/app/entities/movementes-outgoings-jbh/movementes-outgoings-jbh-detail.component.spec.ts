/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JbhTestModule } from '../../../test.module';
import { MovementesOutgoingsJbhDetailComponent } from 'app/entities/movementes-outgoings-jbh/movementes-outgoings-jbh-detail.component';
import { MovementesOutgoingsJbh } from 'app/shared/model/movementes-outgoings-jbh.model';

describe('Component Tests', () => {
    describe('MovementesOutgoingsJbh Management Detail Component', () => {
        let comp: MovementesOutgoingsJbhDetailComponent;
        let fixture: ComponentFixture<MovementesOutgoingsJbhDetailComponent>;
        const route = ({ data: of({ movementesOutgoings: new MovementesOutgoingsJbh(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JbhTestModule],
                declarations: [MovementesOutgoingsJbhDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(MovementesOutgoingsJbhDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(MovementesOutgoingsJbhDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.movementesOutgoings).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
