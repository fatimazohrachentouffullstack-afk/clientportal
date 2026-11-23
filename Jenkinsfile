pipeline {
    agent any

    stages {
        stage('Code Analysis') {
            steps {
                withSonarQubeEnv('SonarQubeServer') {
                    bat 'sonar-scanner'
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
}