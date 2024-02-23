# Geth
```
useradd -U -s /bin/bash -m -d /home/ethereum ethereum

mkdir -p /home/ethereum/.ethereum/consensus
mkdir -p /home/ethereum/.ethereum/execution

sudo add-apt-repository -y ppa:ethereum/ethereum
sudo apt-get update
sudo apt-get install ethereum


curl https://raw.githubusercontent.com/prysmaticlabs/prysm/master/prysm.sh --output /home/ethereum/.ethereum/prysm.sh && chmod +x /home/ethereum/.ethereum/prysm.sh  
cd /home/ethereum/.ethereum
/home/ethereum/.ethereum/prysm.sh beacon-chain generate-auth-secret

chown -R ethereum:ethereum /home/ethereum
```

# Erigon
```
wget https://go.dev/dl/go1.22.0.linux-amd64.tar.gz
rm -rf /usr/local/go && tar -C /usr/local -xzf go1.22.0.linux-amd64.tar.gz
export PATH=$PATH:/usr/local/go/bin

apt install build-essential make jq clang curl libssl-dev llvm libudev-dev protobuf-compiler cmake
git clone https://github.com/ledgerwatch/erigon.git && cd erigon
git checkout v2.58.1
make erigon
```


