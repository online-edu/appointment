import { Injectable } from "@angular/core";
import { Headers, Http, Response, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Rx';

import { environment as env } from "../../../environments/environment";
var OPTIONS: any = { 'Content-Type': 'application/json' };
/**
 * Performs http requests using `RestApi`.
 *
 * `RestApi` is available as an injectable class, with methods to perform http requests.
 * Returns an `Observable` which will emit a single {@link Response} when a
 * response is received.
 */
@Injectable()
export class RestApi {
    constructor(private http: Http) { }
    /**
    * Performs a request with `post` http method.
    */
    post(url: string, body: any) {
        console.log(JSON.stringify(body));
        return this.http.post(env.api + url, JSON.stringify(body), this.commonHeaders())
            .map(this.extract)
            .catch(this.handleError);
    }
    /**
   * Performs a request with `put` http method.
   */
    put(url: string, body: any) {
        return this.http.put(env.api + url, JSON.stringify(body))
            .map(this.extract)
            .catch(this.handleError);
    }
    /**
   * Performs a request with `get` http method.
   */
    get(url: string): Observable<any[]> {
        return this.http.get(`${env.api}${url}`)
            .map(this.extract)
            .catch(this.handleError);
    }
    /**
    * Parses response, fetched from backend which is not null/empty, in JSON format.
    */
    extract = (res: Response) => res.json() || {};
    /**
    * Sets a request options with `Content-Type` as `application/json`.
    */
    commonHeaders = () => new RequestOptions({ headers: new Headers(OPTIONS) });
    /**
    * Parses error if any and then thorw with message.
    */
    handleError(error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}