import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Pokemon } from './pokemon';
import { PokemonsService } from './pokemons.service';
 
@Component({
    selector: 'detail-pokemon',
    templateUrl: './app/pokemons/detail-pokemon.component.html',
})
export class DetailPokemonComponent implements OnInit {
  
    pokemon: Pokemon = null;
  
    constructor(private route: ActivatedRoute, private router: Router,private pokemonService: PokemonsService) {}
  
    ngOnInit(): void {
        
        let id = +this.route.snapshot.paramMap.get('id');
        this.pokemonService.getPokemon(id)
        .subscribe(pokemon=>this.pokemon=pokemon);
        ;
    }
  
    goBack(): void {
        this.router.navigate(['/pokemons']);
    }
    delete(pokemon: Pokemon): void{
        this.pokemonService.deletePokemon(this.pokemon)
        .subscribe(()=>this.goBack())
  
    }
  goEdit(): void{
	  let link=['/pokemon/edit',this.pokemon.id]
	  this.router.navigate(link);
  }
}