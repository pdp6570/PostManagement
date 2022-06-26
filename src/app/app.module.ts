import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostslistComponent } from './postslist/postslist.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostService } from './post.service';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { TextLengthDirective } from './text-length.directive';

@NgModule({
  declarations: [
    AppComponent,
    PostslistComponent,
    PostDetailComponent,
    NotFoundComponent,
    ConfirmationDialogComponent,
    TextLengthDirective,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule],
  providers: [PostService],
  bootstrap: [AppComponent],
})
export class AppModule {}
