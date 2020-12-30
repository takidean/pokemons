"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PokemonsService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var operators_1 = require("rxjs/operators");
var rxjs_1 = require("rxjs");
var PokemonsService = /** @class */ (function () {
    function PokemonsService(httpClient) {
        this.httpClient = httpClient;
        this.pokemonUrl = 'api/pokemons';
    }
    PokemonsService.prototype.log = function (log) {
        console.info(log);
    };
    PokemonsService.prototype.handleError = function (operation, result) {
        if (operation === void 0) { operation = 'operation'; }
        return function (error) {
            console.log(error);
            console.log(operation + " failed: " + error.message);
            return rxjs_1.of(result);
        };
    };
    // Retourne tous les pokémons
    PokemonsService.prototype.getPokemons = function () {
        var _this = this;
        return this.httpClient.get(this.pokemonUrl).pipe(operators_1.tap(function (_) { return _this.log("fetched pokemons"); }), operators_1.catchError(this.handleError("getPokemons", [])));
    };
    PokemonsService.prototype.updatePokemon = function (pokemon) {
        var _this = this;
        var httoOptions = {
            headers: new http_1.HttpHeaders({ 'content-type': 'application/json' })
        };
        return this.httpClient.put(this.pokemonUrl, pokemon, httoOptions).
            pipe(operators_1.tap(function (_) { return _this.log("update pokemon"); }), operators_1.catchError(this.handleError("updatePokemon")));
    };
    PokemonsService.prototype.deletePokemon = function (pokemon) {
        var _this = this;
        var url = this.pokemonUrl + "/" + pokemon.id;
        var httoOptions = {
            headers: new http_1.HttpHeaders({ 'content-type': 'application/json' })
        };
        return this.httpClient.delete(url, httoOptions).
            pipe(operators_1.tap(function (_) { return _this.log("delete pokemon"); }), operators_1.catchError(this.handleError("deletePokemon")));
    };
    PokemonsService.prototype.searchPokemon = function (term) {
        var _this = this;
        if (!term.trim()) {
            return rxjs_1.of([]);
        }
        return this.httpClient.get(this.pokemonUrl + "/?name=" + term).pipe(operators_1.tap(function (_) { return _this.log("search pokemons by name"); }), operators_1.catchError(this.handleError("searchPokemon", [])));
    };
    // Retourne le pokémon avec l'identifiant passé en paramètre
    PokemonsService.prototype.getPokemon = function (id) {
        var _this = this;
        var url = this.pokemonUrl + "/" + id;
        return this.httpClient.get(url).pipe(operators_1.tap(function (_) { return _this.log("get pokemon"); }), operators_1.catchError(this.handleError("getPokemon")));
    };
    PokemonsService.prototype.getPokemonTypes = function () {
        return ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Normal', 'Vol', 'Electrik', 'Fée'];
    };
    PokemonsService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], PokemonsService);
    return PokemonsService;
}());
exports.PokemonsService = PokemonsService;
//# sourceMappingURL=pokemons.service.js.map