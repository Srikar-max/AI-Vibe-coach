import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AnimationItem } from 'lottie-web';

@Injectable({
  providedIn: 'root'
})
export class AiService {
  private apiKey = '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'
  private apiUrl = 'https://api.openai.com/v1/chat/completions';

  constructor(private http: HttpClient) {}

  analyzeMood(userInput: string, emoji: string): Observable<any> {
    const prompt = `
      You are an AI mood coach. Based on the user's text: "${userInput}" and emoji: "${emoji}", 
      detect their current mood. Then suggest a motivational quote, a song, and a simple actionable activity and a movie to watch based on mood it should change based on the mood detected. 
      Return a JSON object exactly like this:

      {
        "mood": "excited",
        "quote": "...",
        "song": "...",
        "action": "...",
        "movie" : "..."
      }
    `;

    const body = {
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a helpful AI mood coach.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 200
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    return this.http.post<any>(this.apiUrl, body, { headers }).pipe(
      map(res => {
        let text = res.choices[0].message.content
        text = text.replace(/```json|```/gi, '').trim();
        const match = text.match(/\{[\s\S]*\}/);
        if (match) text = match[0];

        try {
          return JSON.parse(text);
        } catch (e) {
          console.error('Failed to parse AI response', text);
          return { mood: 'neutral', quote: '', song: '', action: '' };
        }
      })
    );
  }
}
