import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { EquipmentService } from '../../../../service/equipment.service';
@Component({
  selector: 'app-equipment-edit',
  templateUrl: './equipment-edit.component.html',
  styleUrls: ['./equipment-edit.component.scss']
})
export class EquipmentEditComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private es:EquipmentService, private formBuilder: FormBuilder) { }
  equipmentForm: FormGroup;
  registerForm: FormGroup;
  submitted = false;
  enPanne = false;
  isPanne = false;
  isMarche = false;
  equipment = {
    id : 0,
    key:"",
    title:"",
    description: "",
    status: "",
    panne: ""
  };
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      panne: ['', Validators.required],
      status: ['', Validators.required],
      id: ['', Validators.required]
      });
    var id = this.route.snapshot.params['id'];
    this.es.getEquip(id).subscribe(e=>{
      this.updateEquipment(e);
    });
  }
  updateEquipment(e:any){
    this.isPanne = e.etat.toLowerCase().includes("panne");
    this.isMarche = e.etat.toLowerCase().includes("marche");
    if(this.isPanne)
      this.enPanne=true;
    this.registerForm.setValue({
      title: e.nom,
      description: e.descriptionpanne,
      panne : e.panne,
      id : e.id,
      status : e.etat
    });
  }
  get f() { return this.registerForm.controls; }
  equipDetail(){
    this.router.navigate(['/equipment-details', this.equipment.title]);
  }
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    let equipment = {
      id : this.registerForm.value.id,
      nom: this.registerForm.value.title,
      descriptionpanne: this.registerForm.value.description,
      etat: this.registerForm.value.status,
      panne: this.registerForm.value.panne
    };
    if(equipment.etat.toLowerCase().includes("marche")){
      equipment.panne="";
      equipment.descriptionpanne="";
    }

    this.es.updateEquipment(equipment)
      .subscribe(res => {
          alert("Modifier terminé")
          this.router.navigate(['/dashboard/equipments']);
        }, (err) => {
          console.log(err);
        }
      );

  }
  
  onChange(value){
    if(value == "en panne"){
      this.enPanne = true;
    }
    else if(value == "en marche"){
      this.enPanne = false;
   //  this.registerForm.patchValue({"panne":""});
    }
  }
}
