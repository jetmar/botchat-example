pipeline {
    agent {
         docker {
                    image 'node:6-alpine'
                    args '-p 3000:3000'
                }
    }

    stages {
        stage('checkout-git'){
            steps{
                git poll:true, url: 'https://github.com/jetmar/botchat-example.git'
            }
        }
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing.. example'
            }
        }
        stage('Deploy') {
            steps {
                sh 'npm run start'
            }
        }
    }
}