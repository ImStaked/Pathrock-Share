### Security Scan 12-7-23
```
Nmap scan report for sqidb1.pathrocknetwork.org (168.119.212.48)
Host is up (0.14s latency).
rDNS record for 168.119.212.48: static.48.212.119.168.clients.your-server.de
Not shown: 997 filtered ports
PORT     STATE  SERVICE
22/tcp   open   ssh
80/tcp   open   http
8888/tcp closed sun-answerbook
```
The only problem I see is the ssh port is exposed to everyone. 
This is a hetzner box firewall rules in robot can eliminate this. 
