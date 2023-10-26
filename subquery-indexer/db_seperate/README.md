# Indexer Setup

### Install Docker
```
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin docker-compose -y
# Latest version of docker-compose
sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/bin/docker-compose
```  
### Install PostgreSqL
```
version: '3'

services:
  postgres:
    image: postgres:16-alpine
    container_name: indexer_db
    restart: always
    ports:
      - 5433:5432
    volumes:
      - .data/postgres:/var/lib/postgresql/data
    environment:
      POSTGRES_PASSWORD: testing_again
    healthcheck:
      test: ['CMD-SHELL', 'pg_isready -U postgres']
      interval: 5s
      timeout: 5s
      retries: 5

```

### Start the database
```
docker-compose up -d
echo "The database address is: 10.239.170.19:5433"
```

## On A Different Machine
- Install Docker
```
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyr- --postgres-password=<replace with your database password>
ings/docker.gpg

echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin docker-compose -y
# Latest version of docker-compose
sudo curl -L https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/bin/docker-compose
```
- Get the docker-compose.yml
  ```
  mkdir subquery-indexer && cd subquery-indexer
  curl https://raw.githubusercontent.com/subquery/network-indexer-services/main/deploy/docker-compose.yml -o docker-compose.yml
  ```
- Setup local ipfs node
  ```
  mkdir ipfs
  curl https://raw.githubusercontent.com/subquery/network-indexer-services/main/deploy/ipfs/ipfs.sh -o ipfs/ipfs.sh
  chmod +x ipfs/ipfs.sh
  ```
- Update docker-compose.yml with db server info
  ```
  - --postgres-host="10.239.170.19:5433"
  - --postgres-password="testing_again"
  ```

