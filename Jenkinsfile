pipeline {
    agent any

    environment {
        REGISTRY = "docker.io/chanathipcha24"
        IMAGE_NAME = "rentora-interface"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

       stage('Install Dependencies') {
            steps {
                sh """
                    export NVM_DIR="$HOME/.nvm"
                    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
                    nvm use 22
                    pnpm install --frozen-lockfile
                """
            }
        }

        stage('Lint') {
            steps {
                sh "pnpm lint"
            }
        }

        stage('Test') {
            steps {
                sh "pnpm cypress:unit"
            }
        }

        stage('Build (pnpm build)') {
            steps {
                sh "pnpm build"
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    // Unique tag per build
                    IMAGE_TAG = "v${env.BUILD_NUMBER}"
                }
                withCredentials([
                    string(credentialsId: 'VITE_RENTORA_API_BASE_URL', variable: 'VITE_RENTORA_API_BASE_URL'),
                ]) {
                    sh """
                        echo "Building Docker image $IMAGE_TAG securely..."
                        docker build --no-cache \
                        --build-arg VITE_RENTORA_API_BASE_URL=$VITE_RENTORA_API_BASE_URL \
                        -t $REGISTRY/$IMAGE_NAME:$IMAGE_TAG .
                    """
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-cred', passwordVariable: 'DOCKER_PASS', usernameVariable: 'DOCKER_USER')]) {
                    sh """
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                        docker push $REGISTRY/$IMAGE_NAME:$IMAGE_TAG
                    """
                }
            }
        }

        stage('Deploy to MicroK8s') {
            steps {
                // Update deployment with new image tag
                sh """
                    microk8s kubectl set image deployment/rentora-frontend frontend=$REGISTRY/$IMAGE_NAME:$IMAGE_TAG
                    microk8s kubectl rollout status deployment/rentora-frontend
                """
            }
        }

        stage('Verify Deployment') {
            steps {
                sh """
                    microk8s kubectl get pods
                    microk8s kubectl get svc
                """
            }
        }
    }

    post {
        always {
            echo "Cleaning up local Docker images..."
            sh "docker image prune -f"
        }
    }
}