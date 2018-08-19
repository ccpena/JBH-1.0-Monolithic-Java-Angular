import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISubCategoriesJbh } from 'app/shared/model/sub-categories-jbh.model';

type EntityResponseType = HttpResponse<ISubCategoriesJbh>;
type EntityArrayResponseType = HttpResponse<ISubCategoriesJbh[]>;

@Injectable({ providedIn: 'root' })
export class SubCategoriesJbhService {
    private resourceUrl = SERVER_API_URL + 'api/sub-categories';

    constructor(private http: HttpClient) {}

    create(subCategories: ISubCategoriesJbh): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(subCategories);
        return this.http
            .post<ISubCategoriesJbh>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(subCategories: ISubCategoriesJbh): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(subCategories);
        return this.http
            .put<ISubCategoriesJbh>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ISubCategoriesJbh>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ISubCategoriesJbh[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(subCategories: ISubCategoriesJbh): ISubCategoriesJbh {
        const copy: ISubCategoriesJbh = Object.assign({}, subCategories, {
            creationDate:
                subCategories.creationDate != null && subCategories.creationDate.isValid()
                    ? subCategories.creationDate.format(DATE_FORMAT)
                    : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.creationDate = res.body.creationDate != null ? moment(res.body.creationDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((subCategories: ISubCategoriesJbh) => {
            subCategories.creationDate = subCategories.creationDate != null ? moment(subCategories.creationDate) : null;
        });
        return res;
    }
}
