/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JbhTestModule } from '../../../test.module';
import { MovementesOutgoingsJbhComponent } from 'app/entities/movementes-outgoings-jbh/movementes-outgoings-jbh.component';
import { MovementesOutgoingsJbhService } from 'app/entities/movementes-outgoings-jbh/movementes-outgoings-jbh.service';
import { MovementesOutgoingsJbh } from 'app/shared/model/movementes-outgoings-jbh.model';

describe('Component Tests', () => {
    describe('MovementesOutgoingsJbh Management Component', () => {
        let comp: MovementesOutgoingsJbhComponent;
        let fixture: ComponentFixture<MovementesOutgoingsJbhComponent>;
        let service: MovementesOutgoingsJbhService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JbhTestModule],
                declarations: [MovementesOutgoingsJbhComponent],
                providers: []
            })
                .overrideTemplate(MovementesOutgoingsJbhComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(MovementesOutgoingsJbhComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MovementesOutgoingsJbhService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new MovementesOutgoingsJbh(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.movementesOutgoings[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
