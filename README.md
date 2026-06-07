# Product Manager — Back-end Node.js

API REST CRUD pour la gestion de produits avec upload d'images.

## Technologies

- **Node.js** + **Express** — serveur HTTP
- **MySQL** + **Prisma ORM** — base de données
- **Multer** — upload d'images
- **UUID** — identifiants uniques

## Installation

```bash
git clone https://github.com/stephane-1234/product-manager-backend.git
cd product-manager-backend
npm install
```

Crée un fichier `.env` à partir de `.env.example` :

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=TON_MOT_DE_PASSE
DB_NAME=product_manager
PORT=3005
```

Lance la migration :

```bash
npx prisma migrate dev
```

Démarre le serveur :

```bash
npm run dev
```

## Endpoints

| Méthode | Route | Description |
|--------|-------|-------------|
| GET | /api/products | Lister tous les produits |
| GET | /api/products/:id | Obtenir un produit |
| POST | /api/products | Créer un produit |
| PUT | /api/products/:id | Modifier un produit |
| DELETE | /api/products/:id | Supprimer un produit |

## Exemple de requête

```
POST /api/products (form-data)
productTitle: MacBook Pro
productPrice: 2499.99
availableQuantity: 10
productThumbnail: [fichier image]
```