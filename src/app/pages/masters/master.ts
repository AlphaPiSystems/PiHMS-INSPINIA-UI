import { Component } from '@angular/core';
import { Diagtest } from './components/diagtest/diagtest';
// import { Diagtest as Diagtest2 } from './diagtest/diagtest';
// import { Diagtest as Diagtest3 } from './components/diagtests/diagtest/diagtest';     

@Component({
  selector: 'app-master',
  imports: [Diagtest],
  templateUrl: './master.html',
  styleUrl: './master.scss',
})
export class MasterComponent {

}
