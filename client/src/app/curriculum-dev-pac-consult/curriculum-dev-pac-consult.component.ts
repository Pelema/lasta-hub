import { Router } from '@angular/router';
//import component, ElementRef, input and the oninit method from angular core
import { Component, ElementRef, OnInit } from '@angular/core';
//import the file-upload plugin
import { FileUploader, FileUploadModule } from 'ng2-file-upload';
//import the native angular http and respone libraries
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
const URL = '/api/consultations/pac/consult';

//create the component properties
@Component({
    //define the element to be selected from the html structure.
    selector: 'curriculum-dev-pac-consult',
    //location of our template rather than writing inline templates.
    templateUrl: 'curriculum-dev-pac-consult.component.html',
    imports: [FormsModule, FileUploadModule]
})
export class CurriculumDevPACConsultComponent implements OnInit {
  model: any = {};
  consultationDate: Date;
  private fileMap = new Map();
  devCode: String;



  //declare a property called fileuploader and assign it to an instance of a new fileUploader.
  //pass in the Url to be uploaded to, and pass the itemAlais, which would be the name of the //file input when sending the post request.
  public uploader: FileUploader = new FileUploader({ url: URL, itemAlias: 'pac-consult' });
  //This is the default title property created by the angular cli. Its responsible for the app works
  title = 'app works!';

  //declare a constroctur, so we can pass in some properties to the class, which can be    //accessed using the this variable
  constructor(private http: HttpClient, private el: ElementRef, private router: Router) {

  }
  ngOnInit() {
    //override the onAfterAddingfile property of the uploader so it doesn't authenticate with //credentials.
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onBuildItemForm = (item: any, form: any) => {
      form.append('devCode', this.model.programmeCode);
      form.append('date', this.model.consultationDate);

    };
    //overide the onCompleteItem property of the uploader so we are
    //able to deal with the server response.
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      console.log("FileUpload:successfully uploaded:", item, status, response);
      if (status == 201) {

        alert("FileUpload: successfully");

      }
      else {
        alert("FileUpload:" + response);

      }

    };
  }


  clear() {
    this.model.programmeCode = "";
    this.model.consultationDate = null;
    (<HTMLInputElement>document.getElementById("endorsements")).value = "";
    (<HTMLInputElement>document.getElementById("benchmarking")).value = "";

  }
  uploadFiles() {
    const request = new XMLHttpRequest();
    // POST to httpbin which returns the POST data as JSON
    request.open('POST', URL, /* async = */ false);
    const newform = new FormData();
    newform.append('devCode', this.model.programmeCode);
    newform.append('date', this.model.consultationDate);
    for (const item of this.uploader.queue) {
      let label = this.fileMap.get(item._file.name);
      newform.append(label, item._file, item._file.name);
    }
    console.log(newform);
    request.send(newform);
  }
  updateFile(id: string) {
    (<HTMLInputElement>document.getElementById(id)).value = "";
    if (this.uploader.queue.length > 2) {
      for (var i = 0; i < this.uploader.queue.length - 1; i++) {
        this.uploader.queue[i] = this.uploader.queue[i + 1];
        console.log(this.uploader.queue[i]);
      }
      this.uploader.queue[2].remove();
    }
    this.fileMap.set(this.uploader.queue[this.uploader.queue.length - 1].file.name, id);
    (<HTMLInputElement>document.getElementById(id)).value = this.uploader.queue[this.uploader.queue.length - 1].file.name;
  }

  removefile(id: string) {
    var label = (<HTMLInputElement>document.getElementById(id)).value;
    for (var i = 0; i < this.uploader.queue.length; i++) {
      if (this.uploader.queue[i].file.name === label) {
        this.fileMap.delete(this.uploader.queue[i].file.name);
        this.uploader.queue[i].remove();
        break;
      }
    }
    (<HTMLInputElement>document.getElementById(id)).value = "";


  }
  allowSubmission() {
    if (this.model.type == false && this.uploader.queue.length == 2) {
      return false;
    }
    else if (this.model.type == true && this.uploader.queue.length == 1)
      return false;
    else
      return true;

  }

  close() {
    console.log("closing the window...");
    this.router.navigate(['/home']);
  }

}
