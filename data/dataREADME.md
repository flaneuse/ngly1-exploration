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

## Second generation queries
Focusing on more specific relationship of: source --> source orthologue --> disorder --> target orthologue --> target. For testing purposes, pulling out the queries with larger # hits.
* **2018-01-15_ngly1-aqp1.csv** (1052) ```
MATCH path=(source:GENE)-[:`RO:HOM0000020`]-(:GENE)--(ds:DISO)--(:GENE)-[:`RO:HOM0000020`]-(g1:GENE)--(pw:PHYS)--(target:GENE) WHERE source.id = 'NCBIGene:55768' AND target.id = 'NCBIGene:358' AND ALL(x IN nodes(path) WHERE single(y IN nodes(path) WHERE y = x)) WITH g1, ds, pw, path, size( (source)-[:`RO:HOM0000020`]-() ) AS source_ortho, size( (g1)-[:`RO:HOM0000020`]-() ) AS other_ortho, max(size( (pw)-[]-() )) AS pwDegree, max(size( (ds)-[]-() )) AS dsDegree, [n IN nodes(path) WHERE n.preflabel IN ['cytoplasm','cytosol','nucleus','metabolism','membrane','protein binding','visible','viable','phenotype']] AS nodes_marked, [r IN relationships(path) WHERE r.property_label IN ['interacts with','in paralogy relationship with','in orthology relationship with','colocalizes with']] AS edges_marked WHERE size(nodes_marked) = 0 AND size(edges_marked) = 0 AND pwDegree < 51 AND dsDegree < 21 RETURN path
```

* **2018-01-15_aqp1-aqp3.csv** (1548) ```
MATCH path=(source:GENE)-[:`RO:HOM0000020`]-(:GENE)--(ds:DISO)--(:GENE)-[:`RO:HOM0000020`]-(g1:GENE)--(pw:PHYS)--(target:GENE) WHERE source.id = 'NCBIGene:358' AND target.id = 'NCBIGene:360' AND ALL(x IN nodes(path) WHERE single(y IN nodes(path) WHERE y = x)) WITH g1, ds, pw, path, size( (source)-[:`RO:HOM0000020`]-() ) AS source_ortho, size( (g1)-[:`RO:HOM0000020`]-() ) AS other_ortho, max(size( (pw)-[]-() )) AS pwDegree, max(size( (ds)-[]-() )) AS dsDegree, [n IN nodes(path) WHERE n.preflabel IN ['cytoplasm','cytosol','nucleus','metabolism','membrane','protein binding','visible','viable','phenotype']] AS nodes_marked, [r IN relationships(path) WHERE r.property_label IN ['interacts with','in paralogy relationship with','in orthology relationship with','colocalizes with']] AS edges_marked WHERE size(nodes_marked) = 0 AND size(edges_marked) = 0 AND pwDegree < 51 AND dsDegree < 21 RETURN path

```


* **2018-01-15_NFE2L1-apq1.csv** (1464) ```

MATCH path=(source:GENE)-[:`RO:HOM0000020`]-(:GENE)--(ds:DISO)--(:GENE)-[:`RO:HOM0000020`]-(g1:GENE)--(pw:PHYS)--(target:GENE) WHERE source.id = 'NCBIGene:4779' AND target.id = 'NCBIGene:358' AND ALL(x IN nodes(path) WHERE single(y IN nodes(path) WHERE y = x)) WITH g1, ds, pw, path, size( (source)-[:`RO:HOM0000020`]-() ) AS source_ortho, size( (g1)-[:`RO:HOM0000020`]-() ) AS other_ortho, max(size( (pw)-[]-() )) AS pwDegree, max(size( (ds)-[]-() )) AS dsDegree, [n IN nodes(path) WHERE n.preflabel IN ['cytoplasm','cytosol','nucleus','metabolism','membrane','protein binding','visible','viable','phenotype']] AS nodes_marked, [r IN relationships(path) WHERE r.property_label IN ['interacts with','in paralogy relationship with','in orthology relationship with','colocalizes with']] AS edges_marked WHERE size(nodes_marked) = 0 AND size(edges_marked) = 0 AND pwDegree < 51 AND dsDegree < 21 RETURN path
```


