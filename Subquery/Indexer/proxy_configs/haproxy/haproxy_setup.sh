#!/bin/bash
DOMAIN="rpc1.pathrocknetwork.org"
# Use the haproxyx configuration in this folder.

snap install certbot --classic

sudo certbot certonly --standalone -d rpc1.pathrocknetwork.org --non-interactive --agree-tos --email pathrock@protonmail.com --http-01-port=80

sudo mkdir -p /etc/ssl/"$DOMAIN"

bash -c "cat /etc/letsencrypt/live/"$DOMAIN"/fullchain.pem /etc/letsencrypt/live/"$DOMAIN"/privkey.pem > /etc/ssl/"$DOMAIN"/"$DOMAIN".pem"


# Snap should renew the cert automatically
# Create Script that runs daily
touch /opt/update-certs.sh
cat > /opt/update-certs.sh <<EOF
DOMAIN="rpc1.pathrocknetwork.org"
bash -c "cat /etc/letsencrypt/live/"$DOMAIN"/fullchain.pem /etc/letsencrypt/live/"$DOMAIN"/privkey.pem > /etc/ssl/"$DOMAIN"/"$DOMAIN".pem"
service haproxy reload
EOF
chmod +x /opt/update-certs.sh

# Schedule script to run daily
touch /etc/cron.d/cert-update
echo "0 0 * * * root bash /opt/update-certs.sh" > /etc/cron.d/cert-update
