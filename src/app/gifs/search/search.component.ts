import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent {

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

  buscar() {
    const valor = this.txtBuscar.nativeElement.value;
    console.log(valor);
    this.txtBuscar.nativeElement.value = '';
  }

}
