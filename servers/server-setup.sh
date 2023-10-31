#!/bin/bash

apt update && apt upgrade -y
wget -O /etc/ssh/sshd_config https://raw.githubusercontent.com/rickrods/Ubuntu-Scripts/main/configs/ubuntu18.04/sshd_config
sudo apt install bash-completion zip unzip lz4 bzip2 smartmontools cpufrequtils jq htop nmon nload net-tools whois snapd lm-sensors lshw lsof zfsutils-linux linux-tools-generic linux-tools-common haproxy -y
snap install lxd
snap install certbot --classic

zpool create \
    -o ashift=9 \
    -o autotrim=on \
    -O compression=lz4 \
    -O relatime=on \
    -O atime=off \
    -O redundant_metadata=most \
    -O normalization=formD \
    datapool1 /dev/nvme1n1p1



