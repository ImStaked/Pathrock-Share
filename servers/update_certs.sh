#!/bin/bash
# By ImStaked

DOMAIN="rpc1.pathrocknetwork.org"
bash -c "cat /etc/letsencrypt/live/"$DOMAIN"/fullchain.pem /etc/letsencrypt/live/"$DOMAIN"/privkey.pem > /etc/ssl/"$DOMAIN"/"$DOMAIN".pem"
service haproxy reload
