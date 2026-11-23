pipeline {

    agent any

    stages {

        stage('Checkout') {
            steps {
                git 'https://github.com/fatimazohrachentouffullstack-afk/clientportal.git'
            }
        }

        stage('Code Analysis') {
            steps {
                withSonarQubeEnv('SonarQubeServer') {
                    bat 'sonar-scanner -Dsonar.projectKey=DevWebClients -Dsonar.sources=.'
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 1, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

    }
}