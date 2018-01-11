# NGLY1-exploration data

## Ngly1 node and edge data
*Created by [Nuria Queralt Rosinach](https://github.com/NuriaQueralt/ngly1)*
* nodes: https://raw.githubusercontent.com/NuriaQueralt/ngly1/master/neo4j-community-3.0.3/import/ngly1/ngly1_concepts.tsv
* edges: https://raw.githubusercontent.com/NuriaQueralt/ngly1/master/neo4j-community-3.0.3/import/ngly1/ngly1_statements.tsv

## NGLY1 human gene --> AQP1 human gene pathways
Calculated by neo4j
* **neo4j_ngly1-aqp1.csv**: All connections within 3 path lengths, unfiltered.  neo4j code: 
```
MATCH (source { qid: 'Q18042037', preflabel: 'NGLY1'}), (target { qid: 'Q14905238', preflabel: 'AQP1'}), path=(source)-[*..3]-(target)
WITH source, target, path,
     [r IN relationships(path) | type(r)] AS types
RETURN source.preflabel AS Source, target.preflabel AS Target, LENGTH(path) AS pathLength, extract(n IN nodes(path)| n.preflabel) AS nodesInPath, types AS edgesInPath, path AS Path
```

* **neo4j_ngly1-aqp1_filtered.csv**: All connections within 3 path lengths, filtered to remove promiscuous pathways.  neo4j code: 
```
MATCH (source { qid: 'Q18042037', preflabel: 'NGLY1'}), (target { qid: 'Q14905238', preflabel: 'AQP1'}), path=(source)-[*..3]-(target)
WITH source, target, path,
     // mark promiscuous nodes to filter path that contain them out
     [n IN nodes(path) WHERE n.preflabel IN ['cytoplasm','cytosol','protein coding gene']] AS nodes_marked,
     // one can use another unique attribute to mark nodes
     //[n IN nodes(path) WHERE n.qid IN ['Q79899','Q220599','Q30015942']] AS nodes_marked,
     [r IN relationships(path) | type(r)] AS types,
     // mark promiscuous edges to filter path that contain them out
     [r IN relationships(path) WHERE type(r) = 'physically_interacts_with'] AS edges_marked
// condition to filter paths that do contain marked nodes and edges out
WHERE size(nodes_marked) = 0 AND size(edges_marked) = 0
RETURN source.preflabel AS Source, target.preflabel AS Target, LENGTH(path) AS pathLength, extract(n IN nodes(path)| n.preflabel) AS nodesInPath, types AS edgesInPath, path AS Path
```
