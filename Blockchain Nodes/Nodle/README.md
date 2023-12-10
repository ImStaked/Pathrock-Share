# Nodle Parachain

#### Update Ubuntu
```
sudo apt update && sudo apt upgrade 
sudo apt install protobuf-compiler software-properties-common ca-certificates apt-transport-https pkg-config nmon nload htop snapd zip unzip gzip bzip2 lz4 libssl-dev build-essential clang
```

#### Install Rust
```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
rustup self update
```

#### Compile the binary
```
git clone https://github.com/NodleCode/chain.git && cd chain
git checkout 2.3.2
cargo build --release
sudo cp target/release/nodle-parachain /usr/local/bin/
```
#### Setup Service File
```
link goes here
```
