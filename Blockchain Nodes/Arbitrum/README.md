```
sudo apt update && sudo apt upgrade -y
apt install git curl build-essential cmake npm golang clang make gotestsum wabt lld-13 python3 bison
```

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
source "$HOME/.bashrc"
nvm install 16.19
nvm use 16.19
npm install --global yarn
ln -s /usr/bin/wasm-ld-13 /usr/local/bin/wasm-ld
```

```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source "$HOME/.cargo/env"
rustup install 1.72.1
rustup default 1.72.1
rustup target add wasm32-unknown-unknown --toolchain 1.72.1
rustup target add wasm32-wasi --toolchain 1.72.1
cargo install cbindgen
```


```
bash < <(curl -s -S -L https://raw.githubusercontent.com/moovweb/gvm/master/binscripts/gvm-installer)
source "$HOME/.gvm/scripts/gvm"
gvm install go1.20
gvm use go1.20 --default
curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s -- -b $(go env GOPATH)/bin v1.54.2
```


```
git clone https://github.com/OffchainLabs/nitro.git
cd nitro
git checkout v2.3.0
git submodule update --init --recursive --force
make build
make install
```

