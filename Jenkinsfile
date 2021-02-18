pipeline {
    agent any

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