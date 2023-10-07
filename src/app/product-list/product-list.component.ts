import { Component, OnInit, SimpleChanges } from '@angular/core';
import { DataHanderService } from '../shared/data-hander.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  dataList: any[]=[];
  noData:boolean=false;
  dataArr: any[] = [];
  qtyArr: any[] = [];
  isModelVisible: boolean = false;
  subTotal = 0;
  qtyTotal = 0;
  vatAmt = 0;
  discAmt = 0;
  totalAmt = 0;
  date:any;
  billNo = 0;
 
  constructor(private httpserv: DataHanderService) {

  }

  ngOnInit(): void {
    this.httpserv.getData().subscribe((res: any) => {
      console.log(res)
      this.dataList = res; // get data to database.json
      this.qtyArr = Array(this.dataList.length).fill(1)
    })
  }

  passData(res: [], Qty: number, totalAmt: number) {
    this.noData = true;
    this.dataArr.push({ ...res, Qty, totalAmt }) // data get to list and pass in dataArray
    this.calSubTotal()
  }

  delData(i : number){
    this.dataArr.splice(i,1)  // delete selected single data in the table 
    this.calSubTotal()
  }
  calSubTotal() {
    this.subTotal = 0;
    this.qtyTotal = 0;
    this.dataArr.forEach((ele) => {
      this.subTotal += ele.totalAmt;  // calculation of subtotal
      this.qtyTotal += ele.Qty;       // calculation of total Item
    })
    this.vatAmt = this.subTotal * 0.1;
    this.discAmt = 0.1 * (this.subTotal + this.vatAmt);
    this.totalAmt = this.subTotal + this.vatAmt - this.discAmt;
  }
  decrement(i: number) {
    if (this.qtyArr[i] > 1) {
      this.qtyArr[i]--;  // this is quntity decreament
      this.dataArr[i].Qty = this.qtyArr[i]
      this.dataArr[i].totalAmt = this.qtyArr[i] * this.dataArr[i].price //when quantity decrement then price also decrease

      this.calSubTotal()
    }
  }
  increment(i: number) {  
    this.qtyArr[i]++    // this is quntity increment
    this.dataArr[i].Qty = this.qtyArr[i] 
    this.dataArr[i].totalAmt = this.qtyArr[i] * this.dataArr[i].price // when quantity increment then price also increase
    this.calSubTotal()
  }

  cancelSale() {  // this function is reset data in selected product table by using cancel sale btn
    this.dataArr = []
  }
  sendToReceipt() {   // this function is send data to receipt by using process sale button
    this.date = new Date()
    this.billNo = Math.ceil(Math.random() * 10)
    this.isModelVisible = !this.isModelVisible
    const parentData = document.getElementById('productData')?.classList.add("decrOpacity")
  }
  CloseBtn() { 
    const closeBtn = document.getElementById('productData')?.classList.remove("decrOpacity")
    const close = document.getElementById('model')?.classList.add("incrOpacity")

  }
}
