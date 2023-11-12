

# Postgresql Scaling / Sharding
- From TheGraph [documentation](https://thegraph.com/docs/en/operating-graph-node/)
  
  Database scaling via sharding⁠#Link to this section
  For most use cases, a single Postgres database is sufficient to support a graph-node instance. When a graph-node instance outgrows a single Postgres database, it is possible to split the storage of graph-node's data across multiple Postgres databases. All databases together form the store of the graph-node instance. Each individual database is called a shard.

  Shards can be used to split subgraph deployments across multiple databases, and can also be used to use replicas to spread query load across databases. This includes configuring the number of available database connections each graph-node should keep in its connection pool for each database, which becomes increasingly important as more subgraphs are being indexed.

  Sharding becomes useful when your existing database can't keep up with the load that Graph Node puts on it, and when it's not possible to increase the database size anymore.

  It is generally better make a single database as big as possible, before starting with shards. One exception is where query traffic is split very unevenly between subgraphs; in those situations it can help dramatically if the high-volume subgraphs are kept in one shard and everything else in another because that setup makes it more likely that the data for the high-volume subgraphs stays in the db-internal cache and doesn't get replaced by data that's not needed as much from low-volume subgraphs.  

- **About postgresql configuration**  
  In terms of configuring connections, start with max_connections in postgresql.conf set to 400 (or maybe even 200) and look at the store_connection_wait_time_ms and store_connection_checkout_count Prometheus metrics. Noticeable wait times (anything above 5ms) is an indication that there are too few connections available; high wait times there will also be caused by the database being very busy (like high CPU load). However if the database seems otherwise stable, high wait times indicate a need to increase the number of connections. In the configuration, how many connections each graph-node instance can use is an upper limit, and Graph Node will not keep connections open if it doesn't need them.

  Read more about store configuration [here](https://github.com/graphprotocol/graph-node/blob/master/docs/config.md#configuring-multiple-databases)


# High Availablity

[Postgres-Cluster Guide 1](https://www.boltic.io/blog/postgres-cluster)  
[Offical Docs](https://www.postgresql.org/docs/current/high-availability.html)
