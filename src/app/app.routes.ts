import { Routes } from '@angular/router';
import { HomePage } from './features/home/pages/home-page/home-page';
import { StudentsPage } from './features/student/pages/students-page/students-page';
import { StudentDetail } from './features/student/pages/students-detail/student-detail';
import { RouterOutlet } from '@angular/router';
import { LayoutsPage } from './components/layouts/layouts-page';
import { SignupComponent } from './features/signup/pages/signup-page';
import { ProfilePage } from './features/profile/pages/profile-page/profile-page';


export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'students', component: StudentsPage },
  { path: 'students/:id', component: StudentDetail },
  { path: 'signup', component: SignupComponent },
  { path: 'layouts', component: LayoutsPage },
  { path: 'profile', component: ProfilePage },

  { path: '**', redirectTo: '' },
];