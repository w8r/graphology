/**
 * Graphology Indexes Functions
 * =============================
 *
 * Bunch of functions used to compute or clear indexes.
 */
export const INDICES = new Set(['structure']);

/**
 * Structure.
 */

/**
 * Function updating the 'structure' index with the given edge's data.
 *
 * @param {Graph}  graph - Target Graph instance.
 * @param {any}    edge  - Added edge.
 * @param {object} data  - Attached data.
 */
export function updateStructureIndex(graph, edge, data) {

  // Retrieving edge information
  const {
    undirected,
    source,
    target
  } = data;

  // Retrieving source & target data
  const sourceData = graph._nodes.get(source),
        targetData = graph._nodes.get(target);

  const outKey = undirected ? 'undirectedOut' : 'out',
        inKey = undirected ? 'undirectedIn' : 'in';

  // NOTE: The set of edges is the same for source & target
  const commonSet = new Set();

  // Handling source
  sourceData[outKey] = sourceData[outKey] || Object.create(null);

  if (!(target in sourceData[outKey]))
    sourceData[outKey][target] = commonSet;
  sourceData[outKey][target].add(edge);

  // If selfLoop, we break here
  if (source === target)
    return;

  // Handling target (we won't add the edge because it was already taken
  // care of with source above)
  targetData[inKey] = targetData[inKey] || Object.create(null);

  if (!(source in targetData[inKey]))
    targetData[inKey][source] = commonSet;
}

/**
 * Function clearing the 'structure' index data related to the given edge.
 *
 * @param {Graph}  graph - Target Graph instance.
 * @param {any}    edge  - Dropped edge.
 * @param {object} data  - Attached data.
 */
export function clearEdgeFromStructureIndex(graph, edge, data) {
  const {source, target, undirected} = data;

  // NOTE: since the edge set is the same for source & target, we can only
  // affect source
  const sourceData = graph._nodes.get(source);

  const outKey = undirected ? 'undirectedOut' : 'out';

  const sourceIndex = sourceData[outKey];

  // NOTE: possible to clear empty sets from memory altogether
  if (target in sourceIndex)
    sourceIndex[target].delete(edge);
}

/**
 * Function clearing the whole 'structure' index.
 *
 * @param {Graph} graph - Target Graph instance.
 */
export function clearStructureIndex(graph) {
  graph._nodes.forEach(data => {

    // Clearing properties
    delete data.in;
    delete data.out;
    delete data.undirectedIn;
    delete data.undirectedOut;
  });
}
