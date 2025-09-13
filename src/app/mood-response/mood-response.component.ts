import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LottieComponent, AnimationOptions } from "ngx-lottie";

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

  lottieOptions: AnimationOptions = { path: '', loop: true, autoplay: true };
  bgColor = 'bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#334155]';

  moodMap: { [key: string]: { lottie: string; bg: string } } = {
    sad: {
      lottie: 'assets/Lottie.json',
      bg: 'bg-gradient-to-br from-[#1e293b] via-[#475569] to-[#38bdf8]'
    },
    neutral: {
      lottie: 'assets/Clouds.json',
      bg: 'bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500'
    },
    happy: {
      lottie: 'assets/Doggie.json',
      bg: 'bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-400'
    },
    excited: {
      lottie: 'assets/Confetti.json',
      bg: 'bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300'
    },
    very_excited: {
      lottie: 'assets/Sparkles.json',
      bg: 'bg-gradient-to-br from-orange-400 via-pink-500 to-red-500'
    }
  };

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as { data: any };
    if (state?.data) {
      this.mood = state.data.mood;
      this.quote = state.data.quote;
      this.song = state.data.song;
      this.action = state.data.action;
      this.movie = state.data.movie;

      // set lottie and background based on mood
      const moodKey = this.getMoodKey(this.mood);
      if (this.moodMap[moodKey]) {
        this.lottieOptions = { path: this.moodMap[moodKey].lottie, loop: true, autoplay: true };
        this.bgColor = this.moodMap[moodKey].bg;
      }
    }
  }

  getMoodKey(mood: string): string {
    switch (mood.toLowerCase()) {
      case 'sad':
      case 'depressed':
        return 'sad';
      case 'neutral':
        return 'neutral';
      case 'happy':
        return 'happy';
      case 'excited':
        return 'excited';
      case 'very excited':
      case 'overjoyed':
        return 'very_excited';
      case 'angry':
        return 'sad';
      case 'frustrated':
        return 'sad';
      case 'upset':
        return 'sad';
      default:
        return 'neutral';
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
