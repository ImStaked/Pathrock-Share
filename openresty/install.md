Install OpenRestu Ubuntu 22

- Stop and disable NGINX if installed before proceeding
```
sudo systemctl disable nginx
sudo systemctl stop nginx
```
- Install Requirements
```
sudo apt-get -y install --no-install-recommends wget gnupg ca-certificates
wget -O - https://openresty.org/package/pubkey.gpg | sudo gpg --dearmor -o /usr/share/keyrings/openresty.gpg
```
- Add the official APT repository
```
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/openresty.gpg] http://openresty.org/package/ubuntu $(lsb_release -sc) main" | sudo tee /etc/apt/sources.list.d/openresty.list > /dev/null
```
- Update
```
sudo apt-get update
```
- Install
```
sudo apt-get -y install openresty
```
