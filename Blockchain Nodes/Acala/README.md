Getting Started  

Install Rust and Linux Packages 
```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
sudo apt-get install -y git clang curl libssl-dev llvm libudev-dev protobuf-compiler cmake
rustup toolchain install nightly-x86_64-unknown-linux-gnu
```

Build Acala Binary
```
git clone https://github.com/AcalaNetwork/Acala.git
cd Acala && git config --global submodule.recurse true
git checkout 2.23.0
make init && cargo build ---release ---features with-acala-runtime
```

Build Karura Binary
```
git clone https://github.com/AcalaNetwork/Acala.git
cd Acala && git config --global submodule.recurse true
git checkout 2.23.0
make init && cargo build ---release ---features with-karura-runtime
```
