/**
 * 加权quick-union算法
 * 主要优化点：总是将小树归并到大树，控制树高度
 */

const id = []; // 父链接数组（以触点为索引）
const sz = []; // 各个根节点对应的分量大小（以触点为索引）
let count = 0; // 分量数量

function UF(N) {
  // 初始化分量数组，假设所以触点自己为一个分量
  count = N;
  for (let i = 0; i < N; i++) {
    id[i] = i;
    sz[i] = 1;
  }
}

// 获取分量数量
function getCount() {
  return count;
}

// 判断两个触点是否处于同一个分量中
function connected(p, q) {
  return find(p) === find(q);
}

// 获取触点所在的分量id
function find(p) {
  while(p !== id[p]) p = id[p];
  return p;
}

// 在两个触点之间添加一条连接
function union(p, q) {
  const proot = find(p);
  const qroot = find(q);

  if (proot === qroot) return;

  // 将小树的根节点连到大树根节点
  if (sz[proot] < sz[qroot]) {
    id[proot] = qroot;
    sz[qroot] += sz[proot];
  } else {
    id[qroot] = proot;
    sz[proot] += sz[qroot];
  }

  count--;
}

/**
 * 程序流程
 */

const inputs = [];

function main() {
  while(inputs.length > 0) {
    const pair = inputs.shift();
    const [p, q] = pair;

    // 如果已经连通，则跳过
    if (connected(p, q)) continue;

    // 归并分量
    union(p, q);

    console.log(`${p} ${q}`);
  }

  console.log(`${getCount()} components`);
}