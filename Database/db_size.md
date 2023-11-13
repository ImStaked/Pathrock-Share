# Troubleshooting

# Get the size of the database
```
postgres=# SELECT pg_database_size('postgres');
 pg_database_size 
------------------
          1672757449187
(1 row)
```
# Vacuume the database ( Requires Locked DB access )
```
 VACUUM FULL
```


