/**
 * 无向图
 */

class UndirectedGraph {

  constructor(v) {
    this.V = v;
    this.E = 0;
    this.adj = new Array(v);
    for (let i = 0; i < v; i++) {
      this.adj[i] = [];
    }
  }

  /**
   * 获取顶点数
   */
  getV() {}

  /**
   * 获取边数
   */
  getE() {}

  /**
   * 添加一条边
   * @param {*} v 顶点
   * @param {*} w 顶点
   */
  addEdge(v, w) {
    this.adj[v].push(w);
    this.adj[w].push(v);
    this.E++;
  }

  /**
   * 指定顶点相邻的所有顶点
   * @param {*} v 指定顶点
   */
  adj(v) {
    return this.adj[v];
  }


  /**
   * 计算v的度数
   * @param {*} G 图
   * @param {*} v 顶点
   */
  static degree(G, v) {
    return G.adj(v).length;
  }

  /**
   * 计算所有顶点的最大度数
   * @param {*} G 图
   */
  static maxDegree(G) {
    let max = 0;
    G.getV().forEach(v => {
      if (UndirectedGraph.degree(G, v) > max) {
        max = UndirectedGraph.degree(G, v);
      }
    });
    return max;
  }

  /**
   * 计算所有顶点的平均度数
   * @param {*} G 图
   */
  static avgDegree(G) {
    return 2 * G.getE() / G.getV();
  }

  /**
   * 计算自环的个数
   * @param {*} G 图
   */
  static numberOgSelfLoops(G) {
    let count = 0;
    G.getV().forEach(v => {
      G.adj(v).forEach(w => {
        if (v === w) count++;
      })
    });
    return count / 2;
  }
}