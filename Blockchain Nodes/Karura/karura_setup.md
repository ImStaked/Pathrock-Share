```
sudo apt update && sudo apt upgrade -y
curl https://sh.rustup.rs -sSf | sh
sudo apt install -y git clang curl make cmake libssl-dev llvm libudev-dev protobuf-compiler ca-certificates apt-transport-https zip unzip lz4 jq nmon nload htop net-tools whois -y
```
```
git config --global submodule.recurse true
git clone https://github.com/AcalaNetwork/Acala
git checkout 2.23.0
make init
cargo build --release --features with-karura-runtime
```
