import { Routes } from '@angular/router';
import { MainComponent } from '../pages/main/main.component';
import { NotFoundComponent } from '../pages/not-found/not-found.component';
import { ArtistComponent } from '../pages/artist/artist.component';
import { PlaylistComponent } from '../pages/playlist/playlist.component';
import { SearchComponent } from '../pages/search/search.component';
import { ArtistDiscographyComponent } from '../pages/artist-discography/artist-discography.component';
import { AlbumPageComponent } from '../pages/album-page/album-page.component';

export const routes: Routes = [
  {
    path: '', component: MainComponent, pathMatch: 'full'
  },
  {
    path: 'search', component: SearchComponent
  },
  {
    path: 'artist/:id', component: ArtistComponent, pathMatch: 'full'
  },
  {
    path: 'artist/:id/discography', component: ArtistDiscographyComponent
  },
  {
    path: 'album/:id', component: AlbumPageComponent
  },
  {
    path: 'playlist/:id', component: PlaylistComponent
  },
  {
    path: '**', component: NotFoundComponent
  },
];
