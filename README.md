# Test of SingleStore Stored Procedures

Please, run the memsql cluster first, and create the `leads` database. After
that, you can run the client container.

```shell
# access .env and add your LICENSE KEY
docker-compose up -d memsql
# access cluster and run "CREATE DATABASE leads;"
docker-compose up client
```
