## Requirements

`Python, Node, git`

### Cloner le repo

- Créer un nouveau dossier et allez dedans avec le terminal.
- tapez la commande git clone url_du_repo.

```bash
git clone https://github.com/sushil-kamble/django-react-auth.git .
```

## Backend

### 1. Accédez au dossier backend et exécutez les commandes suivantes:

`cd backend/`

### 2. Créer et activer l'environnement virtuel

```bash
python -m venv venv

venv\Scripts\activate
```

### 3. Installer les packages requis

```bash
pip install -r requirements.txt
```

### 4. Exécutez le serveur

```bash
python manage.py migrate
python manage.py runserver
```

## Frontend

- Revenez au dossier racine
- Entrer dans `cd frontend/`

### 1. Installation des packages

```bash
yarn
```

### Si vous n'avez pas de yarn installé

```bash
npm i
```

> Supprimez **yarn.lock** car vous aurez déjà **package.lock**



### 2. Exécutez l'application

```bash
yarn start # ou: npm run start
```

> Assurez-vous que le frontend et le backend sont en cours d'exécution.

