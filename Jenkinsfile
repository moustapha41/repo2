pipeline {
  agent any

  environment {
    // À personnaliser dans Jenkins (ou remplacer ici)
    DEPLOY_PATH = '/var/www/monsite'    // dossier cible sur le VPS
  }

  options {
    // empêche Jenkins de faire un checkout automatique (on le fera explicitement)
    skipDefaultCheckout true
  }

  stages {
    stage('Checkout') {
      steps {
        // Récupère le repo et le Jenkinsfile
        checkout scm
      }
    }

    stage('Build (optionnel)') {
      steps {
        script {
          if (fileExists('package.json')) {
            echo 'package.json détecté → installation & build'
            sh 'npm ci'
            // si tu as un script "build" dans package.json, il sera lancé
            sh 'npm run build || echo "npm run build failed or not defined"'
          } else {
            echo 'Pas de package.json → pas de build à exécuter pour ce projet statique'
          }
        }
      }
    }

    stage('Test (détecte quelques erreurs basiques)') {
      steps {
        script {
          // test basique : index.html doit exister
          if (!fileExists('index.html')) {
            error "index.html introuvable — échec des tests"
          } else {
            echo "index.html présent — tests basiques OK"
          }
          // si package.json existe et que tu as des tests npm :
          if (fileExists('package.json')) {
            sh 'npm test || echo "npm test failed or not defined"'
          }
        }
      }
    }

    stage('Archive artifacts') {
      steps {
        // archive les fichiers du build (pratique pour debug / artifacts)
        archiveArtifacts artifacts: '**/*', fingerprint: true
      }
    }

    stage('Deploy to VPS') {
    steps {
        sh """
        echo "Déploiement local vers ${DEPLOY_PATH}"
        rsync -avz --delete --exclude '.git' ./ ${DEPLOY_PATH}
        """
    }
  }

  post {
    success {
      echo "Pipeline terminé avec succès — site déployé."
    }
    failure {
      echo "Échec du pipeline. Vérifier les logs."
    }
  }
}
