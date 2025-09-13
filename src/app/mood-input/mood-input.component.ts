import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AiService } from '../services/ai.service';
import { LottieComponent, AnimationOptions } from "ngx-lottie";

@Component({
  selector: 'app-mood-input',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, LottieComponent],
  templateUrl: './mood-input.component.html',
  styleUrls: ['./mood-input.component.css']
})
export class MoodInputComponent {
  moodText = '';
  emoji = '';
  isDefault = true;
  bgColor = 'bg-white';
  lottieOptions: AnimationOptions = { path: 'assets/Traveliing.json', loop: true, autoplay: true };

  emojiList = [
    { symbol: '😢', label: 'Sad / Depressed' },
    { symbol: '😐', label: 'Neutral' },
    { symbol: '🙂', label: 'Happy' },
    { symbol: '😄', label: 'Excited' },
    { symbol: '🤩', label: 'Very Excited' }
  ];

  loading = false;

  constructor(private aiService: AiService, private router: Router) {}

  selectEmoji(e: string) {
    this.emoji = e;
    const pathMap: { [key: string]: string } = {
      '😢': 'assets/Lottie.json',
      '😐': 'assets/Clouds.json',
      '🙂': 'assets/Doggie.json',
      '😄': 'assets/Confetti.json',
      '🤩': 'assets/Sparkles.json'
    };
    const bgMap: { [key: string]: string } = {
      '😢': 'bg-gradient-to-br from-[#1e293b] via-[#334155] to-[#0f172a]',
      '😐': 'bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500',
      '🙂': 'bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-400',
      '😄': 'bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300',
      '🤩': 'bg-gradient-to-br from-orange-400 via-pink-500 to-red-500'
    };
    if (pathMap[e]) {
      this.isDefault = false;
      this.lottieOptions = { path: pathMap[e], loop: true, autoplay: true };
      this.bgColor = bgMap[e];
    } else {
      this.isDefault = true;
      this.lottieOptions = { path: 'assets/Traveliing.json', loop: true, autoplay: true };
      this.bgColor = 'bg-white';
    }
  }

  loaderOptions = {
    path: '/assets/loader.json',
    autoplay: true,
  };

  analyzeMood() {
    if (!this.moodText || !this.emoji) return;
    this.loading = true;
    this.aiService.analyzeMood(this.moodText, this.emoji).subscribe(res => {
      this.loading = false;
      this.router.navigate(['/mood-response'], { state: { data: res } });
    }, () => {
      this.loading = false;
    });
  }
}
