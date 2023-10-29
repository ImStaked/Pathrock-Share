resource "hcloud_volume" "subquery_volume" {
  count    = var.instances
  name     = "subquery-volume-${count.index}"
  size     = var.disk_size
  location = var.location
  format   = "xfs"
}

resource "hcloud_volume_attachment" "fetch_attachment" {
  count     = var.instances
  volume_id = hcloud_volume.subquery_volume[count.index].id
  server_id = hcloud_server.subquery[count.index].id
  automount = true
}