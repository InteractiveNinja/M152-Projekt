pipeline {

  environment {
    imagename = "ninja/media-converter"
    registryCredential = 'jenkins-nexus'
    dockerImage = ''
  }

  agent any

  stages {
    stage("Check Project") {
      steps {
        nodejs('node') {
          sh 'npm ci'
          sh '#npm run check'
          sh 'npm run lint'
        }
      }
    }
    stage("Build Image") {
      steps {
        script {
          dockerImage = docker.build imagename
        }
      }
    }
    stage('Deploy Image') {
      steps {
        script {
          docker.withRegistry('http://senpais-docker:9001', registryCredential) {
            dockerImage.push("$BRANCH_NAME-$BUILD_NUMBER")
            if (env.BRANCH_NAME == 'master') {
              dockerImage.push("latest")
            }

          }
        }
      }
    }
    stage('Deploy on Server') {
      when {
        branch "master"
      }
      steps {
        sh 'curl --insecure -X POST https://portainer.ninja.home/api/webhooks/1c675f57-dbbd-4d51-934a-257c87970e7c'
      }
    }
  }
}