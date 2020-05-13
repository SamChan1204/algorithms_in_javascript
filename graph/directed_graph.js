/**
 * 有向图
 */

class DirectedGraph {
  constructor(V) {
    this.V = V;
    this.E = 0;

    this.adj = [];
    for(let i = 0; i < V; i++) {
      this.adj.push([]);
    }
    
  }

  getV() {
    return this.V;
  }

  getE() {
    return this.E;
  }

  addEdge(v, w) {
    adj[v].push(w);
    this.E++;
  }

  adj(v) {
    return adj[v];
  }

  reverse() {
    const g = new DirectedGraph(this.V);
    for (let v = 0; v < this.V; v++) {
      this.adj(v).forEach(w => g.addEdge(w, v));
    }
    return g;
  }

}