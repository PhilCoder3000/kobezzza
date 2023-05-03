export class MapVertex {
  #id: string;
  constructor(public label: string) {
    this.#id = `${Math.round(Math.random() * 1000).toString(16)}`;
  }

  get id() {
    return this.#id;
  }
}

export class MapGraph {
  #adjacency: Map<MapVertex, [MapVertex, number][]> = new Map();

  constructor() {}

  addVertex(v: MapVertex) {
    if (!this.#adjacency.has(v)) {
      this.#adjacency.set(v, []);
    }
  }

  addEdge(from: MapVertex, to: MapVertex, weight: number) {
    if (this.#adjacency.has(from)) {
      this.#adjacency.get(from)?.push([to, weight]);
    }
  }


  *bfs(start: MapVertex) {
    const visited = new Map();
    const queue = [start];
    visited.set(start, true);

    while (queue.length) {
      const current = queue.shift();
      yield current;

      this.#adjacency.get(current!)?.forEach(([vertex]) => {
        if (!visited.has(vertex)) {
          visited.set(vertex, true);
          queue.push(vertex);
        }
      });
    }
  }

  dfsRecursive(start: MapVertex) {
    const visitedIds: string[] = [];

    const dfsHelper = (vertex: MapVertex) => {
      visitedIds.push(vertex.id);
      console.log(vertex);
      this.#adjacency.get(vertex)?.forEach(([v]) => {
        if (!visitedIds.includes(v.id)) {
          dfsHelper(v);
        }
      });
    };

    dfsHelper(start);
  }

  *dfsGen(start: MapVertex) {
    const visited: string[] = [];
    const stack: MapVertex[] = [start];

    while (stack.length) {
      const current = stack[stack.length - 1];
      visited.push(current.id);
      yield stack.pop();

      this.#adjacency.get(current)?.forEach(([v]) => {
        if (!visited.includes(v.id)) {
          stack.push(v);
        }
      });
    }
  }

  *dfsGen2(start: MapVertex) {
    const visited = new Map();
    const graph = this;

    function* dfsHelper(vertex: MapVertex): Generator {
      visited.set(vertex, true);
      const current = graph.#adjacency.get(vertex);
      yield vertex;

      if (current) {
        for (const [el] of current) {
          if (!visited.has(el)) {
            yield* dfsHelper(el);
          }
        }
      }
    }

    yield* dfsHelper(start);
  }

  topologicalSorting(start: MapVertex) {
    const stack = new Array();

    for (const el of this.dfsGen2(start)) {
      stack.push(el);
    }
  }

  transitiveClosure() {
    const vertices = Object.keys(this.#adjacency);
    const tc = new Map();

    vertices.forEach((ver) => {
      tc.set(ver, new Set([ver]));
      const visited = new Map();

      const dfsHelper = (v: MapVertex) => {
        visited.set(v, true);
        this.#adjacency.get(v)?.forEach(([neighbor]) => {
          if (!visited.has(neighbor)) {
            tc.set(ver, neighbor);
            dfsHelper(neighbor);
          }
        });
      };

      dfsHelper(ver as unknown as MapVertex);
    });

    return tc;
  }
}
