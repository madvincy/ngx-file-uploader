import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public dataModel: string;
  public upload(file: any) {
    console.log('file', file);
    this.dataModel = 'https://unsplash.it/200/300';
  }
  public clear() {
    this.dataModel = '';
    console.log('Clear');
  }
}
