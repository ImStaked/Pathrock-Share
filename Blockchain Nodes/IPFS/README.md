

# Update
```
wget https://github.com/ipfs/kubo/releases/download/v0.26.0/kubo_v0.26.0_linux-amd64.tar.gz
tar -xf kubo_v0.26.0_linux-amd64.tar.gz
cd kubo
sudo systemctl stop ipfs
cp ipfs /usr/local/bin/
systemctl start ipfs
cd ..
rm -rf kubo
rm -rf kubo_v0.26.0_linux-amd64.tar.gz
```
