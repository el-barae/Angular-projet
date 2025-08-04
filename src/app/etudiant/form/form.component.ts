import { Component } from '@angular/core';
import {Validators, FormBuilder, ReactiveFormsModule, FormGroup} from '@angular/forms'
import { EtudiantService } from '../etudiant.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

interface Etudiant{
  id: number;
  nom: string;
  prenom: string;
  age: number;
}

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {
  formEtudiant: FormGroup;
  etudiantData: Etudiant = { id: 0, nom: '', prenom: '', age: 0 };
  Action: string = "Ajouter";
  constructor(private fb: FormBuilder, private etudiantService: EtudiantService, public activeModal:NgbActiveModal) {
    this.formEtudiant = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      age: ['', Validators.required]
    });
  }

  ngOnInit(){
    if(this.Action=="Modifier")
    this.formEtudiant.setValue(this.etudiantData)
  }

  addEtudiant() {
    if (this.formEtudiant.valid) {
      this.etudiantService.addEtudiant(this.formEtudiant.value);
      this.closeModal();
    }
  }

  action(){
    if(this.Action=="Ajouter"){
      this.addEtudiant()
    }
    else{
      this.updateEtudiant(this.etudiantData)
    }
  }

  updateEtudiant(etudiant:Etudiant){
    this.etudiantService.updateEtudiant(etudiant)
    this.closeModal();
  }

  closeModal(){
    this.activeModal.close();
  }
}
