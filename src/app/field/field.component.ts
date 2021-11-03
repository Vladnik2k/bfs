import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FieldCellStatusEnum} from '../model/fieldCellStatus.enum';
import {CoordinatesModel} from '../model/coordinates.model';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {

  @Input() field: Array<Array<FieldCellStatusEnum>> = [];
  @Input() result: Array<CoordinatesModel> = [];
  FieldCellStatusEnum = FieldCellStatusEnum;
  @Output() cellClick = new EventEmitter<CoordinatesModel>();

  constructor() { }

  ngOnInit(): void {
  }

  fieldClick(i: number, j: number): void {
    this.cellClick.emit({i, j});
  }

  isInResult(i: number, j: number): boolean {
    return !!this.result.find(el => el.i === i && el.j === j);
  }

}
