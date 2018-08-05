import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Player from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient) { }

  async getPlayer(): Promise<Player> {
    const playerResponse = await this.http
      .get<Player>('http://localhost:3000/player?playerName=Vajetaitau')
      .toPromise();
    return playerResponse;
  }
}
