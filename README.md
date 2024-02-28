# Subquery 
----------------------------------------
  - /home/subquery/subquery-indexer/docker-compose.yml
  ```
  indexer_proxy                 v1.3.9  
  indexer_coordinator           v1.4.10  
  indexer_cache                 redis:7-alpine  
  ```


## Kusama
--------------------------------------
- HTTP
  ```
  https://sgd.proxy.pathrocknetwork.org:5321
  ```
- Websocket
  ```
  wss://sgd.proxy.pathrocknetwork.org:5321
  ```
- Dictionary URL
  ```
  https://api.subquery.network/sq/subquery/kusama-dictionary
  ```
- Paths
  ```
  /Qmbe5g5vbEJYYAfpjcwNDzuhjeyaEQPQbxKyKx6PveYnR8
  /home/subquery/subquery-indexer/.projects/Qmbe5g5vbEJYYAfpjcwNDzuhjeyaEQPQbxKyKx6PveYnR8
  /home/poi//Qmbe5g5vbEJYYAfpjcwNDzuhjeyaEQPQbxKyKx6PveYnR8
  ```
- Docker-Compose
  
  [/home/subquery/subquery-indexer/.projects/Qmbe5g5vbEJYYAfpjcwNDzuhjeyaEQPQbxKyKx6PveYnR8/docker-compose.yml](https://github.com/ImStaked/Pathrock-Share/blob/main/Subquery/Indexer/Configs/Kusama/docker-compose.yml)
- Containers
  ```
  node_qmbe5g5vbejyyaf     subquerynetwork/subql-node-substrate:v3.6.0
  query_qmxwfcf8858yy92    onfinality/subql-query:v2.9.0
  ```
- Public Endpoints
  ```
  wss://kusama-rpc.polkadot.io
  ```


## Westend
--------------------------------------
- HTTP
  ```
  https://sgd.proxy.pathrocknetwork.org:9814
  ```
- Websocket
  ```
  wss://sgd.proxy.pathrocknetwork.org:9814
  ```
- Paths
  ```
  QmP1BMJoyJ5iFq6XLSfTJ3D23iWuTG1tnsEffJpNieQnwN
  /home/poi/QmP1BMJoyJ5iFq6XLSfTJ3D23iWuTG1tnsEffJpNieQnwN  
  /home/subquery/subquery-indexer/.projects/QmP1BMJoyJ5iFq6XLSfTJ3D23iWuTG1tnsEffJpNieQnwN
  ```
- Docker-Compose
  
  [/home/subquery/subquery-indexer/.projects/QmP1BMJoyJ5iFq6XLSfTJ3D23iWuTG1tnsEffJpNieQnwN/docker-compose.yml](https://github.com/ImStaked/Pathrock-Share/blob/main/Subquery/Indexer/Configs/Westend/docker-compose.yml)

- Containers
  ```
  node_qmp1bmjoyj5ifq6
  query_qmp1bmjoyj5ifq6
  ```
- Public Endpoints
  ```
  wss://westend-rpc.polkadot.io
  ```



## Astar 
------------------------------------
- HTTP
  ```
  https://sgd.proxy.pathrocknetwork.org:8844
  ```
- Websocket
  ```
  wss://sgd.proxy.pathrocknetwork.org:8844
  ```
- Paths
  ```
  QmapQ6cNKPtZE1jkeUp5V6xy7sPSiJiZpoqZcRRtyc4Stq
  /home/subquery/subquery-indexer/.projects/QmapQ6cNKPtZE1jkeUp5V6xy7sPSiJiZpoqZcRRtyc4Stq/
  /home/poi/QmapQ6cNKPtZE1jkeUp5V6xy7sPSiJiZpoqZcRRtyc4Stq
  ```
- Docker Compose
  
  [/home/subquery/subquery-indexer/.projects/QmapQ6cNKPtZE1jkeUp5V6xy7sPSiJiZpoqZcRRtyc4Stq/docker-compose.yml](https://github.com/ImStaked/Pathrock-Share/blob/main/Subquery/Indexer/Configs/Astar/docker-compose.yml)

  
- Containers
  ```
  node_qmumnkphce6jwgm     v3.5.3
  query_qmumnkphce6jwgm    v2.9.0
  ```
- Public Endpoints
  ```

  ```



## IPFS
--------------------------------------
- Admin UI
  ```
  https://sgd.proxy.pathrocknetwork.org:5111/webui
  ```
- RPC
  ```
  https://sgd.proxy.pathrocknetwork.org:5112/api/v1
  ```

## FetchAi 
----------------------------------------
- HTTP
  ```
  https://sgd.proxy.pathrocknetwork.org:18888
  ```
- Websocket
  ```
  wss://sgd.proxy.pathrocknetwork.org:18888/websocket
  ```
- Paths
  ```

  ```
- Containers
  ```

  ```
- Public Endpoints
  ```
  https://rpc-fetchhub.fetch.ai:443
  ```


## Polkadot 
-------------------------------------
- HTTP
  ```
  https://sgd.proxy.pathrocknetwork.org:9966
  ```
- Websocket
  ```
  wss://sgd.proxy.pathrocknetwork.org:9966
  ```
- Dictionary URL
  ```
  https://api.subquery.network/sq/subquery/polkadot-dictionary
  ```
- Paths
  ```
  QmZGAZQ7e1oZgfuK4V29Fa5gveYK3G2zEwvUzTZKNvSBsm
  /home/subquery/subquery-indexer/.projects/QmZGAZQ7e1oZgfuK4V29Fa5gveYK3G2zEwvUzTZKNvSBsm/docker-compose.yml
  /home/poi/QmZGAZQ7e1oZgfuK4V29Fa5gveYK3G2zEwvUzTZKNvSBsm
  ```
- Containers
  ```
  node_qmzgazq7e1ozgfu     v3.5.3
  query_qmzgazq7e1ozgfu    v2.9.0
  ```
- Public Endpoints
  ```
  wss://rpc.polkadot.io
  ```



## Shiden
-------------------------------------
- HTTP
  ```
  
  ```
- Websocket
  ```
  
  ```
- Paths
  ```
  QmV25WVPgdmAgRCqkbGUU49xdeg9td3CK5LbtBjeQEMxTW
  /home/subquery/subquery-indexer/.projects/QmV25WVPgdmAgRCqkbGUU49xdeg9td3CK5LbtBjeQEMxTW/docker-compose.yml
  /home/poi/QmV25WVPgdmAgRCqkbGUU49xdeg9td3CK5LbtBjeQEMxTW
  ```
- Containers
  ```
  node_qmv25wvpgdmagrc     v3.5.0
  query_qmv25wvpgdmagrc    v2.9.0
  ```
- Public Endpoints
  ```
  wss://rpc.shiden.astar.network
  ```


## Bifrost
-------------------------------------
- HTTP
  ```
  
  ```
- Websocket
  ```
  
  ```
- Paths
  ```
  QmUWd1o3BJb5qSR1ZaAhSw1duVgQ5bsczdfRNakNUL5cJy
  /home/subquery/subquery-indexer/.projects/QmUWd1o3BJb5qSR1ZaAhSw1duVgQ5bsczdfRNakNUL5cJy/docker-compose.yml
  /home/poi/QmUWd1o3BJb5qSR1ZaAhSw1duVgQ5bsczdfRNakNUL5cJy
  ```
- Containers
  ```
  node_qmuwd1o3bjb5qsr     v3.5.0
  query_qmuwd1o3bjb5qsr    v2.9.0
  ```
- Public Endpoints
  ```
  wss://bifrost-rpc.dwellir.com
  ```


## Nodle  
------------------------------
- HTTP
  ```
  https://rpc1.pathrocknetwork.org:9995
  ```
- Websocket
  ```
  wss://rpc1.pathrocknetwork.org:9995
  ```
- Paths
  ```
  QmQtmsHoJEYUcxKE4tBqr9Z8kudcgkczQPfhkAxVExQX5y
  /home/subquery/subquery-indexer/.projects/QmQtmsHoJEYUcxKE4tBqr9Z8kudcgkczQPfhkAxVExQX5y/docker-compose.yml
  /home/poi/QmQtmsHoJEYUcxKE4tBqr9Z8kudcgkczQPfhkAxVExQX5y
  ```
- Containers
  ```
  node_qmqtmshojeyucxk     v3.5.3
  query_qmqtmshojeyucxk    v2.9.0
  ```
- Public Endpoints
  ```
  http://rpc1.pathrocknetwork.org:9995
  ```



## MoonBase    
-------------------------------------
- HTTP
  ```
  https://sgd.proxy.pathrocknetwork.org:9233
  ```
- Websocket
  ```
  wss://sgd.proxy.pathrocknetwork.org:9233   
  ```
- Dictionary URL
  ```
  https://api.subquery.network/sq/subquery/moonbase-alpha-dictionary
  ```
- Paths
  ```
  QmUgn2eP1nvAECSe9HE9zTHTHwkQMDwSN7rpB1aXcsthfe
  /home/subquery/subquery-indexer/.projects/QmUgn2eP1nvAECSe9HE9zTHTHwkQMDwSN7rpB1aXcsthfe
  /home/poi/QmUgn2eP1nvAECSe9HE9zTHTHwkQMDwSN7rpB1aXcsthfe
  ```
- Docker Containers
  ```
  node_qmugn2ep1nvaecs     v3.5.3
  query_qmugn2ep1nvaecs    v2.9.0
  ```
- Public Endpoints
  ```
  https://moonbase-rpc.dwellir.com
  wss://moonbase.unitedbloc.com
  wss://moonbeam-alpha.api.onfinality.io/public-ws
  ```


## Moonbeam
--------------------------------------
- HTTP
  ```
  https://rpc1.pathrocknetwork.org:9995
  ```
- Websocket
  ```
  wss://rpc1.pathrocknetwork.org:9995
  ```
- Dictionaray URL
  ```
  https://api.subquery.network/sq/subquery/moonbeam-dictionary
  ```
- Paths
  ```
  QmeeqBHdVu7iYnhVE9ZiYEKTWe4jXVUD5pVoGXT6LbCP2t
  /home/subquery/subquery-indexer/.projects/QmeeqBHdVu7iYnhVE9ZiYEKTWe4jXVUD5pVoGXT6LbCP2t
  /home/poi/QmeeqBHdVu7iYnhVE9ZiYEKTWe4jXVUD5pVoGXT6LbCP2t
  ```
- Containers
  ```
  node_qmeeqbhdvu7iynh     v3.5.3
  query_qmeeqbhdvu7iynh    v2.9.0
  ```
- Public Endpoints
  ```
  https://moonbeam.unitedbloc.com
  wss://moonbeam.unitedbloc.com
  ```


## Moonriver
--------------------------------------
- HTTP
  ```
  https://rpc1.pathrocknetwork.org:9995
  ```
- Websocket
  ```
  wss://rpc1.pathrocknetwork.org:9995
  ```
- Dictionary URL
  ```
  https://api.subquery.network/sq/subquery/moonriver-dictionary
  ```
- Paths
  ```
  QmXCr6uZFdY1YcGTa4u6ZieQPXK4VHE1Pjy7CBr7ubFwKR
  /home/subquery/subquery-indexer/.projects/QmXCr6uZFdY1YcGTa4u6ZieQPXK4VHE1Pjy7CBr7ubFwKR
  /home/poi/QmXCr6uZFdY1YcGTa4u6ZieQPXK4VHE1Pjy7CBr7ubFwKR
  ```
- Containers
  ```
  node_qmxcr6uzfdy1ycg
  query_qmxcr6uzfdy1ycg
  ```
- Public Endpoints
  ```
  wss://sgd.proxy.pathrocknetwork.org:9876
  ```


## aleph-zero
--------------------------------------
- HTTP
  ```
  https://sgd.proxy.pathrocknetwork.org:9095
  ```
- Websocket
  ```
  wss://sgd.proxy.pathrocknetwork.org:9095
  ```
- Paths
  ```
  QmXp3MdCjZyUsmXhFXJTisxQiP1P96sm81WGmu2ew7v8WN
  /home/subquery/subquery-indexer/.projects/QmXp3MdCjZyUsmXhFXJTisxQiP1P96sm81WGmu2ew7v8WN
  /home/poi/QmXp3MdCjZyUsmXhFXJTisxQiP1P96sm81WGmu2ew7v8WN
  ```
- Containers
  node_qmxp3mdcjzyusmx     v3.5.3
  query_qmxp3mdcjzyusmx    v2.9.0
  ```
- Endpoints
  ```
  https://sgd.proxy.pathrocknetwork.org:9095
  wss://sgd.proxy.pathrocknetwork.org:9095
  ```



### Acala
--------------------------------------
- HTTP
  ```
  https://sgd.proxy.pathrocknetwork.org:18998
  ```
- Websocket
  ```
  wss://sgd.proxy.pathrocknetwork.org:18998
  ```
- Paths
  ```
  /home/subquery/subquery-indexer/.projects/  /docker-compose.yml
  /home/poi/
  ```
- Containers
  ```
  node_
  query_
  ```
- Public Endpoints
  ```
  https://rpc.evm.acala.network
  ```

## Karura
--------------------------------------
- 
- /home/subquery/subquery-indexer/.projects/  /docker-compose.yml
- /home/poi/
```
node_
query_
```
- Endpoints
```
https://sgd.proxy.pathrocknetwork.org:18999
wss://sgd.proxy.pathrocknetwork.org:18999
```


### Kilt Spiritnet
--------------------------------------
- HTTP
  ```
  https://sgd.proxy.pathrocknetwork.org:7001
  ```
- Websocket
  ```
  wss://sgd.proxy.pathrocknetwork.org:7001
  ```  
- Paths
  ```https://app.subquery.network/explorer/project/0x03/overview
  /home/subquery/subquery-indexer/.projects/  /docker-compose.yml
  /home/poi/
  ```
- Containers
  ```
  node_
  query_
  ```
- Public Endpoints
  ```
  https://rpc.evm.karura.network
  ```

## Ethereum Full Node
--------------------------------------
###    [Subquery Project](https://app.subquery.network/explorer/project/0x03/overview) 
--------------------------------------

- HTTP
  ```
  https://sgd.proxy.pathrocknetwork.org:5781
  ```
- Websocket
  ```
  wss://sgd.proxy.pathrocknetwork.org:5781
  ```

  

## NEAR - (Indexing)  
-------------------------------------
- HTTP
  ```
  ```
- Websocket
  ```
  ```
- Paths
  ```
  QmbtSt8USCUTBWeAqevN1AwmUhKzqmtvhSdFYHYA1BviC8
  /home/subquery/subquery-indexer/.projects/QmbtSt8USCUTBWeAqevN1AwmUhKzqmtvhSdFYHYA1BviC8/docker-compose.yml
  /home/poi/QmbtSt8USCUTBWeAqevN1AwmUhKzqmtvhSdFYHYA1BviC8
  ```
- Containers
  ```
  node_qmzxpa9aezhzn1i     v3.4.1
  query_qmzxpa9aezhzn1i    v2.2.1-0  
  ```
- Public Endpoints
  ```
  https://archival-rpc.mainnet.near.org
  ```
