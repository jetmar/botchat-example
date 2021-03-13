pipeline {
    agent any
    tools {nodejs "nodeJS"}
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
        stage('PrepareDeploy'){
            steps {
                sh 'chmod +x ./deploy.sh'
            }
        }
        stage('Deploy') {
            steps {
            echo 'deploying  ....'
                withEnv(['JENKINS_NODE_COOKIE=dontkillme']) {
                  sh './deploy.sh pid.txt'
                }
            }
        }
    }
}