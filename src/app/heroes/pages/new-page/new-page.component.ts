import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Heroe, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit {

  public formHeroe = new FormGroup({
    id:               new FormControl<string>(''),
    superhero:        new FormControl<string>('', {nonNullable: true}),
    publisher:        new FormControl<Publisher>(Publisher.DCComics),
    alter_ego:        new FormControl(''),
    first_appearance: new FormControl(''),
    characters:       new FormControl(''),
    alter_img:        new FormControl(''),
  })

  public publichers = [
    {id: 'DC Comics', value :"DC - Comics"},
    {id: 'Marvel Comics', value :"Marvel - Comics"}
  ]

  constructor(
    private heroService : HeroesService,
    private activateRoute  : ActivatedRoute,
    private router : Router,
    private snackbar : MatSnackBar,
    private dialog : MatDialog
  ){}

  ngOnInit(): void {
    if(!this.router.url.includes('edit')) return;

    this.activateRoute.params
      .pipe(
        switchMap(({id}) => this.heroService.getHeroById(id) ),
      ).subscribe(hero => {
        
        if(!hero) return this.router.navigateByUrl('/');

        this.formHeroe.reset( hero);
        return;

      });

  }

  get heroeActual () : Heroe {
    const heroe =  this.formHeroe.value as Heroe;
    return heroe
  }

  onSubmit ():void {
    if(this.formHeroe.invalid) return;

    if(this.heroeActual.id){
      this.heroService.updateHero(this.heroeActual)
        .subscribe(hero =>{
          this.showSnackBar(`${hero.superhero} Actualizado`)
        })
      return;  
    }

    this.heroService.addHero(this.heroeActual)
        .subscribe(hero =>{
          this.router.navigate(['/heroes/edit', hero.id])
          this.showSnackBar(`${hero.superhero} creado correctamente`)
        })
  }

  onDeleteHero(){
    if(!this.heroeActual.id) throw Error('Id es requerido');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {name: this.formHeroe.value},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) return;

      this.heroService.deleteHero(this.heroeActual.id)
        .subscribe(eliminado =>{
          if(eliminado)
            this.router.navigate(['/heroes']);
        });
    });
     
  }

  

  showSnackBar (message: string):void {
    this.snackbar.open(message,'done',{
      duration: 2500,
    })
  }

}
