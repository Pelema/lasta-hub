//import component, ElementRef, input and the oninit method from angular core
import { Component, ViewChild, OnInit, AfterViewInit, ElementRef, Input } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
//import the file-upload plugin
import {  FileUploader } from 'ng2-file-upload';
//import the native angular http and respone libraries
import { Http, Response } from '@angular/http';
import {BoSSubmitService} from '../services/bos-submit.service';

@Component({
    selector: 'bos-submit-final',
    standalone: true,
    templateUrl: 'bos-submit-final.component.html'
})

export class BosSubmitFinalComponent implements OnInit{
    model: any = {};
    programmeCode: string;
    startDate: Date;
    dataService: BoSSubmitService;
    postMyDataToServer: string;

  constructor(private _dataService: BoSSubmitService, private router: Router) {
    this.dataService = _dataService;
  }

  ngOnInit() {
  }


      postDataToServer (){
        this._dataService.startNeedAnalysis(this.programmeCode, this.startDate)
          .subscribe(data => this.postMyDataToServer = JSON.stringify(data), // put the data returned from the server in our variable
                error => alert('Server: Error HTTP Post Service'), // in case of failure show this message
                () => alert('BOS session successfully started !')//run this code in all cases
            );
    }


    clear(){
        this.model.programmeCode = '';
        this.model.bossubmissionDate = null;
        }
}
