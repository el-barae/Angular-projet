import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-etudiant',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './etudiant.component.html',
  styleUrl: './etudiant.component.css'
})
export class EtudiantComponent {
  constructor(private modal: NgbModal){}
  openFormModal() {
    const modalRef = this.modal.open(FormComponent);
    modalRef.componentInstance.onAddEtudiant = (etudiant: any) => {
      console.log("New Etudiant:", etudiant);
      //modalRef.close();
    };
  }
}
