import { Component, OnInit } from '@angular/core';
import { EquipmentService } from '../../../../service/equipment.service';
import { ActivatedRoute } from '@angular/router';
import { query } from '@angular/core/src/render3';
@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.scss']
})
export class EquipmentListComponent implements OnInit {

 constructor(private route: ActivatedRoute,private equipmentService : EquipmentService) { }
  displayedColumns = ['title', 'description', 'panne','status'];
  dataSource = [];
  alldata = [];
  currentUser;
  page=1;
  max=3;
  total =0;
  pages=[];
  query = false;
  ngOnInit() {

    this.route.queryParams
    .subscribe(params => {
      if( params.page != undefined)
       this.page = params.page;
      if(this.query)
       this.getCurrentData();
    });

    this.equipmentService.getCustomData().subscribe(list =>{
      let i=0;
      list.forEach(element => {
          i ++;
          this.alldata.push(element);     
      });
      let div = Math.floor(i/this.max);
      let rest = i % this.max ;
      if( rest == 0){
        this.total = div;
      }else {
        this.total = div+1;
      }
      for(let i = 1 ;i<= this.total;i++){
        this.pages.push(i);
      }
      this.alldata = this.alldata.sort((e1,e2)=>e1.key - e2.key);
      this.getCurrentData();
      this.query = true;
    });
    
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.currentUser =data;
      }
    })
  }

  getCurrentData(){
    let start=this.max*(this.page-1);
    let end= start + this.max-1;
    this.dataSource = [];
    console.log(start+ " , "+end)
    for(let i=start ; i<=end;i++){
      if(this.alldata[i])
        this.dataSource.push(this.alldata[i]);
    }
  }

  goTo(page){
    this.page = page;
    this.getCurrentData();
  }
  isAuthorizedUpdate(){
   // console.log(this.currentUser.privilege);
    return this.currentUser.privilege == 1 || this.currentUser.privilege ==2;
  }

}


