import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';

  
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { observable, Observable } from 'rxjs';
import { catchError,map,tap } from 'rxjs/operators';

import { of } from 'rxjs';
@Injectable()
export class PokemonsService {
  
  constructor(private httpClient: HttpClient){}
  private pokemonUrl ='api/pokemons';
  private log(log: string){
    console.info(log);
  }

  private handleError<T>(operation='operation',result?:T){
    return (error:any): Observable<T> =>{
      console.log(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
    // Retourne tous les pokémons
    getPokemons(): Observable<Pokemon[]> {
     return this.httpClient.get<Pokemon[]>(this.pokemonUrl).pipe(
       tap(_=>this.log(`fetched pokemons`)),
       catchError(this.handleError(`getPokemons`,[]))
     );
    }
      
    updatePokemon(pokemon: Pokemon): Observable<Pokemon>{
      const httoOptions = {
        headers: new HttpHeaders({'content-type':'application/json'})
      };
      
      return this.httpClient.put(this.pokemonUrl,pokemon,httoOptions).
      pipe(tap(_=>this.log(`update pokemon`)),
      catchError(this.handleError<any>(`updatePokemon`)));

    }

    deletePokemon(pokemon: Pokemon):Observable<Pokemon>{
      const url =`${this.pokemonUrl}/${pokemon.id}`;
      const httoOptions = {
        headers: new HttpHeaders({'content-type':'application/json'})
      };
      
      return this.httpClient.delete<Pokemon>(url,httoOptions).
      pipe(tap(_=>this.log(`delete pokemon`)),
      catchError(this.handleError<Pokemon>(`deletePokemon`)));

    }

    searchPokemon(term: string): Observable<Pokemon[]>{
        if(!term.trim()){
          return of([]);
        }
        return this.httpClient.get<Pokemon[]>(`${this.pokemonUrl}/?name=${term}`).pipe(
          tap(_=>this.log(`search pokemons by name`)),
          catchError(this.handleError(`searchPokemon`,[]))
        );
    }
    // Retourne le pokémon avec l'identifiant passé en paramètre
    getPokemon(id: number): Observable<Pokemon> {
      const url =`${this.pokemonUrl}/${id}`;
      return this.httpClient.get<Pokemon>(url).pipe(
        tap(_=>this.log(`get pokemon`)),
        catchError(this.handleError<Pokemon>(`getPokemon`)))
      ;
    }
	
	getPokemonTypes(): string[]{
		return ['Plante','Poison','Feu','Eau','Insecte','Normal','Vol','Electrik','Fée'];
	}
}