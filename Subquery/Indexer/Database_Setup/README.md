# Performance Tuning and Optimization
  - [Explaination and Tips](https://www.enterprisedb.com/postgres-tutorials/introduction-postgresql-performance-tuning-and-optimization)
  - HugePages might boost performance
    - Calculate number of HugePages required
      ```
      VmPeak(4340360) / HugePage_size(2048) =  1120
      ```
    - Enable hugepages  
      ```
      echo vm.nr_hugepages=1120 >> /etc/sysctl.conf
      sysctl -p
      ``` 
# Database settings
  - Path: .data/postgres/postgresql.conf
  - [Parameter Explaination](https://postgresqlco.nf/doc/en/param/)

# Multiple Databases / High Availablity
  - **[Configuring multiple databases for indexers](https://github.com/graphprotocol/graph-node/blob/master/docs/config.md#configuring-multiple-databases) ⬅️ Good Info**
  - [Postgres-Cluster Guide 1](https://www.boltic.io/blog/postgres-cluster)
  - [Offical Docs](https://www.postgresql.org/docs/current/high-availability.html)
