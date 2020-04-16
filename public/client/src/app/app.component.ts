import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http"
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  src; 
 constructor(private http:HttpClient){}


  getScreenshot(input:HTMLInputElement){
    let url = input.value;
  
    if (!url) return;

    this.http.get('/getScreenshot?url=' + url,{responseType:'text'}).subscribe(res=>{
      this.src = res;
      console.log('src',res);
    },err=>{
      console.log('err',err);
    })
  }
}
