import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IMembersGroupJbh } from 'app/shared/model/members-group-jbh.model';

type EntityResponseType = HttpResponse<IMembersGroupJbh>;
type EntityArrayResponseType = HttpResponse<IMembersGroupJbh[]>;

@Injectable({ providedIn: 'root' })
export class MembersGroupJbhService {
    private resourceUrl = SERVER_API_URL + 'api/members-groups';

    constructor(private http: HttpClient) {}

    create(membersGroup: IMembersGroupJbh): Observable<EntityResponseType> {
        return this.http.post<IMembersGroupJbh>(this.resourceUrl, membersGroup, { observe: 'response' });
    }

    update(membersGroup: IMembersGroupJbh): Observable<EntityResponseType> {
        return this.http.put<IMembersGroupJbh>(this.resourceUrl, membersGroup, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IMembersGroupJbh>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IMembersGroupJbh[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
