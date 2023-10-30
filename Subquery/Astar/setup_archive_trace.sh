# Astar Archival Node with Tracing Setup

ASTAR_VERSION="v5.21.0"

curl https://getsubstrate.io -sSf | bash -s -- --fast
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

source "$HOME/.cargo/env"

sudo apt-get update
sudo apt-get upgrade
sudo apt install -y adduser libfontconfig1
apt install debian-keyring gcc bzr dpkg-dev build-essential libclang-dev zip unzip bz3 pkg-config bash-completion

git clone --recurse-submodules https://github.com/AstarNetwork/Astar.git && cd Astar
cargo build --release --features evm-tracing


sudo useradd --no-create-home --shell /usr/sbin/nologin astar
sudo mv ./astar-collator /usr/local/bin
sudo chmod +x /usr/local/bin/astar-collator

sudo mkdir -p /var/lib/astar/wasm

cd $HOME && wget https://github.com/AstarNetwork/Astar/releases/download/v5.21.0/evm-tracing-artifacts-v5.21.0.tar.gz
tar -xf evm-tracing-artifacts-v5.21.0.tar.gz -C /var/lib/astar/wasm
sudo chown -R astar:astar /var/lib/astar

sudo cat <<EOF >> /etc/systemd/system/astar.service
[Unit]
Description=Astar Archive node

[Service]
User=astar
Group=astar

ExecStart=/usr/local/bin/astar-collator \
  --chain astar \
  --pruning archive \
  --state-pruning archive \
  --blocks-pruning archive \
  --in-peers-light 20 \
  --in-peers 25 \
  --out-peers 25 \
  --base-path /var/lib/astar \
  --rpc-cors all \
  --rpc-external \
  --enable-evm-rpc \
  --ethapi=txpool,debug,trace \
  --wasm-runtime-overrides /var/lib/astar/wasm \
  --rpc-methods Safe \
  --rpc-max-request-size 128 \
  --rpc-max-response-size 128 \
  --telemetry-url 'wss://telemetry.polkadot.io/submit/ 0' \
  --port 30333 \
  --rpc-port 9933 \
  --execution NativeElseWasm \
  --execution-block-construction AlwaysWasm \
  --execution-import-block NativeElseWasm \
  --execution-other NativeElseWasm \
  --execution-syncing NativeElseWasm \
  --wasm-execution compiled \c
  --runtime-cache-size 64 \
  --max-past-logs 100000 \
  --rpc-max-connections 10000 \
  --unsafe-rpc-external \
  --prometheus-external \ 
  --prometheus-port 9615 \
  --name ImStaked \
  --public-addr="neptune.imstaked.com" \
  -- \
  --port 30334 \
  --prometheus-external \ 
  --prometheus-port 9616 \
  --name="ImStaked-embedded-relay"

Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target

EOF


