import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post.service';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css'],
})
export class PostDetailComponent implements OnInit {
  post: any;
  postDetailId: number | any;
  postDetails: any;
  comments: any = [];
  postDetailForm!: FormGroup;
  isFormIsInEditMode: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private service: PostService,
    private router: Router
  ) {
    this.activatedRoute.paramMap.subscribe(params => {
      if (params) {
        this.postDetailId = Number(params.get('id'));

        if (!this.postDetailId) {
          this.router.navigate(['page-not-found']);
        }
      }
    })
  }

  ngOnInit(): void {
    this.initForm();
    this.postDetails = localStorage.getItem('postDetails');

    if (this.postDetailId > 0) {
      this.getPostDetails();
      this.getAllComments();
    }
  }

  getPostDetails() {
    if (this.postDetails) {
      this.post = JSON.parse(this.postDetails);
      this.updatePostFormValue();
    } else {
      this.service.getPostById(this.postDetailId).subscribe({
        next: (data: any) => {
          if (data) {
            this.post = data;
            this.updatePostFormValue();
          }
        },
        error: (err: any) => {
          this.router.navigate(['page-not-found']);
          console.log(err);
        },
      });
    }
  }

  updatePostFormValue() {
    this.postDetailForm.controls.postId.patchValue(this.post.id);
    this.postDetailForm.controls.userId.patchValue(this.post.userId);
    this.postDetailForm.controls.title.patchValue(this.post.title);
    this.postDetailForm.controls.body.patchValue(this.post.body);
  }

  getAllComments() {
    this.service.getComments(this.postDetailId).subscribe({
      next: (data: any) => {
        if (data && data.length > 0) {
          this.comments = data;
        }
      },
      error: (err: any) => {
        this.router.navigate(['page-not-found']);
        console.log(err);
      },
    });
  }

  initForm() {
    this.postDetailForm = new FormGroup({
      postId: new FormControl(null, Validators.compose([Validators.required])),
      userId: new FormControl(null, Validators.compose([Validators.required])),
      title: new FormControl(null, Validators.compose([Validators.required])),
      body: new FormControl(null, Validators.compose([Validators.required])),
    });
  }

  savePostDetails() {
    if (this.postDetailForm.valid) {
      const postObj = {
        id: this.postDetailForm.value.postId,
        title: this.postDetailForm.value.title,
        body: this.postDetailForm.value.body,
        userId: this.postDetailForm.value.userId,
      };

      this.service.savePostDetails(postObj).subscribe({
        next: (data: any) => {
          console.log('Post Updated Successfully');
          this.isFormIsInEditMode = false;
        },
        error: (err: any) => {
          console.log(err);
        },
      });
    }
  }

  onClickCancel() {
    this.isFormIsInEditMode = false;
    this.getPostDetails();
  }
}
