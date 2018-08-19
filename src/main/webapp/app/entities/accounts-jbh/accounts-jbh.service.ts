import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAccountsJbh } from 'app/shared/model/accounts-jbh.model';

type EntityResponseType = HttpResponse<IAccountsJbh>;
type EntityArrayResponseType = HttpResponse<IAccountsJbh[]>;

@Injectable({ providedIn: 'root' })
export class AccountsJbhService {
    private resourceUrl = SERVER_API_URL + 'api/accounts';

    constructor(private http: HttpClient) {}

    create(accounts: IAccountsJbh): Observable<EntityResponseType> {
        return this.http.post<IAccountsJbh>(this.resourceUrl, accounts, { observe: 'response' });
    }

    update(accounts: IAccountsJbh): Observable<EntityResponseType> {
        return this.http.put<IAccountsJbh>(this.resourceUrl, accounts, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IAccountsJbh>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IAccountsJbh[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
