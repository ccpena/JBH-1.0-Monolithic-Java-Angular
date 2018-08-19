import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMovementesOutgoingsJbh } from 'app/shared/model/movementes-outgoings-jbh.model';

type EntityResponseType = HttpResponse<IMovementesOutgoingsJbh>;
type EntityArrayResponseType = HttpResponse<IMovementesOutgoingsJbh[]>;

@Injectable({ providedIn: 'root' })
export class MovementesOutgoingsJbhService {
    private resourceUrl = SERVER_API_URL + 'api/movementes-outgoings';

    constructor(private http: HttpClient) {}

    create(movementesOutgoings: IMovementesOutgoingsJbh): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(movementesOutgoings);
        return this.http
            .post<IMovementesOutgoingsJbh>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(movementesOutgoings: IMovementesOutgoingsJbh): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(movementesOutgoings);
        return this.http
            .put<IMovementesOutgoingsJbh>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IMovementesOutgoingsJbh>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IMovementesOutgoingsJbh[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(movementesOutgoings: IMovementesOutgoingsJbh): IMovementesOutgoingsJbh {
        const copy: IMovementesOutgoingsJbh = Object.assign({}, movementesOutgoings, {
            createDate:
                movementesOutgoings.createDate != null && movementesOutgoings.createDate.isValid()
                    ? movementesOutgoings.createDate.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createDate = res.body.createDate != null ? moment(res.body.createDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((movementesOutgoings: IMovementesOutgoingsJbh) => {
            movementesOutgoings.createDate = movementesOutgoings.createDate != null ? moment(movementesOutgoings.createDate) : null;
        });
        return res;
    }
}
