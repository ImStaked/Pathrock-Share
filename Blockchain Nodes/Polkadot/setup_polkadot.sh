# Import the security@parity.io GPG key
gpg --recv-keys --keyserver hkps://keys.mailvelope.com 9D4B2B6EB8F97156D19669A9FF0812D491B96798
gpg --export 9D4B2B6EB8F97156D19669A9FF0812D491B96798 > /usr/share/keyrings/parity.gpg
# Add the Parity repository and update the package index
echo 'deb [signed-by=/usr/share/keyrings/parity.gpg] https://releases.parity.io/deb release main' > /etc/apt/sources.list.d/parity.list
apt update
# Install the `parity-keyring` package - This will ensure the GPG key
# used by APT remains up-to-date
apt install parity-keyring
# Install polkadot
apt install polkadot

cat <<EOF | sudo tee /etc/default/polkadot
POLKADOT_CLI_ARGS="--db paritydb-experimental --chain polkadot --sync full --state-pruning=archive --blocks-pruning=archive --name PathrockNetwork3 --execution=wasm --wasm-execution=compiled --max-runtime-instances=16 --port 32330 --rpc-port=9937 --rpc-max-connections 2500 --rpc-cors all --prometheus-external --prometheus-port=9702 --unsafe-rpc-external  --rpc-methods=Safe --rpc-max-request-size=128 --rpc-max-response-size=128 --telemetry-url='wss://telemetry.polkadot.io/submit/ 0 --no-beefy "

EOF
