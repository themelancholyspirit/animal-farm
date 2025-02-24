terraform {
  required_providers {
    google = {
      source  = "hashicorp/google"
      version = "~> 4.0"
    }
  }
}

# Configure GCP provider
provider "google" {
  project = var.project_id
  region  = var.region
}

# Create GKE cluster
resource "google_container_cluster" "primary" {
  name     = "animal-farm-cluster"
  location = var.region

  remove_default_node_pool = true
  initial_node_count       = 1

  network    = google_compute_network.vpc.name
  subnetwork = google_compute_subnetwork.subnet.name
}

# Create managed node pool
resource "google_container_node_pool" "primary_nodes" {
  name       = "animal-farm-node-pool"
  cluster    = google_container_cluster.primary.name
  location   = var.region
  node_count = var.gke_num_nodes

  node_config {
    oauth_scopes = [
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring",
      "https://www.googleapis.com/auth/devstorage.read_only"
    ]

    labels = {
      env = var.project_id
    }

    machine_type = "e2-medium"
    disk_size_gb = 50
    disk_type    = "pd-standard"

    metadata = {
      disable-legacy-endpoints = "true"
    }
  }
}

resource "google_compute_network" "vpc" {
  name                    = "animal-farm-vpc"
  auto_create_subnetworks = "false"
}

resource "google_compute_subnetwork" "subnet" {
  name          = "animal-farm-subnet"
  region        = var.region
  network       = google_compute_network.vpc.name
  ip_cidr_range = "10.10.0.0/24"
}

resource "google_sql_database_instance" "instance" {
  name             = "animal-farm-db"
  region           = var.region
  database_version = "POSTGRES_13"

  settings {
    tier = "db-f1-micro"
  }

  deletion_protection = false
} 