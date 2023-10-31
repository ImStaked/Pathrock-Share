#!/bin/bash
DOMAIN="rpc1.pathrocknetwork.org"
# Use the haproxyx configuration in this folder.

# Haproxy Latest Version
sudo apt install --no-install-recommends software-properties-common
sudo add-apt-repository ppa:vbernat/haproxy-2.8 -y
sudo apt install haproxy=2.8

# Install Certbot
snap install certbot --classic

# Request Cert
sudo certbot certonly --standalone -d rpc1.pathrocknetwork.org --non-interactive --agree-tos --email pathrock@protonmail.com --http-01-port=80

# Make SSL directory and combine the 2 cert files into 1 file for haproxy
sudo mkdir -p /etc/ssl/"$DOMAIN"
bash -c "cat /etc/letsencrypt/live/"$DOMAIN"/fullchain.pem /etc/letsencrypt/live/"$DOMAIN"/privkey.pem > /etc/ssl/"$DOMAIN"/"$DOMAIN".pem"

# Snap should renew the cert automatically
# Create Script that runs weekly so when certbot renews the ssl we will put it where it goes before the old cert expires it should renew more than 7 day before expiry
touch /opt/update-certs.sh
cat > /opt/update-certs.sh <<EOF
DOMAIN="rpc1.pathrocknetwork.org"
bash -c "cat /etc/letsencrypt/live/"$DOMAIN"/fullchain.pem /etc/letsencrypt/live/"$DOMAIN"/privkey.pem > /etc/ssl/"$DOMAIN"/"$DOMAIN".pem"
service haproxy reload
EOF
chmod +x /opt/update-certs.sh

# Schedule script to run daily
crontab -e  
0 0 * * 0 root bash /opt/update-certs.sh >> /root/scripts/update-cert.log
