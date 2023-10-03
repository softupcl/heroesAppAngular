import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroImage'
})
export class HeroImagePipe implements PipeTransform {

  transform(heroe:Heroe ): string {
    if(!heroe.id && !heroe.alter_img) {
      return 'assets/no-image.png'
    }

    if(heroe.alter_img) return heroe.alter_img
    
    return `assets/heroes/${heroe.id}.jpg`
  }

}
