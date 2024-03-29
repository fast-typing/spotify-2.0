import { Injectable } from '@angular/core';
import { Album, Repeat, Song, Track } from '../interfaces/app.interface';
import { BehaviorSubject, Subject } from 'rxjs';
import { SongService } from './song.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private audio: HTMLAudioElement = new Audio()
  public readonly audioChanges = new BehaviorSubject<{ data?: any, type: 'time' | 'src' }>({ type: 'src' })

  constructor(private songData: SongService) {
    this.audio.onended = () => {
      this.skipSong('next', true)
    }
  }

  getAudio(): HTMLAudioElement {
    return this.audio
  }

  setSong(song: Track) {
    this.songData.setSong(song)
    this.audio.src = song.preview
    this.audio.currentTime = 0
    this.audioChanges.next({ type: 'src' })
    localStorage.setItem('lastSongId', String(song.id))
  }

  setVolume(value: number) {
    this.audio.volume = value * 0.5
  }

  setTime(time: number) {
    this.audio.currentTime = time
    localStorage.setItem('currentTime', time.toString())
  }

  continueSong() {
    this.audioChanges.next({ type: 'time', data: true })
    this.audio.play();
  }

  pauseSong() {
    this.audioChanges.next({ type: 'time', data: false })
    this.audio.pause()
  }

  skipSong(direction: 'prev' | 'next', isEndedByItself?: boolean) {
    const queue: Track[] | undefined = this.songData.getQueue()
    const index = this.getIndexOfNextSong(direction, isEndedByItself)
    if (index === null) {
      this.pauseSong()
      return
    }
    if (!queue) return
    this.setSong(queue[index])
    this.continueSong()
  }

  private getIndexOfNextSong(direction: 'prev' | 'next', isEndedByItself?: boolean): number | null {
    const queue: Track[] | undefined = this.songData.getQueue()
    const index = queue?.findIndex(el => el.id === this.songData.getSong()?.id) ?? 0
    const isLastSong = index === (queue?.length ?? 9999) - 1
    const isFirstSong = index === 0

    let newIndex
    if (isFirstSong && direction == 'prev') {
      newIndex = index
    } else if ((this.songData.getRepeat() === 'playlist' && isLastSong && direction === 'next') || (isLastSong && direction === 'next' && !isEndedByItself)) {
      newIndex = 0
    } else if (this.songData.getRepeat() === 'song' && this.audio.duration >= this.audio.currentTime && isEndedByItself) {
      newIndex = index
    } else if (isLastSong && direction === 'next' && isEndedByItself) {
      newIndex = null
    } else {
      newIndex = (direction === 'next' ? 1 : -1) + index
    }

    return newIndex
  }
}
