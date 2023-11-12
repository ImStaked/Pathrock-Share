#!/bin/bash

INDEXER=0xfe97de6419e942e689081d0db546adf1b57d85b2
HEALTHY=$(curl -s http://sq.pathrocknetwork.org:1080/healthy | jq -r .indexer)
DOCKER_STATUS=$(docker ps -a | grep Exited)

if [ "$HEALTHY" = "$INDEXER" ];then
    echo "Healthy endpoint response is normal"
    else 
    echo "Response is not normal"
fi

if [ -z $DOCKER_STATUS ];then
    echo "Docker nodes are healthy"
    else 
    echo $DOCKER_STATUS
fi
