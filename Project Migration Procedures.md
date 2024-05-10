1. Stop the project: in webUI and announce not indexing

2. Rename schema: ssh into db
```
ssh root@dbserver
su postgres
psql
ALTER SCHEMA schema_XXX RENAME TO schema_XXX;
```
3. Add new deployment and start: using webUI

4. Delete old project
