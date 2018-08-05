import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-block-container',
  templateUrl: './block-container.component.html',
  styleUrls: ['./block-container.component.css']
})
export class BlockContainerComponent implements OnInit {
  visibleRadius: number;
  blocks: Array<number> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  constructor(private playerService: PlayerService) { }

  async ngOnInit() {
    this.visibleRadius = Number(await this.playerService.getVisibleRadius());
  }

}
