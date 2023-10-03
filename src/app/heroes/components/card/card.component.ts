import { Component, Input, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/hero.interface';

@Component({
  selector: 'heroes-heroe-card',
  templateUrl: './card.component.html',
  styles: [
  ]
})
export class CardComponent implements OnInit{
 
  @Input()
  public heroe! : Heroe;

  ngOnInit(): void {
    if(!this.heroe) throw new Error('Property Hero es requerida');
  }
}
