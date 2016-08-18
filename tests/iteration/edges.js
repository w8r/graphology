/**
 * Graphology Edges Iteration Specs
 * ================================
 *
 * Testing the edges iteration-related methods of the graph.
 */
import assert from 'assert';
import {deepMerge, sameMembers, testBunches} from '../helpers';

const METHODS = [
  'edges',
  'inEdges',
  'outEdges',
  'inboundEdges',
  'outboundEdges',
  'directedEdges',
  'undirectedEdges'
];

export default function edgesIteration(Graph) {
  const graph = new Graph(null, {multi: true});
  graph.addNodesFrom([
    'John',
    'Thomas',
    'Martha',
    'Roger',
    'Catherine',
    'Alone',
    'Forever'
  ]);

  graph.addDirectedEdgeWithKey('J->T', 'John', 'Thomas');
  graph.addDirectedEdgeWithKey('J->M', 'John', 'Martha');
  graph.addDirectedEdgeWithKey('C->J', 'Catherine', 'John');

  graph.addUndirectedEdgeWithKey('M<->R', 'Martha', 'Roger');
  graph.addUndirectedEdgeWithKey('M<->J', 'Martha', 'John');
  graph.addUndirectedEdgeWithKey('J<->R', 'John', 'Roger');
  graph.addUndirectedEdgeWithKey('T<->M', 'Thomas', 'Martha');

  const ALL_EDGES = [
    'J->T',
    'J->M',
    'C->J',
    'M<->R',
    'M<->J',
    'J<->R',
    'T<->M'
  ];

  const ALL_DIRECTED_EDGES = [
    'J->T',
    'J->M',
    'C->J'
  ];

  const ALL_UNDIRECTED_EDGES = [
    'M<->R',
    'M<->J',
    'J<->R',
    'T<->M'
  ];

  const TEST_DATA = {
    edges: {
      all: ALL_EDGES,
      node: {
        key: 'John',
        edges: [
          'C->J',
          'J->T',
          'J->M',
          'M<->J',
          'J<->R'
        ]
      },
      bunch: {
        keys: ['Martha', 'Roger'],
        edges: [
          'J->M',
          'M<->R',
          'M<->J',
          'T<->M',
          'J<->R'
        ]
      }
    },
    inEdges: {
      all: ALL_DIRECTED_EDGES,
      node: {
        key: 'John',
        edges: [
          'C->J'
        ]
      },
      bunch: {
        keys: ['Thomas', 'John'],
        edges: [
          'J->T',
          'C->J'
        ]
      }
    },
    outEdges: {
      all: ALL_DIRECTED_EDGES,
      node: {
        key: 'John',
        edges: [
          'J->T',
          'J->M'
        ]
      },
      bunch: {
        keys: ['John', 'Catherine'],
        edges: [
          'J->T',
          'J->M',
          'C->J'
        ]
      }
    },
    inboundEdges: {
      all: ALL_EDGES,
      node: {
        key: 'John',
        edges: [
          'C->J',
          'M<->J'
        ]
      },
      bunch: {
        keys: ['Thomas', 'John'],
        edges: [
          'J->T',
          'C->J',
          'M<->J'
        ]
      }
    },
    outboundEdges: {
      all: ALL_EDGES,
      node: {
        key: 'John',
        edges: [
          'J->T',
          'J->M',
          'J<->R'
        ]
      },
      bunch: {
        keys: ['John', 'Martha'],
        edges: [
          'J->T',
          'J->M',
          'J<->R',
          'M<->R',
          'M<->J'
        ]
      }
    },
    directedEdges: {
      all: ALL_DIRECTED_EDGES,
      node: {
        key: 'John',
        edges: [
          'C->J',
          'J->T',
          'J->M'
        ]
      },
      bunch: {
        keys: ['John', 'Catherine'],
        edges: [
          'C->J',
          'J->T',
          'J->M'
        ]
      }
    },
    undirectedEdges: {
      all: ALL_UNDIRECTED_EDGES,
      node: {
        key: 'John',
        edges: [
          'M<->J',
          'J<->R'
        ]
      },
      bunch: {
        keys: ['John', 'Martha'],
        edges: [
          'M<->R',
          'M<->J',
          'J<->R',
          'T<->M',
        ]
      }
    }
  };

  function commonTests(name) {
    return {
      ['#.' + name]: {
        'it should throw if too many arguments are provided.': function() {
          assert.throws(function() {
            graph[name](1, 2, 3);
          }, /many/);
        },

        'it should throw when the node is not found.': function() {
          assert.throws(function() {
            graph[name]('Test');
          }, /node/);
        },

        'it should throw if any of the provided bunch node is not found.': function() {
          assert.throws(function() {
            graph[name](['Test']);
          }, /bunch/);
        }
      }
    };
  }

  function specificTests(name, data) {
    return {
      ['#.' + name]: {
        'it should return all the relevant edges.': function() {
          const edges = graph[name]();

          assert.deepEqual(edges, data.all);
        },

        'it should return a node\'s relevant edges.': function() {
          const edges = graph[name](data.node.key);

          assert.deepEqual(edges, data.node.edges);
          assert.deepEqual(graph[name]('Alone'), []);
        },

        'it should return a bunch of nodes\' relevant edges.': function() {
          testBunches(data.bunch.keys, bunch => {
            const edges = graph[name](bunch);

            assert(sameMembers(edges, data.bunch.edges));
            assert.deepEqual(graph[name](['Forever', 'Alone']), []);
          });
        }
      }
    };
  }

  const tests = {};

  // Common tests
  METHODS.forEach(name => deepMerge(tests, commonTests(name)));

  // Specific tests
  for (const name in TEST_DATA)
    deepMerge(tests, specificTests(name, TEST_DATA[name]));

  return tests;
}