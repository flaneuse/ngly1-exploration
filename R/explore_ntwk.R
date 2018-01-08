
# Explore NGLY1 network connections assembled by Nuria --------------------
# Nuria has put together a network of ~ 5,000 nodes w/ ~ 40,000 edges around information 
# about NGLY1 and its pathology. Simple script to explore the network.
# Laura Hughes, lhughes@scripps.edu, 11 December 2017


# setup -------------------------------------------------------------------
library(tidyverse)
library(GGally)


# import data -------------------------------------------------------------
# Pulled from [Nuria's repo](https://github.com/NuriaQueralt/ngly1/tree/master/neo4j-community-3.0.3/import/ngly1)
# on 8 December 2017
nodes = read_csv('~/GitHub/ngly1/neo4j-community-3.0.3/import/ngly1/ngly1_concepts.tsv') %>% 
  rename(id = `id:ID`)

edges = read_csv('~/GitHub/ngly1/neo4j-community-3.0.3/import/ngly1/ngly1_statements.tsv') %>% 
  rename(start_id = `:START_ID`,
         end_id = `:END_ID`)


# glance at everything connected to NGLY1 ---------------------------------
ngly1 = nodes %>% filter(preflabel == 'NGLY1') %>% pull(id)

e_ngly1 = edges %>% filter(start_id %in% ngly1 | end_id %in% ngly1)

n_ids =  c(e_ngly1 %>% pull(start_id), e_ngly1 %>% pull(end_id)) %>% unique()

n_ngly1 = nodes %>% filter(id %in% n_ids)

library('igraph')
net <- graph_from_data_frame(d = e_ngly1, vertices = n, directed = F) 
