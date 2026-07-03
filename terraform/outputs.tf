output "cloudfront_url" {
  description = "Frontend URL"
  value       = "https://${aws_cloudfront_distribution.web.domain_name}"
}

output "api_url" {
  description = "API / GraphQL endpoint"
  value       = "http://${aws_lb.api.dns_name}/graphql"
}

output "ecr_repository_url" {
  description = "ECR repository URL for pushing Docker images"
  value       = aws_ecr_repository.api.repository_url
}

output "s3_bucket_name" {
  description = "S3 bucket name for deploying frontend build"
  value       = aws_s3_bucket.web.bucket
}

output "cloudfront_distribution_id" {
  description = "CloudFront distribution ID (needed for cache invalidation after deploy)"
  value       = aws_cloudfront_distribution.web.id
}
