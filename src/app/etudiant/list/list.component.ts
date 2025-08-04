import { Component } from '@angular/core';
import { FormComponent } from '../form/form.component';
import { EtudiantService } from '../etudiant.service'; 
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { DeleteModalComponent } from './delete-modal/delete-modal.component';
import { Signal } from '@angular/core';

interface Etudiant{
  id: number;
  nom: string;
  prenom: string;
  age: number;
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  etudiants: Signal<Etudiant[]>;

  constructor(private etudiantService: EtudiantService, private modal: NgbModal) {
    this.etudiants = this.etudiantService.getEtudiants(); 
  }
  /*ngOnInit(){
    this.etudiants=this.etudiantService.getAllEtudiants()
  }*/

  openModal(){
    this.modal.open(FormComponent)
  }

  deleteEtudiant(id:number){
    this.etudiantService.deleleteEtudiant(id)
  }

  updateEtudiant(etudiant:Etudiant){
    const ref  = this.modal.open(FormComponent)
    ref.componentInstance.Action = 'Modifier';
    ref.componentInstance.etudiantData=etudiant
  }

  openDeleteModal(etudiant:Etudiant){
    const ref=this.modal.open(DeleteModalComponent)
    ref.componentInstance.etudiantData=etudiant;
    ref.result.then(result => {
      if(result=='oui'){
        this.deleteEtudiant(etudiant.id)
      }
    })
  }
}
