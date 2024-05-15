#!/bin/bash

HEX=$(curl -s -H "Content-type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["latest", false],"id":1}' 10.0.1.211:8545 |  jq -r .result.number)
printf "%d\n" $HEX

