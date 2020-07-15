import { Component, OnInit } from '@angular/core';
import { ReliefwebService } from 'src/app/services/reliefweb.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.scss']
})
export class ReportsListComponent implements OnInit {

  data: any[];
  total;
  filtersForm = {
    page: 1,
    txtSearch: null
  };
  show = 10;
  loading: boolean = false;
  errorLoading: boolean = false;

  constructor(
    private reliefwebService: ReliefwebService,
    private router: Router,
    private activatedroute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedroute.queryParamMap
      .subscribe(params => {
        this.filtersForm.page = parseInt(params.get('page')) || 1;
        this.filtersForm.txtSearch = params.get('txtSearch') || null;
        this.initReportsList();
      });

  }

  initReportsList() {
    this.loading = true;
    this.errorLoading = false;
    let body = this.generateParamsPagination;
    this.reliefwebService.getList(body).subscribe(
      (response) => {
        console.log(response);
        this.data = response.data;
        this.total = response.totalCount;
        this.loading = false;
      },
      error => {
        console.log("ERROR", error);
        this.loading = false;
        this.errorLoading = true;
      }
    )
  }

  get generateParamsPagination(): any {
    let page = this.filtersForm.page;
    let params = {
      filter: {
        operator: "AND",
        conditions: [
          {
            field: "country",
            value: "Venezuela"
          }
        ]
      },
      limit: this.show,
      offset: page ? (page - 1) * this.show : 0,
      sort: [
        "date:desc"
      ],
      profile: "full"
    };

    if (this.filtersForm.txtSearch != null && this.filtersForm.txtSearch != "") {
      params.filter.conditions.push({
        field: "body",
        value: this.filtersForm.txtSearch
      })
    }
    console.log("params", params)
    return params;
  }


  getFirstPhrase(text: string) {
    return text.split(".")[0] + '...';
  }

  applyFilters() {
    this.filtersForm.page = 1;
    this.router.navigate([this.router.url.split("?")[0]], { queryParams: this.filtersForm });
  }

  submitSearch() {
    this.filtersForm.page = 1;
    this.router.navigate([this.router.url.split("?")[0]], { queryParams: this.filtersForm });
  }


  pageChange(pageSelected) {
    if (pageSelected != this.filtersForm.page) {
      this.filtersForm.page = pageSelected;
      this.router.navigate([this.router.url.split("?")[0]], { queryParams: this.filtersForm });
    }
  }
}
