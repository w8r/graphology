/**
 * Graphology Reference Implementation Endoint
 * ============================================
 *
 * Importing the Graph object & deriving alternative constructors.
 */
import {assign} from './utils';
import Graph from './graph';

import {
  InvalidArgumentsGraphError,
  NotFoundGraphError,
  UsageGraphError
} from './errors';

/**
 * Alternative constructors.
 */
class DirectedGraph extends Graph {
  constructor(data, options) {
    super(
      data,
      assign({type: 'directed'}, options)
    );
  }
}
class UndirectedGraph extends Graph {
  constructor(data, options) {
    super(
      data,
      assign({type: 'undirected'}, options)
    );
  }
}
class MultiDirectedGraph extends Graph {
  constructor(data, options) {
    super(
      data,
      assign({multi: true, type: 'directed'}, options)
    );
  }
}
class MultiUndirectedGraph extends Graph {
  constructor(data, options) {
    super(
      data,
      assign({multi: true, type: 'undirected'}, options)
    );
  }
}

/**
 * Exporting as CommonJS for convenience.
 */
Graph.Graph = Graph;
Graph.DirectedGraph = DirectedGraph;
Graph.UndirectedGraph = UndirectedGraph;
Graph.MultiDirectedGraph = MultiDirectedGraph;
Graph.MultiUndirectedGraph = MultiUndirectedGraph;

Graph.InvalidArgumentsGraphError = InvalidArgumentsGraphError;
Graph.NotFoundGraphError = NotFoundGraphError;
Graph.UsageGraphError = UsageGraphError;

module.exports = Graph;
