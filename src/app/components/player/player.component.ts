import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/audio.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Track } from '../../interfaces/app.interface';
import { ZenComponent } from "../zen/zen.component";
import { SongService } from '../../services/song.service';
import { ControlsComponent } from '../controls/controls.component';
import { filter } from 'rxjs';
import { SliderTimeComponent } from '../slider-time/slider-time.component';
import { VolumeEditorComponent } from "../volume-editor/volume-editor.component";
import { TimePipe } from "../../pipes/time.pipe";

@Component({
  selector: 'app-player',
  standalone: true,
  templateUrl: './player.component.html',
  styleUrl: './player.component.css',
  providers: [HttpClientModule],
  imports: [RouterLink, RouterLinkActive, MatIconModule, FormsModule, HttpClientModule, ZenComponent, ControlsComponent, SliderTimeComponent, VolumeEditorComponent, TimePipe]
})
export class PlayerComponent implements OnInit {
  public zenMode: boolean = false
  public song: Track | undefined = undefined

  public currentTime!: number
  public duration!: number
  public editableTimeWhenDisable: number = 0
  public disableChanging: boolean = false

  constructor(private player: PlayerService, private songData: SongService) { }

  ngOnInit() {
    const audio = this.player.getAudio()

    audio.addEventListener('canplaythrough', () => {
      this.duration = Number(audio.duration.toFixed(1))
    })

    audio.addEventListener('timeupdate', () => {
      this.currentTime = this.player.getAudio().currentTime
    })

    this.songData.changes.pipe(filter(el => el === 'song')).subscribe(el => {
      const currentSong = this.songData.getSong()
      if (!currentSong) return
      this.song = currentSong
    })
  }

  toggleZenMode(newValue?: boolean) {
    if (!this.player.getAudio().src.length) return
    this.zenMode = newValue != undefined ? newValue : !this.zenMode
  }

  isLastElement(index: number): boolean {
    return index === (this.song?.contributors?.length ?? 1) - 1
  }
}
