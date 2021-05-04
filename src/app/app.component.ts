import {Component} from '@angular/core';
import {FieldCellStatusEnum} from './model/fieldCellStatus.enum';
import {CoordinatesModel} from './model/coordinates.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ProgVsBugs';
  field = [
    [ FieldCellStatusEnum.WAY_CELL,
      FieldCellStatusEnum.WAY_CELL,
      FieldCellStatusEnum.WAY_CELL,
      FieldCellStatusEnum.WAY_CELL,
      FieldCellStatusEnum.WAY_CELL ],

    [ FieldCellStatusEnum.WAY_CELL,
      FieldCellStatusEnum.WAY_CELL,
      FieldCellStatusEnum.WAY_CELL,
      FieldCellStatusEnum.WAY_CELL,
      FieldCellStatusEnum.WAY_CELL ],

    [ FieldCellStatusEnum.WAY_CELL,
      FieldCellStatusEnum.WAY_CELL,
      FieldCellStatusEnum.WAY_CELL,
      FieldCellStatusEnum.WAY_CELL,
      FieldCellStatusEnum.WAY_CELL ],

    [ FieldCellStatusEnum.WAY_CELL,
      FieldCellStatusEnum.WAY_CELL,
      FieldCellStatusEnum.WAY_CELL,
      FieldCellStatusEnum.WAY_CELL,
      FieldCellStatusEnum.WAY_CELL ],

    [ FieldCellStatusEnum.WAY_CELL,
      FieldCellStatusEnum.WAY_CELL,
      FieldCellStatusEnum.WAY_CELL,
      FieldCellStatusEnum.WAY_CELL,
      FieldCellStatusEnum.WAY_CELL ]
  ];

  cellClick(coordinates: CoordinatesModel): void {
    this.field[coordinates.i][coordinates.j] = FieldCellStatusEnum.FIRST_GUN;
  }
}
