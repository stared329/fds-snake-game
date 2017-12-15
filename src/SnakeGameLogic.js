import { ROWS, COLS } from './config';

function SnakeGameLogic() {
  // 각 마디의 좌표를 저장하는 배열
  this.joints = [{ x: 2, y: 0 }, { x: 1, y: 0 }, { x: 0, y: 0 }];

  // 먹이의 좌표
  this.fruit = { x: 5, y: 10 };
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
SnakeGameLogic.prototype.nextState = function() {
  // 한 번 움직여야 할 타이밍마다 실행되는 함수
  // 게임이 아직 끝나지 않았으면 `true`를 반환
  // 게임이 끝났으면 `false`를 반환
  console.log(`nextState`);
  let newHead;
  switch (this.direction) {
    case 'up':
      newHead = {
        x: this.joints[0].x,
        y: this.joints[0].y - 1
      }
      break;
    case 'down':
      newHead = {
        x: this.joints[0].x,
        y: this.joints[0].y + 1
      }
      break;
    case 'left':
      newHead = {
        x: this.joints[0].x - 1,
        y: this.joints[0].y
      }
      break;
    case 'right':
      newHead = {
        x: this.joints[0].x + 1,
        y: this.joints[0].y
      }
      break;
  }

  if (newHead.x < 0 || newHead.x >= COLS || newHead.y < 0 || newHead.y >= ROWS || this.joints.some(x => x.x === newHead.x && x.y === newHead.y)) {
    return false;
  } else {
    if (newHead.x === this.fruit.x && newHead.y === this.fruit.y) {
      do {
        this.fruit.x = Math.floor(Math.random() * COLS);
        this.fruit.y = Math.floor(Math.random() * ROWS);
      } while (this.joints.some(x => x.x === this.fruit.x && x.y === this.fruit.y) || (newHead.x === this.fruit.x && newHead.y === this.fruit.y));
    } else {
      this.joints.pop();
    }
    this.joints.unshift(newHead);
  }

  return true;
}

export default SnakeGameLogic;