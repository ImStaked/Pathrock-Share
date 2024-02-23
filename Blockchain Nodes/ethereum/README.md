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
