resource "aws_ecs_cluster" "main" {
  name = "${var.app_name}-cluster"

  setting {
    name  = "containerInsights"
    value = "enabled"
  }

  tags = { Name = "${var.app_name}-cluster" }
}

resource "aws_cloudwatch_log_group" "api" {
  name              = "/ecs/${var.app_name}/api"
  retention_in_days = 7
}

resource "aws_ecs_task_definition" "api" {
  family                   = "${var.app_name}-api"
  requires_compatibilities = ["FARGATE"]
  network_mode             = "awsvpc"
  cpu                      = 256
  memory                   = 512
  execution_role_arn       = aws_iam_role.ecs_task_execution.arn
  task_role_arn            = aws_iam_role.ecs_task.arn

  container_definitions = jsonencode([{
    name      = "api"
    image     = "${aws_ecr_repository.api.repository_url}:${var.api_image_tag}"
    essential = true

    portMappings = [{
      containerPort = 4000
      protocol      = "tcp"
    }]

    environment = [
      { name = "PORT", value = "4000" },
      { name = "CORS_ORIGIN", value = "https://${aws_cloudfront_distribution.web.domain_name}" },
      { name = "BETTER_AUTH_URL", value = "https://${aws_cloudfront_distribution.web.domain_name}" },
    ]

    secrets = [
      {
        name      = "MONGODB_URI"
        valueFrom = aws_ssm_parameter.mongodb_uri.arn
      },
      {
        name      = "BETTER_AUTH_SECRET"
        valueFrom = aws_ssm_parameter.better_auth_secret.arn
      },
    ]

    logConfiguration = {
      logDriver = "awslogs"
      options = {
        "awslogs-group"         = aws_cloudwatch_log_group.api.name
        "awslogs-region"        = var.aws_region
        "awslogs-stream-prefix" = "api"
      }
    }
  }])
}

resource "aws_ecs_service" "api" {
  name            = "${var.app_name}-api"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.api.arn
  desired_count   = 1
  launch_type     = "FARGATE"

  network_configuration {
    subnets          = aws_subnet.public[*].id
    security_groups  = [aws_security_group.ecs.id]
    assign_public_ip = true
  }

  load_balancer {
    target_group_arn = aws_lb_target_group.api.arn
    container_name   = "api"
    container_port   = 4000
  }

  depends_on = [aws_lb_listener.api]
}
