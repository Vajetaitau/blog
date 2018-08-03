import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-block-container',
  templateUrl: './block-container.component.html',
  styleUrls: ['./block-container.component.css']
})
export class BlockContainerComponent implements OnInit {
  blocks: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  constructor() { }

  ngOnInit() {
  }

}
