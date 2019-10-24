import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { EmployeeService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  test_data = [{ country: 'Pakistan', score: 23 }, { country: 'Pakistan', score: 127 }, { country: 'India', score: 3 },
  { country: 'India', score: 71 }, { country: 'Australia', score: 31 },
  { country: 'India', score: 22 }, { country: 'Pakistan', score: 81 }];

  searchTemp: any = [];
  secondSearchTemp: any = [];
  severData: any = [];
  selectedData: any = [];

  firstBoxArr: any = [];
  secondBoxArr: any = [];

  searchTerm;
  maximumScore: number;

  firstBoxValue;
  secondBoxValue;

  firstAvgValue;
  secondAvgValue;

  selectedRadioValue;

  title = 'dyn-web-app';

  @ViewChild('prog1') progress1;

  @ViewChild('prog2') progress2;

  constructor(private _apiService: EmployeeService) {}

  ngOnInit() {
    // console.log(this.test_data);
    // this.selectedData = this.test_data;
    this.getScore();
    console.log(this.severData);
  }

  ngAfterViewInit() {
      console.log(this.progress1.nativeElement);
      console.log(this.progress2.nativeElement);
  }

  getScore() {
     this._apiService.getScore().subscribe((item) => {
      console.log( item);
      console.log( Array.isArray(item));
      if (Array.isArray(item)) {

        this.severData  =  item.map((element) => {
            console.log(element);
            return { country: element[0], score: element[1] };
        });
      }
     console.log(this.severData);
    });
  }

  getRadioValue(event) {

    this.selectedRadioValue = event.target.value;

    if (event.target.value === 'test') {
      this.searchTemp = JSON.parse(JSON.stringify(this.test_data));
      this.findMaximum(this.searchTemp);
      // this.selectedData = this.test_data;
    } else if (event.target.value === 'server') {
      this.searchTemp = JSON.parse(JSON.stringify(this.severData));
      this.findMaximum(this.searchTemp);
      // this.selectedData = this.severData;
    }

    this.resetValues();

  }

  searchSelect(event, filtValue) {

    this.searchTerm = filtValue.toLowerCase();

    if (event.target.name === 'first_box') {
        this.firstBoxArr = this.searchTemp.filter((item, i) => {
          return (item.country.toLowerCase().indexOf(this.searchTerm) !== -1);
        });
    } else if (event.target.name === 'second_box') {
      this.secondBoxArr = this.searchTemp.filter((item, i) => {
        return (item.country.toLowerCase().indexOf(this.searchTerm) !== -1);
      });
    }
  }

  selectData(event, index) {

    console.log(this.firstBoxArr[index]);

    if (event.target.title === 'first_list') {

      console.log(this.firstBoxArr[index]);

      this.firstBoxValue = this.firstBoxArr[index].country;
      this.firstAvgValue = this.firstBoxArr[index].score;

      if (this.firstAvgValue === this.maximumScore || this.firstAvgValue > this.maximumScore) {
        // this.firstAvgValue = 100;
        this.progress1.nativeElement.style.width = 100 + '%';
      } else {
        this.progress1.nativeElement.style.width = (this.firstAvgValue * this.maximumScore) / 100 + '%';
      }
      console.log((this.firstAvgValue * this.maximumScore) / 100);
      this.firstBoxArr = [];

    } else if (event.target.title === 'second_list') {

      console.log(this.secondBoxArr[index]);

      this.secondBoxValue = this.secondBoxArr[index].country;
      this.secondAvgValue = this.secondBoxArr[index].score;

      if (this.secondAvgValue === this.maximumScore || this.secondAvgValue > this.maximumScore) {
        // this.secondAvgValue = 100;
        this.progress2.nativeElement.style.width = 100 + '%';
      } else {
        this.progress2.nativeElement.style.width = (this.secondAvgValue * this.maximumScore) / 100 + '%';
      }

      // this.progress2.nativeElement.style.width = (this.secondAvgValue * this.maximumScore) / 100 + '%';
      console.log((this.secondAvgValue * this.maximumScore) / 100);
      this.secondBoxArr = [];

    }

    this.refillingData();

  }

  refillingData() {
    console.log('refilling');
    if (this.selectedRadioValue === 'test') {
      this.searchTemp = JSON.parse(JSON.stringify(this.test_data));
    } else if (this.selectedRadioValue === 'server') {
      this.searchTemp = JSON.parse(JSON.stringify(this.severData));
    }
    console.log(this.searchTemp);
  }

  resetValues() {
    this.firstBoxValue = '';
    this.secondBoxValue = '';
    this.firstAvgValue = '';
    this.secondAvgValue = '';
    this.progress1.nativeElement.style.width = 0;
    this.progress2.nativeElement.style.width = 0;
  }

  findMaximum(tempArray) {
    this.maximumScore = Math.max.apply(Math, tempArray.map((item) => {
      return item.score;
    }));
    console.log(this.maximumScore);
  }


}
