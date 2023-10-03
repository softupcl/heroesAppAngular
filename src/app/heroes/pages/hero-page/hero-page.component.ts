import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Heroe } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: [
  ]
})
export class HeroPageComponent implements OnInit {

  public heroe? : Heroe

  constructor(
    private heroeService: HeroesService,
    private activateRoute: ActivatedRoute, 
    private router : Router
  ){}

  ngOnInit(): void {
    
    this.activateRoute.params
      .pipe(
        switchMap(({id}) => this.heroeService.getHeroById(id)),
      ).subscribe(heroe => {
        
        if(!heroe) return this.router.navigate(['/heroes/list'])

        this.heroe = heroe;
        console.log({heroe});
        return;
      })

  }

  goBack(): void{
    this.router.navigateByUrl('heroes/list')
  }

}
