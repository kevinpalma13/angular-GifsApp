import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private url: string = 'https://api.giphy.com/v1/gifs';
  private apiKey: string = 'HN7Muysl9cgHDVozMk5rcJHrdnGQG6vR';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial(){
    return [...this._historial];
  }

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('last_gifs')!) || [];
  }

  buscarGifs(query:string){
    query = query.trim().toLocaleLowerCase();

    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
          .set('api_key',this.apiKey)
          .set('q',query)
          .set('limit','10');

    this.http.get<SearchGifsResponse>(`${this.url}/search`, {params})
      .subscribe((response) => {
        this.resultados = response.data;
        localStorage.setItem('last_gifs', JSON.stringify(this.resultados));
      });
  }
  
}
