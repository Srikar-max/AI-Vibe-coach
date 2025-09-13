import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LottieComponent } from "ngx-lottie";

@Component({
  selector: 'app-mood-response',
  standalone: true,
  imports: [CommonModule, LottieComponent],
  templateUrl: './mood-response.component.html',
  styleUrls: ['./mood-response.component.css']
})
export class MoodResponseComponent {
  mood = '';
  quote = '';
  song = '';
  action = '';
  movie = '';

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as { data: any };
    if(state?.data){
      this.mood = state.data.mood;
      this.quote = state.data.quote;
      this.song = state.data.song;
      this.action = state.data.action;
      this.movie = state.data.movie;
    }
  }

  getYouTubeLink(song: string) {
    return `https://www.youtube.com/results?search_query=${encodeURIComponent(song)}`;
  }

  getSpotifyLink(song: string) {
    return `https://open.spotify.com/search/${encodeURIComponent(song)}`;
  }

  getMovieLink(movie: string) {
  return `https://www.imdb.com/find?q=${encodeURIComponent(movie)}`;
}

}
