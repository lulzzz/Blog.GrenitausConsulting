import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Post } from '../post';
import { HttpService } from '../http.service';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import { PagerService } from '../pager.service';
import { Http, Headers, RequestOptions, Response } from '@angular/http';


@Component({
    moduleId: module.id,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']

})
export class HomeComponent implements OnInit {

    constructor(private http: Http, private httpService: HttpService, private pagerService: PagerService) {
    }

    // array of all items to be paged
    private allItems: any[];

    // pager object
    pager: any = {};

    // paged items
    pagedItems: any[];



    ngOnInit() {
        this.httpService.getPosts(1)
            .subscribe(data => {
                // set items to json response
                this.allItems = data.posts;

                // initialize to page 1
                this.setPage(1);
            });

        // get dummy data
        /*this.http.get('http://localhost:49964/api/posts')
            .map((response: Response) => response.json())
            .subscribe(data => {
                // set items to json response
                this.allItems = data.posts;

                // initialize to page 1
                this.setPage(1);
            });*/
    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems.length, page);

        // get current page of items
        this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
}


