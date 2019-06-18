import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { EquipmentService } from '../../../../service/equipment.service';


@Component({
  selector: 'app-equipment-detail',
  templateUrl: './equipment-detail.component.html',
  styleUrls: ['./equipment-detail.component.scss']
})
export class EquipmentDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private es : EquipmentService) { }
  equipment = {
    id : 0,
    key:"",
    title:"",
    description: "",
    status: "",
    panne: ""

  };
  currentUser;
  ngOnInit() {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.currentUser =data;
      }
    })
    var id = this.route.snapshot.params['id'];
    this.es.getEquip(id).subscribe(e=>{
      this.updateEquipment(e);
    });
  }
  updateEquipment(e:any){
    this.equipment = {
      key: e.nom,
      id : e.id,
      title: e.nom,
      description: e.descriptionpanne,
      status: e.etat,
      panne: e.panne
    };
  }
  getEquipmentDetail(id){
    this.es.getEquip(id).subscribe(function(e){
      this.doSomechange();
    });
  }
  isAuthorized(){
    return this.currentUser.privilege == 1;
  }

  isAuthorizedUpdate(){
    return this.currentUser.privilege == 1 || this.currentUser.privilege ==2;
  }
  deleteEquipment(id) {
    if(this.isAuthorized()){
      this.es.deleteEquipment(id)
      .subscribe(res => {
          this.router.navigate(['/dashboard/equipments']);
        }, (err) => {
          console.log(err);
        }
      );
    }
    
  }

}
