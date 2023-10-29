
# Hetzner API token for authorization to hcloud & it is provided as an argument to Terraform command
variable "hcloud_token" {
  # default = <your-api-token>
}
# Datacenter location 
# Asburn=ash-dc1  - Hillsboro=hil-dc1 Falkenstein=fsn1-dc14 Helsinki=hel1-dc2  Nuremberg=nbg1-dc3
variable "location" {
  default = "nbg1"
}

variable "http_protocol" {
  default = "http"
}

variable "http_port" {
  default = "80"
}
# help us control the number of VMs & their additions (like disk volumes) created with Terraform code using count object.
variable "instances" {
  default = "1"
}
# 4VCPU-ARM 8GB 
variable "server_type" {
  default = "CAX21"
}

variable "os_type" {
  default = "ubuntu-22.04"
}

variable "disk_size" {
  default = "250"
} 

# desired IP range for Hetzner Cloud Network
variable "ip_range" {
  default = "10.0.0.0/24"
}