import { Component } from '@angular/core';
import { Track } from '../../interfaces/app.interface';
import { SongService } from '../../services/song.service';
import { filter } from 'rxjs';
import { SongComponent } from "../../components/song/song.component";
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-queue',
  standalone: true,
  templateUrl: './queue.component.html',
  styleUrl: './queue.component.css',
  imports: [SongComponent, DragDropModule, MatIconModule]
})
export class QueueComponent {
  public queue!: Track[]

  constructor(private songData: SongService) { }

  ngOnInit() {
    this.queue = this.songData.getQueue()
    this.songData.changes.pipe(filter(el => el === 'queue')).subscribe(el => {
      this.queue = this.songData.getQueue()
    })
  }

  onDrop(event: any) {
    moveItemInArray(this.queue, event.previousIndex, event.currentIndex);
  }
}