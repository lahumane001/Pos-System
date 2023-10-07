import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class DataHanderService {

  constructor(private http : HttpClient) { }
  // selectedData:any;

  baseUrl = "http://localhost:3000/data"

  getData(){
   return this.http.get(this.baseUrl)
  }

  
  // sendData(res : any , i : any){
  //   this.selectedData = res;

  //   console.log(this.selectedData)
  // }
}
