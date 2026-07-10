# Store MongoDB URI securely in SSM Parameter Store
# ECS tasks pull this at runtime — never baked into the image
resource "aws_ssm_parameter" "mongodb_uri" {
  name  = "/${var.app_name}/mongodb-uri"
  type  = "SecureString"
  value = var.mongodb_uri

  tags = { Name = "${var.app_name}-mongodb-uri" }
}

resource "aws_ssm_parameter" "better_auth_secret" {
  name  = "/${var.app_name}/better-auth-secret"
  type  = "SecureString"
  value = var.better_auth_secret

  tags = { Name = "${var.app_name}-better-auth-secret" }
}

# Allow ECS task execution role to read SSM parameters
resource "aws_iam_role_policy" "ecs_ssm" {
  name = "${var.app_name}-ecs-ssm-policy"
  role = aws_iam_role.ecs_task_execution.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow"
      Action = ["ssm:GetParameters", "kms:Decrypt"]
      Resource = [
        aws_ssm_parameter.mongodb_uri.arn,
        aws_ssm_parameter.better_auth_secret.arn,
      ]
    }]
  })
}
