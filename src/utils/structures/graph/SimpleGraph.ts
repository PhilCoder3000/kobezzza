export class SimpleVertex {
  wasVisited: boolean = false;

  constructor(public label: string) {}

  toString() {
    return 'label: ' + this.label + ', visited: ' + this.wasVisited;
  }
}

export class SimpleGraph {
  #vertexList: SimpleVertex[] = [];
  #adjMatrix: number[][] = [];
  #vertexCount: number = 0;

  constructor(maxVertex: number) {
    this.#adjMatrix = Array.from({ length: maxVertex }, () =>
      new Array(maxVertex).fill(0),
    );
  }

  addVertex(vertex: SimpleVertex) {
    this.#vertexList[this.#vertexCount++] = vertex;
  }

  addEdge(from: SimpleVertex, to: SimpleVertex) {
    const fromIndex = this.#vertexList.indexOf(from);
    const toIndex = this.#vertexList.indexOf(to);

    if (fromIndex < 0) {
      throw new Error();
    }
    if (toIndex < 0) {
      throw new Error();
    }

    this.#adjMatrix[fromIndex][toIndex] = 1;
    this.#adjMatrix[toIndex][fromIndex] = 1;
  }

  #getAdjUnvisitedVertex(vertex: number) {
    for (let i = 0; i < this.#vertexCount; i++) {
      if (
        this.#adjMatrix[vertex][i] == 1 &&
        this.#vertexList[i].wasVisited === false
      ) {
        return i;
      }
    }
    return -1;
  }

  *dfs() {
    this.#vertexList[0].wasVisited = true;
    const stack: number[] = new Array();
    stack.push(0);

    yield this.#vertexList[0]

    while (stack.length !== 0) {
      const v = this.#getAdjUnvisitedVertex(stack[stack.length - 1]);
      if (v === -1) {
        stack.pop();
      } else {
        this.#vertexList[v].wasVisited = true;
        stack.push(v);
        
        yield this.#vertexList[v];
      }
    }
    this.#clearVisits()
  }

  *bfs() {
    this.#vertexList[0].wasVisited = true;
    const queue: number[] = new Array()
    queue.push(0)

    yield this.#vertexList[0]

    while (queue.length > 0) {
      const v1 = queue.shift();

      let v2 = this.#getAdjUnvisitedVertex(v1!);
      while (v2 !== -1) {
        this.#vertexList[v2].wasVisited = true;
        queue.push(v2)

        yield this.#vertexList[v2];
        v2 = this.#getAdjUnvisitedVertex(v1!);
      }
    }
    this.#clearVisits()
  }

  #clearVisits() {
    for (let i = 0; i < this.#vertexCount; i++) {
      this.#vertexList[i].wasVisited = false;
    }
  }

  displayVertex() {
    for (const el of this.#vertexList) {
      console.log(el.label, '\n');
    }
  }

  displayEdge() {
    let i = 0;
    let result = '  ' + this.#vertexList.map((v) => v.label).join(' ') + '\n';
    for (const arr of this.#adjMatrix) {
      let str = (this.#vertexList[i++] || '0').label;
      for (const el of arr) {
        str += ' ' + el;
      }
      result += str + '\n';
    }

    console.log(result);
  }
}
