variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "ap-southeast-1"
}

variable "app_name" {
  description = "Application name used for resource naming"
  type        = string
  default     = "ping-log"
}

variable "environment" {
  description = "Deployment environment"
  type        = string
  default     = "production"
}

variable "mongodb_uri" {
  description = "MongoDB Atlas connection string"
  type        = string
  sensitive   = true
}

variable "better_auth_secret" {
  description = "Secret key for Better Auth session signing (min 32 chars)"
  type        = string
  sensitive   = true
}

variable "resend_api_key" {
  description = "Resend API key for sending password reset emails"
  type        = string
  sensitive   = true
}

variable "resend_from_email" {
  description = "From address used for password reset emails"
  type        = string
  default     = "Ping Log <onboarding@resend.dev>"
}

variable "api_image_tag" {
  description = "Docker image tag for the API"
  type        = string
  default     = "latest"
}
