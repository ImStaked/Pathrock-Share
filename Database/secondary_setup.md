### On the new server create new db with path /var/lib/postgresql/data  
```
su postgres
initdb /var/lib/postgresql/data
```
### Remove the data
rm -rf /var/lib/postgresql/data/*
### Restore data from old server
pg_basebackup -h sq.pathrocknetowork.org -D /var/lib/postgresql/data --write-recovery-conf
