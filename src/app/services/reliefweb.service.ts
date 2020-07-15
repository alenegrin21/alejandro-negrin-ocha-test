import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReliefwebService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }




  getList(bodyParams): Observable<any> {
    return this.http.post("https://api.reliefweb.int/v1/reports?appname=aledavid21@gmail.com", bodyParams);
  }
}
