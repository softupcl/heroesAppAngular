import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: [
  ]
})
export class ListPageComponent  implements OnInit {

  public heroes : Heroe[] = [];

  constructor(
    private heroesService : HeroesService
  ){}

  ngOnInit(): void {
    this.heroesService.getHerores()
      .subscribe(heroes => this.heroes = heroes );
  }

}
