/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MovementesOutgoingsJbhService } from 'app/entities/movementes-outgoings-jbh/movementes-outgoings-jbh.service';
import { MovementesOutgoingsJbh } from 'app/shared/model/movementes-outgoings-jbh.model';
import { SERVER_API_URL } from 'app/app.constants';

describe('Service Tests', () => {
    describe('MovementesOutgoingsJbh Service', () => {
        let injector: TestBed;
        let service: MovementesOutgoingsJbhService;
        let httpMock: HttpTestingController;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(MovementesOutgoingsJbhService);
            httpMock = injector.get(HttpTestingController);
        });

        describe('Service methods', () => {
            it('should call correct URL', () => {
                service.find(123).subscribe(() => {});

                const req = httpMock.expectOne({ method: 'GET' });

                const resourceUrl = SERVER_API_URL + 'api/movementes-outgoings';
                expect(req.request.url).toEqual(resourceUrl + '/' + 123);
            });

            it('should create a MovementesOutgoingsJbh', () => {
                service.create(new MovementesOutgoingsJbh(null)).subscribe(received => {
                    expect(received.body.id).toEqual(null);
                });

                const req = httpMock.expectOne({ method: 'POST' });
                req.flush({ id: null });
            });

            it('should update a MovementesOutgoingsJbh', () => {
                service.update(new MovementesOutgoingsJbh(123)).subscribe(received => {
                    expect(received.body.id).toEqual(123);
                });

                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush({ id: 123 });
            });

            it('should return a MovementesOutgoingsJbh', () => {
                service.find(123).subscribe(received => {
                    expect(received.body.id).toEqual(123);
                });

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush({ id: 123 });
            });

            it('should return a list of MovementesOutgoingsJbh', () => {
                service.query(null).subscribe(received => {
                    expect(received.body[0].id).toEqual(123);
                });

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush([new MovementesOutgoingsJbh(123)]);
            });

            it('should delete a MovementesOutgoingsJbh', () => {
                service.delete(123).subscribe(received => {
                    expect(received.url).toContain('/' + 123);
                });

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush(null);
            });

            it('should propagate not found response', () => {
                service.find(123).subscribe(null, (_error: any) => {
                    expect(_error.status).toEqual(404);
                });

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush('Invalid request parameters', {
                    status: 404,
                    statusText: 'Bad Request'
                });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
