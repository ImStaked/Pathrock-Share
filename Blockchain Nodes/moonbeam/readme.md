
## Moonbeam Archive w/tracing

```
apt update
sudo apt upgrade
wget https://github.com/moonbeam-foundation/moonbeam/releases/download/v0.35.0/moonbeam
adduser moonbeam_service --system --no-create-home
mkdir /var/lib/moonbeam-data
mv ./moonbeam /var/lib/moonbeam-data
sudo chown -R moonbeam_service /var/lib/moonbeam-data
cd /var/lib/moonbeam-data/
```

```
git clone https://github.com/moonbeam-foundation/moonbeam-runtime-overrides.git
mv moonbeam-runtime-overrides/wasm /var/lib/moonbeam-data
rm /var/lib/moonbeam-data/wasm/moonriver-runtime-* &&  rm /var/lib/moonbeam-data/wasm/moonbase-runtime-*
chmod +x /var/lib/moonbeam-data/wasm/*
chown -R moonbeam_service /var/lib/moonbeam-data






