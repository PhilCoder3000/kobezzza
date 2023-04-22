export function* stateMachine(): Generator<number, void, number> {
  let state = 0;

  try {
    while (true) {
      state++;

      if (state > 5) {
        state = 0;
      }

      const res = yield state;

      if (res) {
        state = res;
      }
    }
  } catch (error) {
    if (error === 'error') {
      return;
    }
  }
}

const sm = stateMachine();

sm.next();
sm.next();
sm.next(2);
sm.next();
sm.next();

sm.throw('error');
