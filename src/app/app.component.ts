import {Component, OnInit} from '@angular/core';
import {FieldCellStatusEnum} from './model/fieldCellStatus.enum';
import {CoordinatesModel} from './model/coordinates.model';
import {Way} from './services/Way';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'ProgVsBugs';
  result: Array<CoordinatesModel> = [];
  field: Array<Array<FieldCellStatusEnum>> = [];

  ngOnInit(): void {
    const n = 40;
    const m = 40;
    for (let i = 0; i < n; i++) {
      this.field.push([]);
      for (let j = 0; j < m; j++) {
        this.field[i].push(FieldCellStatusEnum.WAY_CELL);
      }
    }
    this.field[0][0] = FieldCellStatusEnum.START_CELL;
    this.field[n - 1][m - 1] = FieldCellStatusEnum.FINISH_CELL;
  }

  cellClick(coordinates: CoordinatesModel): void {
    this.field[coordinates.i][coordinates.j] = FieldCellStatusEnum.FIRST_GUN;
    const way = new Way(this.field);
    this.result = way.result;
  }
}
