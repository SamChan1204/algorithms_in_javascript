/**
 * quick-find算法
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
  return id[p];
}

// 在两个触点之间添加一条连接
function union(p, q) {
  // 将p和q归并到相同的分量中
  const pid = find(p);
  const qid = find(q);

  if (pid === qid) return;

  // 将p所在分量的触点的分量标识符重置为q的分量标识符
  for (let i = 0; i < id.length; i++) {
    if (id[i] === pid) {
      id[i] = qid;
    }
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