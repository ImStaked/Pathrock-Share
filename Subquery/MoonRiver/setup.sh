#!/bin/bash

# Set up the Wasm Overrides
git clone https://github.com/moonbeam-foundation/moonbeam-runtime-overrides.git
mv moonbeam-runtime-overrides/wasm /var/lib/moonriver-data
rm /var/lib/moonriver-data/wasm/moonbeam-runtime-* &&  rm /var/lib/moonriver-data/wasm/moonbase-runtime-*
chmod +x /var/lib/moonriver-data/wasm/*
chown moonriver_service /var/lib/moonriver-data/wasm/*

# Systemd Service
sudo cat <<EOF >> /etc/systemd/system/moonriver.service
[Unit]
Description="Moonriver systemd service"
After=network.target
StartLimitIntervalSec=0

[Service]
Type=simple
Restart=on-failure
RestartSec=10
User=moonriver_service
SyslogIdentifier=moonriver
SyslogFacility=local7
WorkingDirectory=/var/lib/moonriver-data
KillSignal=SIGHUP
ExecStart=/var/lib/moonriver-data/moonriver \
     --base-path /var/lib/moonriver-data \
     --state-pruning=archive \
     --unsafe-rpc-external \
     --rpc-cors all 
     --rpc-max-connections 10000 \
     --execution wasm \
     --wasm-execution compiled \
     --wasm-runtime-overrides /var/lib/moonriver-data/wasm \
     --ethapi-trace-cache-duration 300 \
     --ethapi-trace-max-count 500 \
     --execution=wasm \
     --runtime-cache-size 64 \
     --runtime-cache-size 64 \
     --max-past-logs 100000 \
     --rpc-max-response-size 128 \
     --ethapi debug,trace,txpool \
     --trie-cache-size 1073741824 \
     --db-cache 16384 \
     --chain moonriver \
     --name "ImStaked" \
     --in-peers 25 \
     --out-peers 25 \
     --sync full \
     --eth-statuses-cache 600000000 \
     --prometheus-external \ 
     --prometheus-port 9615 \
     --telemetry-url 'wss://telemetry.polkadot.io/submit/ 0' \
     -- \
     --port 30334 \
     --execution wasm \
     --prometheus-external \ 
     --prometheus-port 9616 \
     --name="ImStaked (Embedded Relay)"

[Install]
WantedBy=multi-user.target
EOF