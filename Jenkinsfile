
pipeline {
    agent any

    stages {
        stage('Code Analysis') {
            steps {
                withSonarQubeEnv('SonarQubeServer') {
                   bat '"C:\\Users\\dell\\Downloads\\sonar-scanner-cli-8.1.0.6389-windows-x64\\sonar-scanner-8.1.0.6389-windows-x64\\bin\\sonar-scanner.bat"'
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
