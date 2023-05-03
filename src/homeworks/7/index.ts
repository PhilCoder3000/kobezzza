import { MapGraph, MapVertex } from 'utils/structures/graph/MapGraph';
import { SimpleGraph, SimpleVertex } from 'utils/structures/graph/SimpleGraph';

export function renderHM7() {
  const graph = new MapGraph();

  const A = new MapVertex('A');
  graph.addVertex(A);
  const B = new MapVertex('B');
  graph.addVertex(B);
  const C = new MapVertex('C');
  graph.addVertex(C);
  const D = new MapVertex('D');
  graph.addVertex(D);
  const E = new MapVertex('E');
  graph.addVertex(E);
  const F = new MapVertex('F');
  graph.addVertex(F);
  const G = new MapVertex('G');
  graph.addVertex(G);
  const H = new MapVertex('H');
  graph.addVertex(H);
  const K = new MapVertex('K');
  graph.addVertex(K);
  const L = new MapVertex('L');
  graph.addVertex(L);

  graph.addEdge(A, B, 1);
  graph.addEdge(A, C, 2);
  graph.addEdge(A, D, 3);

  graph.addEdge(B, L, 5);
  graph.addEdge(B, E, 7);

  graph.addEdge(E, G, 3);
  graph.addEdge(C, E, 4);
  graph.addEdge(D, F, 9);

  console.log('-----dfs recursive-----');
  graph.dfsRecursive(A)
  console.log('-----dfsGen-----');
  for (const el of graph.dfsGen(A)) {
    console.log(el);
  }
  console.log('-----dfsGen2-----');
  for (const el of graph.dfsGen2(A)) {
    console.log(el);
  }

  // console.log('-----bfs-----');
  
  // for (const el of graph.bfs(A)) {
  //   console.log(el);
  // }
  
  // console.log('-----topological sorting-----');

  // console.log(graph.topologicalSorting(A))
  
  // console.log('-----transitive closure-----');

  // console.log(graph.transitiveClosure())

  return document.createElement('div');
}

export function renderGraph() {
  const graph = new SimpleGraph(10);

  const A = new SimpleVertex('A');
  graph.addVertex(A);
  const B = new SimpleVertex('B');
  graph.addVertex(B);
  const C = new SimpleVertex('C');
  graph.addVertex(C);
  const D = new SimpleVertex('D');
  graph.addVertex(D);
  const E = new SimpleVertex('E');
  graph.addVertex(E);
  const F = new SimpleVertex('F');
  graph.addVertex(F);
  const G = new SimpleVertex('G');
  graph.addVertex(G);
  const H = new SimpleVertex('H');
  graph.addVertex(H);
  const K = new SimpleVertex('K');
  graph.addVertex(K);
  const L = new SimpleVertex('L');
  graph.addVertex(L);

  graph.addEdge(A, B);
  graph.addEdge(A, C);
  graph.addEdge(A, D);

  graph.addEdge(B, L);
  graph.addEdge(B, E);

  graph.addEdge(E, G);
  graph.addEdge(C, E);
  graph.addEdge(D, F);

  graph.displayEdge();

  const dfsIter = graph.dfs();

  for (const el of dfsIter) {
    console.log(el);
  }

  console.log('-----');

  const bfsIter = graph.bfs();

  for (const el of bfsIter) {
    console.log(el);
  }
}
