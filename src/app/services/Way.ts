import {FieldCellStatusEnum} from '../model/fieldCellStatus.enum';
import {CoordinatesModel} from '../model/coordinates.model';

export class Way {
  field: Array<Array<FieldCellStatusEnum>>;
  matrixDistances: Array<Array<number>>;
  defaultMatrixValue = -1;

  start: CoordinatesModel;
  finish: CoordinatesModel;

  result: Array<CoordinatesModel>;

  constructor(field: Array<Array<FieldCellStatusEnum>>) {
    // this.field = JSON.parse(JSON.stringify(field));
    this.field = field;
    this.matrixDistances = this.getNewMatrixDistances();

    this.start = this.getPointByStatus(FieldCellStatusEnum.START_CELL);
    this.finish = this.getPointByStatus(FieldCellStatusEnum.FINISH_CELL);

    this.result = [];
    this.findWay();
  }

  public findWay(): void {
    this.fillMatrixDistances();

    if (this.matrixDistances[this.finish.i][this.finish.j] > this.matrixDistances[this.start.i][this.start.j]) {
      this.fillWayForEnemies();
    }
  }

  private getNewMatrixDistances(): Array<Array<number>> {
    return new Array(this.field.length).fill(0).map(_ => new Array(this.field[0].length).fill(this.defaultMatrixValue));
  }

  private getPointByStatus(status: FieldCellStatusEnum): CoordinatesModel {
    for (let i = 0; i < this.field.length; i++) {
      for (let j = 0; j < this.field[0].length; j++) {
        if (this.field[i][j] === status) {
          return {i, j};
        }
      }
    }

    return {i: 0, j: 0};
  }

  private fillMatrixDistances(): void {
    this.matrixDistances[this.start.i][this.start.j] = 0;
    const queue: Array<CoordinatesModel> = [this.start];
    while (queue.length) {
      const curr = queue.shift() as CoordinatesModel;
      const left = this.getLeftCoordinate(curr);
      const top = this.getTopCoordinate(curr);
      const right = this.getRightCoordinate(curr);
      const bottom = this.getBottomCoordinate(curr);

      this.checkPoint(queue, left, curr);
      this.checkPoint(queue, top, curr);
      this.checkPoint(queue, right, curr);
      this.checkPoint(queue, bottom, curr);
    }
  }

  private getLeftCoordinate(point: CoordinatesModel): CoordinatesModel | null {
    return (point.j - 1 >= 0) ? {i: point.i, j: point.j - 1} : null;
  }

  private getTopCoordinate(point: CoordinatesModel): CoordinatesModel | null {
    return (point.i - 1 >= 0) ? {i: point.i - 1, j: point.j} : null;
  }

  private getRightCoordinate(point: CoordinatesModel): CoordinatesModel | null {
    return (point.j + 1 < this.matrixDistances[point.i].length) ? {i: point.i, j: point.j + 1} : null;
  }

  private getBottomCoordinate(point: CoordinatesModel): CoordinatesModel | null {
    return (point.i + 1 < this.matrixDistances.length) ? {i: point.i + 1, j: point.j} : null;
  }

  private checkPoint(queue: Array<CoordinatesModel>, point: CoordinatesModel | null, curr: CoordinatesModel): void {
    if (point && this.isValidPoint(point)) {
      this.matrixDistances[point.i][point.j] = this.matrixDistances[curr.i][curr.j] + 1;
      queue.push(point);
    }
  }

  private isValidPoint(point: CoordinatesModel): boolean {
    return (this.field[point.i][point.j] === FieldCellStatusEnum.WAY_CELL ||
       this.field[point.i][point.j] === FieldCellStatusEnum.FINISH_CELL) &&
      this.matrixDistances[point.i][point.j] === this.defaultMatrixValue;
  }

  private fillWayForEnemies(): void {
    let curr = this.finish;
    this.result.push(curr);
    while (!(curr.i === this.start.i && curr.j === this.start.j)) {
      const left = this.getLeftCoordinate(curr);
      const top = this.getTopCoordinate(curr);
      const right = this.getRightCoordinate(curr);
      const bottom = this.getBottomCoordinate(curr);

      if (left && this.isPointBackWay(left, curr)) {
        this.result.push(left);
        curr = left;
      } else if (top && this.isPointBackWay(top, curr)) {
        this.result.push(top);
        curr = top;
      } else if (right && this.isPointBackWay(right, curr)) {
        this.result.push(right);
        curr = right;
      } else if (bottom && this.isPointBackWay(bottom, curr)) {
        this.result.push(bottom);
        curr = bottom;
      }
    }
  }

  private isPointBackWay(point: CoordinatesModel, curr: CoordinatesModel): boolean {
    return this.matrixDistances[point.i][point.j] < this.matrixDistances[curr.i][curr.j] &&
      this.matrixDistances[point.i][point.j] !== this.defaultMatrixValue;
  }
}
