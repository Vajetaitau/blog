import { Component, OnInit } from '@angular/core';
import Point from '../../models/point';

@Component({
  selector: 'app-point',
  templateUrl: './point.component.html',
  styleUrls: ['./point.component.css']
})
export class PointComponent implements OnInit {
  point: Point;

  constructor(point: Point) {
    this.point = point;
  }

  ngOnInit() {
  }

}
