import { Component } from '@angular/core';
import { EtudiantService } from '../../etudiant.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  imports: [],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.css'
})
export class DeleteModalComponent {
  etudiantData:any

  constructor(private etudiantService: EtudiantService, public activeModal:NgbActiveModal) {

  }

  deleteEtudiant(id:number){
    this.etudiantService.deleleteEtudiant(id)
    this.closeModal()
  }

  closeModal(){
    this.activeModal.close();
  }
}
