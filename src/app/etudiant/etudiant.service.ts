import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { signal } from '@angular/core';

interface Etudiant{
  id: number;
  nom: string;
  prenom: string;
  age: number;
}

@Injectable({
  providedIn: 'root'
})

export class EtudiantService {
  etudiants = signal<Etudiant[]>([]);
  backEndUrl="http://localhost:8080/api/etudiants"

  constructor(private http:HttpClient) {
    this.getAllEtudiants();
   }

   getAllEtudiants() {
    this.http.get<Etudiant[]>(this.backEndUrl).subscribe(data => {
      this.etudiants.set(data);
    });
  }

  getEtudiants() {
    return this.etudiants; 
  }

  addEtudiant(etudiant: Etudiant) {
    //this.etudiants.push(etudiant)
    this.http.post<Etudiant>(this.backEndUrl,etudiant).subscribe((etudiant)=>{
      this.etudiants.update(state=>[...state,etudiant])
    })
  }

  deleleteEtudiant (id:number){
    /*const index = this.etudiants.findIndex(etudiant=>etudiant.id==id)
    this.etudiants.splice(index,1)*/
    this.http.delete<boolean>(this.backEndUrl+'/'+id).subscribe(retour=>{
      if(retour)
        this.etudiants.update(state => state.filter(e=>e.id===id))
    })
  }

  updateEtudiant(etudiant:Etudiant){
    /*const index = this.etudiants.findIndex(etudiant=>etudiant.id==e.id)
    this.etudiants[index]=e*/
    this.http.put<Etudiant>(this.backEndUrl+'/'+etudiant.id,etudiant).subscribe(updateEtudiant=>{
      this.etudiants.update(state=>state.map(e => (e.id===etudiant.id)?updateEtudiant:e))
    })  
  }
}
