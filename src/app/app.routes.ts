import { Routes } from '@angular/router';
import { MoodInputComponent } from './mood-input/mood-input.component';
import { MoodResponseComponent } from './mood-response/mood-response.component';

export const routes: Routes = [
    {path:'',redirectTo:'mood-input', pathMatch:'full'},
    {path:'mood-input',component:MoodInputComponent},
    {path:'mood-response',component:MoodResponseComponent}
];
