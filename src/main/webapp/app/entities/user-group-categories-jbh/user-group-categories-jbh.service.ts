import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IUserGroupCategoriesJbh } from 'app/shared/model/user-group-categories-jbh.model';

type EntityResponseType = HttpResponse<IUserGroupCategoriesJbh>;
type EntityArrayResponseType = HttpResponse<IUserGroupCategoriesJbh[]>;

@Injectable({ providedIn: 'root' })
export class UserGroupCategoriesJbhService {
    private resourceUrl = SERVER_API_URL + 'api/user-group-categories';

    constructor(private http: HttpClient) {}

    create(userGroupCategories: IUserGroupCategoriesJbh): Observable<EntityResponseType> {
        return this.http.post<IUserGroupCategoriesJbh>(this.resourceUrl, userGroupCategories, { observe: 'response' });
    }

    update(userGroupCategories: IUserGroupCategoriesJbh): Observable<EntityResponseType> {
        return this.http.put<IUserGroupCategoriesJbh>(this.resourceUrl, userGroupCategories, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IUserGroupCategoriesJbh>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IUserGroupCategoriesJbh[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
