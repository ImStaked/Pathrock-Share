
## Prepare the system  
```
sudo apt update && sudo apt upgrade -y
curl https://sh.rustup.rs -sSf | sh
sudo apt install -y git clang curl make cmake libssl-dev llvm libudev-dev protobuf-compiler ca-certificates apt-transport-https zip unzip lz4 jq nmon nload htop net-tools whois -y
```

## Build binary
```
git config --global submodule.recurse true
git clone https://github.com/AcalaNetwork/Acala && cd Acala
git checkout 2.23.0
make init
cargo build --release --features with-karura-runtime
```

## Create service
```
sudo wget https://raw.githubusercontent.com/ImStaked/Pathrock-Share/main/Blockchain%20Nodes/Karura/karura.service -o /etc/systemd/system/karura.service
systemctl daemon-reload
systemctl enable karura
systemctl start karura
```
