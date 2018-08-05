import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient) { }

  getVisibleRadius() {
    return this.http.get('http://localhost:3000/player/radius?player=Vajetaitau').toPromise();
  }
}
