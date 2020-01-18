/**
 * quick-union算法
 */

const id = []; // 分量id（以触点为索引）
let count = 0; // 分量数量

function UF(N) {
  // 初始化分量数组，假设所以触点自己为一个分量
  count = N;
  for (let i = 0; i < N; i++) {
    id[i] = i;
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
  // id数组每个元素的值是索引的父节点
  while(p !== id[p]) p = id[p];
  return p;
}

// 在两个触点之间添加一条连接
function union(p, q) {
  // 将p和q的根节点统一
  const proot = find(p);
  const qroot = find(q);

  if (proot === qroot) return;

  id[proot] = qroot;

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