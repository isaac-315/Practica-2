import { Routes } from '@angular/router';
import { HomePage } from './features/home/pages/home-page/home-page';
import { StudentsPage } from './features/student/pages/students-page/students-page';
import { StudentDetail } from './features/student/pages/students-detail/student-detail';

export const routes: Routes = [
    { path: '', component: HomePage },
    { path: 'students', component: StudentsPage },
    { path: 'students/:id', component: StudentDetail },

    { path: '**', redirectTo: '' }
];
