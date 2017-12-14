import { ROWS, COLS } from './config';

function SnakeGameLogic() {
  // 각 마디의 좌표를 저장하는 배열
  this.joints = [{ x: 1, y: 0 }, { x: 0, y: 0 }];

  // 먹이의 좌표
  this.fruit = { x: 5, y: 10 };

  // 뱀의 방향
  this.direction = 'right';
}

SnakeGameLogic.prototype.up = function() {
  // 위쪽 화살표 키를 누르면 실행되는 함수
  console.log('up');
  this.direction = 'up';
}
SnakeGameLogic.prototype.down = function() {
  // 아래쪽 화살표 키를 누르면 실행되는 함수
  console.log('down');
  this.direction = 'down';
}
SnakeGameLogic.prototype.left = function() {
  // 왼쪽 화살표 키를 누르면 실행되는 함수
  console.log('left');
  this.direction = 'left';
}
SnakeGameLogic.prototype.right = function() {
  // 오른쪽 화살표 키를 누르면 실행되는 함수
  console.log('right');
  this.direction = 'right';
}
SnakeGameLogic.prototype.common = function(tmp) {
  if (this.joints.some(x => x.x === tmp.x && x.y === tmp.y))
    return false;
  if (tmp.y >= 0 && tmp.y < ROWS && tmp.x < COLS && tmp.x >= 0) {
    this.joints.unshift(tmp);
    if (tmp.x !== this.fruit.x || tmp.y !== this.fruit.y)
      this.joints.pop();
  } else {
    return false;
  }
  return true;
}
SnakeGameLogic.prototype.nextState = function() {
  // 한 번 움직여야 할 타이밍마다 실행되는 함수
  // 게임이 아직 끝나지 않았으면 `true`를 반환
  // 게임이 끝났으면 `false`를 반환
  console.log(`nextState`);
  let tmp = { x: 0, y: 0 };
  tmp.x = this.joints[0].x;
  tmp.y = this.joints[0].y;
  let result = true;
  switch (this.direction) {
    case 'up':
      tmp.y--;
      result = this.common(tmp);
      break;
    case 'down':
      tmp.y++;
      result = this.common(tmp);
      break;
    case 'right':
      tmp.x++;
      result = this.common(tmp);
      break;
    case 'left':
      tmp.x--;
      result = this.common(tmp);
      break;
  }
  if (tmp.x === this.fruit.x && tmp.y === this.fruit.y) {
    do {
      this.fruit.x = Math.floor(Math.random() * COLS);
      this.fruit.y = Math.floor(Math.random() * ROWS);
    } while (this.joints.some(x => x.x === this.fruit.x || x.y === this.fruit.y));
  }
  return result;
}

export default SnakeGameLogic;