import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ICategoriesJbh } from 'app/shared/model/categories-jbh.model';

type EntityResponseType = HttpResponse<ICategoriesJbh>;
type EntityArrayResponseType = HttpResponse<ICategoriesJbh[]>;

@Injectable({ providedIn: 'root' })
export class CategoriesJbhService {
    private resourceUrl = SERVER_API_URL + 'api/categories';

    constructor(private http: HttpClient) {}

    create(categories: ICategoriesJbh): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(categories);
        return this.http
            .post<ICategoriesJbh>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(categories: ICategoriesJbh): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(categories);
        return this.http
            .put<ICategoriesJbh>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ICategoriesJbh>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ICategoriesJbh[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(categories: ICategoriesJbh): ICategoriesJbh {
        const copy: ICategoriesJbh = Object.assign({}, categories, {
            creationDate:
                categories.creationDate != null && categories.creationDate.isValid() ? categories.creationDate.format(DATE_FORMAT) : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.creationDate = res.body.creationDate != null ? moment(res.body.creationDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((categories: ICategoriesJbh) => {
            categories.creationDate = categories.creationDate != null ? moment(categories.creationDate) : null;
        });
        return res;
    }
}
