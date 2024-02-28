## Graph Node 


```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
sudo apt-get install -y clang libpq-dev libssl-dev pkg-config protobuf-compiler make cmake build-essential
git clone https://github.com/graphprotocol/graph-node.git
cd graph-node
cargo build release
cp target/release/graph-node /usr/local/bin/
```

```
psql -q -X -U postgres graph-node <<EOF
create extension pg_trgm;
create extension pg_stat_statements;
create extension btree_gist;
create extension postgres_fdw;
grant usage on foreign data wrapper postgres_fdw to graph;
EOF
```
