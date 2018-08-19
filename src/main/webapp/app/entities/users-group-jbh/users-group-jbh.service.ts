import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IUsersGroupJbh } from 'app/shared/model/users-group-jbh.model';

type EntityResponseType = HttpResponse<IUsersGroupJbh>;
type EntityArrayResponseType = HttpResponse<IUsersGroupJbh[]>;

@Injectable({ providedIn: 'root' })
export class UsersGroupJbhService {
    private resourceUrl = SERVER_API_URL + 'api/users-groups';

    constructor(private http: HttpClient) {}

    create(usersGroup: IUsersGroupJbh): Observable<EntityResponseType> {
        return this.http.post<IUsersGroupJbh>(this.resourceUrl, usersGroup, { observe: 'response' });
    }

    update(usersGroup: IUsersGroupJbh): Observable<EntityResponseType> {
        return this.http.put<IUsersGroupJbh>(this.resourceUrl, usersGroup, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IUsersGroupJbh>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IUsersGroupJbh[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
