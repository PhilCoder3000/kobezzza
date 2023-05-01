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
  #adjacency: Map<MapVertex, MapVertex[]> = new Map();

  constructor() {}

  addVertex(from: MapVertex, to?: MapVertex) {
    if (this.#adjacency.has(from)) {
      if (to) {
        this.#adjacency.get(from)?.push(to);
      }
    } else {
      if (to) {
        this.#adjacency.set(from, [to]);
      } else {
        this.#adjacency.set(from, []);
      }
    }
    if (to && !this.#adjacency.has(to)) {
      this.#adjacency.set(to, []);
    }
  }

  addEdge(from: MapVertex, to: MapVertex) {
    this.#adjacency.get(from)?.push(to);
  }

  isParent(v1: MapVertex, v2: MapVertex) {
    if (this.#adjacency.has(v1)) {
      return this.#adjacency.get(v1)?.includes(v2);
    }
    return false;
  }

  isChild(v1: MapVertex, v2: MapVertex) {
    return this.isParent(v2, v1);
  }

  *dfs(start: MapVertex) {
    const visitedIds: string[] = [];
    const stack: MapVertex[] = [];
    stack.push(start);

    while (stack.length > 0) {
      const current = stack[stack.length - 1]!;
      console.log('🚀*dfs ~ current:', current);
      if (visitedIds.includes(current.id)) {
        stack.pop();
      } else {
        visitedIds.push(current.id);
        this.#adjacency.get(current)?.forEach((v) => stack.push(v));
        yield current;
      }
    }
  }

  getNeighbors(vertex: MapVertex) {
    return this.#adjacency.get(vertex);
  }

  *dfs2(start: MapVertex) {
    const visited = new Set();
    const graph = this;

    function* traverse(ver: MapVertex): Generator {
      visited.add(ver.id);
      yield ver;

      const current = graph.#adjacency.get(ver);
      if (current) {
        for (const el of current) {
          console.log('🚀 *traverse ~ el:', el);
          if (!visited.has(el.id)) {
            yield* traverse(el);
          }
        }
      }
    }
    yield* traverse(start);
  }
}
