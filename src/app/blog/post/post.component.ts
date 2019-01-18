import { Component, OnInit } from '@angular/core';
import { PostService } from './../shared/post.service';
import { Post } from './../models/Post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  displayedColumns: string[] = ['prod_name', 'prod_price'];
  data: Post[] = [];
  isLoadingResults = true;

  constructor(private postService: PostService) { }

  ngOnInit() {
     this.postService.getPosts()
    .subscribe(res => {
      this.data = res;
      console.log(this.data);
      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

}
