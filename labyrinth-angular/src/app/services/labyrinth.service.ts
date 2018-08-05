import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Point from '../models/point';

@Injectable({
  providedIn: 'root'
})
export class LabyrinthService {

  constructor(private http: HttpClient) { }

  async getLabyrinth(): Promise<Array<Point>> {
    const pointsResponse = await this.http
      .get<any[]>('http://localhost:3000/playing/points?playerName=Vajetaitau')
      .toPromise();
    const points = pointsResponse.map(p => {
      return new Point(
        p._x, p._y, p._north, p._south, p._east, p._west
      );
    });
    return points;
  }
}
