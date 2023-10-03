import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, pipe, map } from 'rxjs';
import { Heroe } from '../interfaces/hero.interface';
import { environments } from 'src/environments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl :string = environments.baseUrl;

  constructor(
    private http : HttpClient
  ) { }

  getHerores ():Observable<Heroe[]> {

    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes`);

  }  

  getHeroById(id:String):Observable<Heroe|undefined>{

    return this.http.get<Heroe>(`${this.baseUrl}/heroes/${id}`)
      .pipe(
        catchError(error => of(undefined)) //devuelve un observable con el undefine
      )

  }

  getSuggestions(query : string):Observable<Heroe[]>{
    return this.http.get<Heroe[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`);
  }

  addHero (heroe: Heroe):Observable<Heroe> {
    return this.http.post<Heroe>(`${this.baseUrl}/heroes`, heroe);
  }

  updateHero (heroe: Heroe):Observable<Heroe> {
    if(!heroe.id)  throw Error('Id del heroe es requerido');
    return this.http.patch<Heroe>(`${this.baseUrl}/heroes/${heroe.id}`, heroe);
  }

  deleteHero (id: String):Observable<boolean> {
    
    return this.http.delete(`${this.baseUrl}/heroes/${id}`)
      .pipe(
        catchError(err => of(false)),
        map( resp => true )
      );
  }

}
