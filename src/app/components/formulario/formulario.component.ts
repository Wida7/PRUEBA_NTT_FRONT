import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {

  constructor(private router: Router) {}

  //Variable para el efecto visual del input
  documentoVisual: string = '';

  //Interfaz del formulario
  userData = new FormGroup({
    tipoDocumento: new FormControl('', Validators.required),
    documento: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(11)])
  });

  //Evento de enivo de los datos
  handleSubmit(): void {
    console.log('Form data:', this.userData.value);
    this.redirect(this.userData.value.tipoDocumento, this.userData.value.documento);
  }

  //función para redireccionar y enviar los datos por parametros al componente información
  redirect(tipoDocumento: any, documento: any) {
    this.router.navigate(['/informacion'],{ queryParams: { tipoDocumento, documento } });
  }

  //función para darle formato al input
  formatNumber(event: any) {
    //capturro el valor
    const input = event.target;
    //Si ya fue modificado remuevo puntos, espacios y letras por medio de expreciones regulares
    let value = input.value.replace(/,/g, ''); 
    value = value.replace(/\D/g, '');
    //Agrego el valor a mi variable creada para ser visualizada en el input
    this.documentoVisual = this.addThousandSeparators(value);
    //Evito que el evento afecte el valor de envío al formulario
    this.userData.controls['documento'].setValue(value, { emitEvent: false });
  }

  addThousandSeparators(value: string): string {
    //Expresión regular para ajustar agregar el punto
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }

}
