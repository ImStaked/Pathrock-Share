# Design Plan

#### Subgraph Hardware Requirements should be similar
For a production indexer supporting up to 100 subgraphs and 200 - 500 requiests per second. We would need the following.

- Postgres Hardware
Minimum Setup - Might perform well and be adequet for needs. Database load plays a big roal.
VCPU 8
Ram 32GB
Disk 2TB

Good Setup.  Should perform well and not need an upgrade very soon
VCPU - 16
MEM - 64GB
Disk - 4TB+

- Nodes
Minimum Setup
VCPU - 2 per chain
RAM - 4GB

#### Database 

This will probably be a bit of a learning curve. 

- Storage
```
Each db is different. Also, the threshold of "what can fit in ram on ... cloud servers" is currently pretty large.

There are too many factors to even consider listing them. Starting with db size, obviously, transaction rate, sure, but also things like how fast the queries are? After a month or two, with some real life usage, you will have the numbers for your db. User count, # of sessions, tps, db size, cache usage. And based on this you can, generally, extrapolate into future. If db is mostly being read - cache and i/o goes first. if heavy writes, i/o and ram.

I suggest getting boot disk that is independent of data disks.

Boot Disk - 500GB

Data Disks - 
4TB drives provides 4TB Usable
Data Disk 1 - ZFS Raid 1
Data Disk 1 - ZFS Raid 1

2TB drives provides 4TB Usable
Data Disk 1 - ZFS RAID-5
Data Disk 2 - ZFS RAID-5
Data Disk 3 - ZFS RAID-5
```

]
