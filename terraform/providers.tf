terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  backend "s3" {
    bucket       = "ping-log-tfstate-865626945724"
    key          = "production/terraform.tfstate"
    region       = "ap-southeast-1"
    encrypt      = true
    use_lockfile = true
  }
}

provider "aws" {
  region = var.aws_region
}

# CloudFront requires certificates in us-east-1
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}