* **2015-01-15_aqp3-aqp1.csv** (3952) ```
MATCH path=(source:GENE)-[:`RO:HOM0000020`]-(:GENE)--(ds:DISO)--(:GENE)-[:`RO:HOM0000020`]-(g1:GENE)--(pw:PHYS)--(target:GENE) WHERE source.id = 'NCBIGene:360' AND target.id = 'NCBIGene:358' AND ALL(x IN nodes(path) WHERE single(y IN nodes(path) WHERE y = x)) WITH g1, ds, pw, path, size( (source)-[:`RO:HOM0000020`]-() ) AS source_ortho, size( (g1)-[:`RO:HOM0000020`]-() ) AS other_ortho, max(size( (pw)-[]-() )) AS pwDegree, max(size( (ds)-[]-() )) AS dsDegree, [n IN nodes(path) WHERE n.preflabel IN ['cytoplasm','cytosol','nucleus','metabolism','membrane','protein binding','visible','viable','phenotype']] AS nodes_marked, [r IN relationships(path) WHERE r.property_label IN ['interacts with','in paralogy relationship with','in orthology relationship with','colocalizes with']] AS edges_marked WHERE size(nodes_marked) = 0 AND size(edges_marked) = 0 AND pwDegree < 51 AND dsDegree < 21 RETURN path
```


* **2015-01-15_aqp11-aqp1.csv** (1868) ```

MATCH path=(source:GENE)-[:`RO:HOM0000020`]-(:GENE)--(ds:DISO)--(:GENE)-[:`RO:HOM0000020`]-(g1:GENE)--(pw:PHYS)--(target:GENE) WHERE source.id = 'NCBIGene:282679' AND target.id = 'NCBIGene:358' AND ALL(x IN nodes(path) WHERE single(y IN nodes(path) WHERE y = x)) WITH g1, ds, pw, path, size( (source)-[:`RO:HOM0000020`]-() ) AS source_ortho, size( (g1)-[:`RO:HOM0000020`]-() ) AS other_ortho, max(size( (pw)-[]-() )) AS pwDegree, max(size( (ds)-[]-() )) AS dsDegree, [n IN nodes(path) WHERE n.preflabel IN ['cytoplasm','cytosol','nucleus','metabolism','membrane','protein binding','visible','viable','phenotype']] AS nodes_marked, [r IN relationships(path) WHERE r.property_label IN ['interacts with','in paralogy relationship with','in orthology relationship with','colocalizes with']] AS edges_marked WHERE size(nodes_marked) = 0 AND size(edges_marked) = 0 AND pwDegree < 51 AND dsDegree < 21 RETURN path
```

* **2015-01-15_aqp11-apq3.csv** (904) ```
MATCH path=(source:GENE)-[:`RO:HOM0000020`]-(:GENE)--(ds:DISO)--(:GENE)-[:`RO:HOM0000020`]-(g1:GENE)--(pw:PHYS)--(target:GENE) WHERE source.id = 'NCBIGene:282679' AND target.id = 'NCBIGene:360' AND ALL(x IN nodes(path) WHERE single(y IN nodes(path) WHERE y = x)) WITH g1, ds, pw, path, size( (source)-[:`RO:HOM0000020`]-() ) AS source_ortho, size( (g1)-[:`RO:HOM0000020`]-() ) AS other_ortho, max(size( (pw)-[]-() )) AS pwDegree, max(size( (ds)-[]-() )) AS dsDegree, [n IN nodes(path) WHERE n.preflabel IN ['cytoplasm','cytosol','nucleus','metabolism','membrane','protein binding','visible','viable','phenotype']] AS nodes_marked, [r IN relationships(path) WHERE r.property_label IN ['interacts with','in paralogy relationship with','in orthology relationship with','colocalizes with']] AS edges_marked WHERE size(nodes_marked) = 0 AND size(edges_marked) = 0 AND pwDegree < 51 AND dsDegree < 21 RETURN path
```


* **2015-01-15_ngly1-engase.csv** (72) ```
MATCH path=(source:GENE)-[:`RO:HOM0000020`]-(:GENE)--(ds:DISO)--(:GENE)-[:`RO:HOM0000020`]-(g1:GENE)--(pw:PHYS)--(target:GENE) WHERE source.id = 'NCBIGene:55768' AND target.id = 'NCBIGene:64772' AND ALL(x IN nodes(path) WHERE single(y IN nodes(path) WHERE y = x)) WITH g1, ds, pw, path, size( (source)-[:`RO:HOM0000020`]-() ) AS source_ortho, size( (g1)-[:`RO:HOM0000020`]-() ) AS other_ortho, max(size( (pw)-[]-() )) AS pwDegree, max(size( (ds)-[]-() )) AS dsDegree, [n IN nodes(path) WHERE n.preflabel IN ['cytoplasm','cytosol','nucleus','metabolism','membrane','protein binding','visible','viable','phenotype']] AS nodes_marked, [r IN relationships(path) WHERE r.property_label IN ['interacts with','in paralogy relationship with','in orthology relationship with','colocalizes with']] AS edges_marked WHERE size(nodes_marked) = 0 AND size(edges_marked) = 0 AND pwDegree < 51 AND dsDegree < 21 RETURN path
```
