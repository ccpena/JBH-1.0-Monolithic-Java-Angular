import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IActiveDebtsJbh } from 'app/shared/model/active-debts-jbh.model';

type EntityResponseType = HttpResponse<IActiveDebtsJbh>;
type EntityArrayResponseType = HttpResponse<IActiveDebtsJbh[]>;

@Injectable({ providedIn: 'root' })
export class ActiveDebtsJbhService {
    private resourceUrl = SERVER_API_URL + 'api/active-debts';

    constructor(private http: HttpClient) {}

    create(activeDebts: IActiveDebtsJbh): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(activeDebts);
        return this.http
            .post<IActiveDebtsJbh>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(activeDebts: IActiveDebtsJbh): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(activeDebts);
        return this.http
            .put<IActiveDebtsJbh>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IActiveDebtsJbh>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IActiveDebtsJbh[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(activeDebts: IActiveDebtsJbh): IActiveDebtsJbh {
        const copy: IActiveDebtsJbh = Object.assign({}, activeDebts, {
            createDate:
                activeDebts.createDate != null && activeDebts.createDate.isValid() ? activeDebts.createDate.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.createDate = res.body.createDate != null ? moment(res.body.createDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((activeDebts: IActiveDebtsJbh) => {
            activeDebts.createDate = activeDebts.createDate != null ? moment(activeDebts.createDate) : null;
        });
        return res;
    }
}
