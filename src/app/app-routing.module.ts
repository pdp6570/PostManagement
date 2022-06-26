import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostslistComponent } from './postslist/postslist.component';

const routes: Routes = [
  { path: '', redirectTo: '/postslist', pathMatch: 'full' },
  { path: 'postslist', component: PostslistComponent },
  { path: 'post-detail/:id', component: PostDetailComponent },
  { path: 'page-not-found', component: NotFoundComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
