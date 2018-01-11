import numpy as np
import pandas as pd
import matplotlib as mp
from collections import OrderedDict, defaultdict

#%% NGLY1 key terms
seed = set( [
    'OMIM:615273', # NGLY1 deficiency
    'NCBIGene:55768', # NGLY1 human gene
    'NCBIGene:358', # AQP1 human gene
    'NCBIGene:11826', # AQP1 mouse gene
    'NCBIGene:4779', # NRF1 human gene* Ginger: known as NFE2L1. http://biogps.org/#goto=genereport&id=4779
    'NCBIGene:64772', # ENGASE human gene
    'NCBIGene:360', # AQP3 human gene
    'NCBIGene:282679' # AQP11 human gene
] )

# %%
nodes = pd.read_csv('~/GitHub/ngly1/neo4j-community-3.0.3/import/ngly1/ngly1_concepts.tsv')
nodes.head()

# <codecell>
edges = pd.read_csv('~/GitHub/ngly1/neo4j-community-3.0.3/import/ngly1/ngly1_statements.tsv')
edges = edges[[':START_ID', ':END_ID']].rename(columns = {
':START_ID': 'start',
':END_ID': 'end'
},).sort_values('start', ascending = False)
edges.head()

#%%
esubset = edges[0:100:10]

esubset.start.value_counts()
# esubset.groupby('end').count()

#%%
x = edges[(edges.start =='OMIM:615273') | (edges.end =='OMIM:615273')]
y = edges[(edges.start =='OMIM:615273') | (edges.end =='OMIM:615273')]
x.size
y.head
