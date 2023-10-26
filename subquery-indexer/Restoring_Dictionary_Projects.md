# Restoring Dictionary
```
cd ~/subquery-indexer
curl -o moonriver_dictionary.tar aria2c https://kepler-dictionary-projects-prod.s3.amazonaws.com/moonriver/moonriver.tar  
tar -xvf moonriver_dictionary.tar
```

# Change xxxx to the newly created filename
```
cp schema_xxxxxxx to .data/postgres/  
docker exec -it indexer_db pg_restore -v -j 2 -h localhost -p 5432 -U postgres -d postgres /var/lib/postgresql/data/schema_xxxxxxx > restore.log 2>&1 &
```
