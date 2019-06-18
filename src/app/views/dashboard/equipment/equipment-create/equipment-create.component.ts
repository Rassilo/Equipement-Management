import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EquipmentService } from '../../../../service/equipment.service';

@Component({
  selector: 'app-equipment-create',
  templateUrl: './equipment-create.component.html',
  styleUrls: ['./equipment-create.component.scss']
})
export class EquipmentCreateComponent implements OnInit {

  equipmentForm: FormGroup;
  title:string='';
  description:string='';
  panne:string='';
  status:string='';
  id : number;
  registerForm: FormGroup;
  submitted = false;
  enPanne = false;
  constructor(private router: Router, private es:EquipmentService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      title: ['', Validators.required],
      id: ['', Validators.required],
      });
  }

  onChange(value){
    if(value == "en panne"){
      this.enPanne = true;
    }
    else if(value == "en marche"){
      this.enPanne = false;
     this.registerForm.patchValue({"panne":""});
    }
  }

  get f2() { return this.equipmentForm.controls; }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    let equipment = {
      id : this.registerForm.value.id,
      nom: this.registerForm.value.title,
      descriptionpanne: "",
      etat: "en marche",
      panne: "0"
    };
    if(equipment.etat == "en marche")
      equipment.panne="";
    this.es
    .createEquipment(equipment)
    .subscribe(res => {
        alert("Ajout terminé")
        this.router.navigate(['/dashboard/equipments']);
    }, (err) => {
        console.log(err);
    });
  }

}
