variable "project_id" {
  description = "GCP Project ID"
  type        = string
}

variable "region" {
  description = "GCP region"
  type        = string
  default     = "us-central1"
}

variable "gke_num_nodes" {
  description = "Number of GKE nodes"
  type        = number
  default     = 2
} 