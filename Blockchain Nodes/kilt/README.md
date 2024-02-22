```
sudo apt update && sudo apt upgrade
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
sudo apt-get install -y git clang curl libssl-dev llvm libudev-dev protobuf-compiler cmake
```
# Clone the repository
```
git clone https://github.com/KILTprotocol/kilt-node.git
git check 1.12.1
cargo build --release -p kilt-parachain
```
