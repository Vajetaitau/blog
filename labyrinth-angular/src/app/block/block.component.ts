import { Component, OnInit } from '@angular/core';
import { Block } from '../models/block';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.css']
})
export class BlockComponent implements OnInit {
  block: Block = {
    x: 12,
    y: 16
  };
  public blockName = 'Block Name';
  constructor() { }

  ngOnInit() {
  }

}
