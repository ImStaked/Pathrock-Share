#!/bin/bash

TIME=$(date +%s)
SYNC=$(curl -s -d '{"id":0,"jsonrpc":"2.0","method":"optimism_syncStatus"}' -H "Content-Type: application/json" http://10.0.1.122:7545 | jq -r .result.unsafe_l2.timestamp)
DIFF=$(($TIME-$SYNC))
MINS=$(($DIFF/60))
echo Base node is $MINS minutes behind
