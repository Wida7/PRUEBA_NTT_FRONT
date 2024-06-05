import { Injectable } from '@angular/core';
import data from '../../utils/data.json';
import { Observable, map, of } from 'rxjs';
import { Persona } from '../../interfaces/persona/persona';
import { HttpClient } from '@angular/common/http';
import { Response } from '../../interfaces/response/response';

@Injectable({
  providedIn: 'root'
})
export class BuscarPersonaService {

  // URL de la API
  private apiUrl = 'http://localhost:8090/api/personas/buscar'; 

  constructor(
    private http: HttpClient
  ) {}

  //servicio que consume el API y retorna lo opbetino con interfaz Response
  buscarPersonaAPI(tipoIdentificacion: string, identificacion: string): Observable<Response | undefined> {
    return this.http.get<Response | undefined>(this.apiUrl, { params: { tipoIdentificacion, identificacion } });
  }

  buscarPersona(tipoDocumento: string, documento: string): Observable<Persona | undefined> {
    // cargo los datos del archivo JSON
    const personas: Persona[] = data;

    //console.log(personas);
    
    //busco en la lista de personas los parametros requeridos
    return of(personas).pipe(
      map(personas => personas.find(persona =>
        persona.tipoIdentificacion === tipoDocumento && persona.identificacion === documento
      ))
    );
  }  

}
