library(tidyverse)
node_types = c('GENE', 'PHYS', 'DISO')

max_path = 7

gen_random_paths = function (num_paths = 25, max_path = 7) {
  path_lengths = sample.int(max_path, size = num_paths, replace = TRUE)
  
  
  df = data.frame(
    path_num = rep(1:num_paths, times = path_lengths),
    node_num = lapply(path_lengths, function(x) 1:x) %>% unlist()
  ) %>% 
    rowwise() %>% 
    mutate(node_type = sample(node_types, size = 1))
  
  return(df)
}

df = gen_random_paths()
# compress to single path
# count 
df %>% 
  group_by(path_num) %>% 
  summarise(meta_path = paste0(node_type, collapse = '-')) %>% 
  count(meta_path) %>% 
  arrange(desc(n))

                