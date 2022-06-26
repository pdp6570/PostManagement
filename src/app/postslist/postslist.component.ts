import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { PostService } from '../post.service';

@Component({
  selector: 'app-postslist',
  templateUrl: './postslist.component.html',
  styleUrls: ['./postslist.component.css'],
})
export class PostslistComponent implements OnInit {
  posts: any = [];
  comments: any = [];
  postDetailId: number | any;
  postDetail: any;

  constructor(private service: PostService, private modalService: NgbModal, private router: Router) {}

  ngOnInit() {
    this.postDetailId = localStorage.getItem('postDetailId');
    this.postDetail = localStorage.getItem('postList');
    if (this.postDetail) {
      this.posts = JSON.parse(this.postDetail);
    } else {
      this.getAllPosts();
    }
    this.getAllComments();
  }

  getAllPosts() {
    this.service.getPosts().subscribe({
      next: (data: any) => {
        if (data && data.length > 0) {
          this.posts = data;
          localStorage.setItem('postList', JSON.stringify(data));
        }
      },
      error: (err: any) => {
        console.log(err);
        this.router.navigate(['page-not-found']);
      },
    });
  }

  onedit(post: any) {
    localStorage.setItem('postDetailId', post.id.toString());
    localStorage.setItem('postDetails', JSON.stringify(post));
    this.router.navigate([`/post-detail/${post.id}`], { state: { data: post } });
  }

  onDelete(postId: any) {
    const modalRef = this.modalService.open(ConfirmationDialogComponent, {
      backdrop: 'static',
      centered: false,
    });

    modalRef.result.then((result: any) => {
      if (result) {
        this.service.deletePost(postId).subscribe({
          next: (data: any) => {
            console.log('Post Deleted Successfully');
            //Note: resource will not be really updated on the server but it will be faked as if.
            this.getAllPosts();
          },
          error: (err: any) => {
            this.router.navigate(['page-not-found']);
          },
        });
      }
    });
  }

  getAllComments() {
    this.service.getAllComments().subscribe({
      next: (data: any) => {
        if (data && data.length > 0) {
          this.comments = data;
          this.comments = [...this.comments];
        }
      },
      error: (err: any) => {
        console.log(err);
        this.router.navigate(['page-not-found']);
      },
    });
  }
}
