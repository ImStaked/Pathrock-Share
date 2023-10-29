output "subquery_ipv4" {
  description = "Load balancer IP address"
  value = hcloud_server.subquery.ipv4
}

output "subquery_status" {
  value = {
    for server in hcloud_server.subquery :
    server.name => server.status
  }
}

output "subquery_ips" {
  value = {
    for server in hcloud_server.subquery :
    server.name => server.ipv4_address
  }
}