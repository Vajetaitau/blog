import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { LabyrinthService } from '../services/labyrinth.service';
import Point from '../models/point';
import Player from '../models/player';
import * as _ from 'lodash';

@Component({
  selector: 'app-block-container',
  templateUrl: './block-container.component.html',
  styleUrls: ['./block-container.component.css']
})
export class BlockContainerComponent implements OnInit {
  labyrinth: Array<Array<Point>>;
  player: Player;
  points: Array<Point>;

  constructor(private playerService: PlayerService, private labyrinthService: LabyrinthService) {
    this.labyrinth = new Array<Array<Point>>();
    this.player = new Player('', 0, 0, 10);
  }

  async ngOnInit() {
    const visibleRadius = this.player.visibleRadius;
    const pointCount = visibleRadius * 3;
    _.times(pointCount, (rowIndex) => {
      const row: Array<Point> = new Array<Point>();
      _.times(pointCount, (colIndex) => {
        row.push(new Point(-100, -100));
      });
      this.labyrinth.push(row);
    });

    this.player = await this.playerService.getPlayer();
    this.points = await this.labyrinthService.getLabyrinth();

    this.points.forEach(point => {
      const x = point.x - this.player.x + pointCount / 2 - 1;
      const y = -point.y - this.player.y + pointCount / 2 - 1;

      if (point.x === this.player.x && point.y === this.player.y) {
        point.hasPlayer = true;
      }

      this.labyrinth[y][x] = point;
    });
  }

  moveNorth(e: KeyboardEvent) {
    e.preventDefault();
    console.log('North');
  }

  moveSouth(e: Event) {
    e.preventDefault();
    console.log('South');
  }

  moveEast(e: Event) {
    e.preventDefault();
    console.log('East');
  }

  moveWest(e: Event) {
    e.preventDefault();
    console.log('West');
  }

}
