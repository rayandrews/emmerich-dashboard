type FlatArrayTree<T> = T & {
  id: string | number;
  parent: FlatArrayTree<T> | null;
};

type ITree<T> = FlatArrayTree<T> & {
  children: ITree<T>[];
};

export function constructTreeFromFlatArray<T>(
  array: FlatArrayTree<T>[] = [],
): ITree<T>[] {
  const map = {};
  const roots: ITree<T>[] = [];
  const tempList: ITree<T>[] = [];

  for (let i = 0; i < array.length; i += 1) {
    map[array[i].id] = i;
    tempList.push({
      ...array[i],
      children: [],
    });
  }

  for (let i = 0; i < tempList.length; i += 1) {
    let node = tempList[i];
    if (node.parent) {
      tempList[map[node.parent.id]].children.push(node);
    } else {
      roots.push(node);
    }
  }

  return roots;
}
