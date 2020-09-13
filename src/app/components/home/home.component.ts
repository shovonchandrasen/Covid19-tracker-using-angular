import { Component, OnInit, Input } from '@angular/core';
import { DataServiceService } from "src/app/services/data-service.service";
import { GlobalDataSummary } from "src/app/models/global-data";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnInit {
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  loading = true;
  datatable = [];
  chart={
    PieChart : "PieChart",
    ColumnChart : "ColumnChart",
    height: 500,
    options: {
      animation: {
        duration: 1000,
        easing: 'out',
      },
      is3D: true
    }
  }


  globaldata: GlobalDataSummary[];
  constructor(private dataService: DataServiceService) { }


  initChart(caseType: string) {

    this.datatable=[];
    //this.datatable.push(["Country", "Cases"])

    this.globaldata.forEach(cs => {
      let value: number;
      if (caseType == 'c')
        if (cs.confirmed > 2000)
        this.datatable.push([cs.country, cs.confirmed]);
      if (caseType == 'a')
        if (cs.active > 2000)
        this.datatable.push([cs.country, cs.active]);
      if (caseType == 'r')
        if (cs.recovered > 2000)
        this.datatable.push([cs.country, cs.recovered]);
      if (caseType == 'd')
        if (cs.deaths > 1000)
        this.datatable.push([cs.country, cs.deaths]);

    })



  }
  ngOnInit(): void {

    this.dataService.getGlobalData()
      .subscribe({
        next: (result) => {
          //console.log(result);
          this.globaldata = result;
          result.forEach(cs => {
            if (!Number.isNaN(cs.confirmed)) {
              this.totalActive = cs.active;
              this.totalConfirmed = cs.confirmed;
              this.totalDeaths = cs.deaths;
              this.totalRecovered = cs.recovered;
            }

          })
          this.initChart('c');

        },
        complete: () => {
          this.loading = false;
        }
      })
  }

  updateChart(input: HTMLInputElement) {
    //console.log(input.value);
    this.initChart(input.value)
  }

}
