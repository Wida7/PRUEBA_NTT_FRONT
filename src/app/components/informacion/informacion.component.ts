import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from '../../interfaces/persona/persona';
import { BuscarPersonaService } from '../../services/buscarPersona/buscar-persona.service';
import { Response } from '../../interfaces/response/response';

@Component({
  selector: 'app-informacion',
  standalone: true,
  imports: [],
  templateUrl: './informacion.component.html',
  styleUrl: './informacion.component.css'
})
export class InformacionComponent {

  constructor(
    private route: ActivatedRoute,
    private buscarPersonaService: BuscarPersonaService,
    private router: Router
  ) {}

  tipoDocumento: string = "";
  documento: string = "";
  persona?: Persona;
  primerApellido: string = "";
  primerNombre: string= "";
  mensaje?: string;

  //Al inicializar el componente leo los parametros que llegan
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.tipoDocumento = params['tipoDocumento'];
      this.documento = params['documento'];
    });

    //*** SERVICIO FRONT PARA BUSCAR ***//
    //Según los parametros utilizo mi servicio de buscar persona
    /* this.buscarPersonaService.buscarPersona(this.tipoDocumento, this.documento).subscribe(persona => {
      this.persona = persona;
      this.primerApellido = persona?.primerApellido;
      this.primerNombre = persona?.primerNombre;
    }); */

    //Consumimos servicio que consulta a mi API y retornamos el mensaje de respuesta
    this.buscarPersonaService.buscarPersonaAPI(this.tipoDocumento, this.documento).subscribe(response => {
      if (response) {
        if (response.response != "(200) Persona encontrada") {
          this.mensaje = response.response
        } else {
          this.persona = response?.persona;
          this.primerApellido = this.persona?.primerApellido;
          this.primerNombre = this.persona?.primerNombre;
          console.log(response);
        }
      }
    },
      (error) => {
        console.error('Error al buscar la persona', error);
      }
    );

    //console.log(this.persona);
    
  }

  //función del botón volver
  volver() {
    this.router.navigate(['/formulario']);
  }
}
