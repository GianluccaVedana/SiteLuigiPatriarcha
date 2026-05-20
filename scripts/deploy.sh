#!/bin/bash
# Deploy script - 29ª Taça Luigi Patriarcha
# Servidor: 200.234.218.15 | Domínio: vps67147.publiccloud.com.br

set -e

DOMAIN="vps67147.publiccloud.com.br"
APP_DIR="/var/www/luigi-cup"
REPO="https://github.com/GianluccaVedana/SiteLuigiPatriarcha.git"
NODE_VERSION="18"
APP_PORT="3000"

echo "======================================"
echo " Deploy 29ª Taça Luigi Patriarcha"
echo "======================================"

# ---------- 1. Sistema ----------
echo "[1/7] Atualizando sistema..."
apt-get update -y && apt-get upgrade -y
apt-get install -y curl git nginx certbot python3-certbot-nginx ufw

# ---------- 2. Node.js ----------
echo "[2/7] Instalando Node.js $NODE_VERSION..."
if ! command -v node &>/dev/null || [[ $(node -v | cut -d'v' -f2 | cut -d'.' -f1) -lt 18 ]]; then
  curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash -
  apt-get install -y nodejs
fi
echo "Node: $(node -v) | npm: $(npm -v)"

# ---------- 3. PM2 ----------
echo "[3/7] Instalando PM2..."
npm install -g pm2

# ---------- 4. Clonar / Atualizar repositório ----------
echo "[4/7] Clonando repositório..."
if [ -d "$APP_DIR" ]; then
  cd "$APP_DIR"
  git pull origin main
else
  git clone "$REPO" "$APP_DIR"
  cd "$APP_DIR"
fi

# ---------- 5. Build ----------
echo "[5/7] Instalando dependências e fazendo build..."
npm install --production=false
npm run build

# ---------- 6. PM2 ----------
echo "[6/7] Configurando PM2..."
pm2 delete luigi-cup 2>/dev/null || true
pm2 start npm --name "luigi-cup" -- start -- --port $APP_PORT
pm2 save
pm2 startup systemd -u root --hp /root | tail -1 | bash || true

# ---------- 7. Nginx ----------
echo "[7/7] Configurando Nginx..."
cat > /etc/nginx/sites-available/luigi-cup <<NGINX
server {
    listen 80;
    server_name $DOMAIN;

    # Logs
    access_log /var/log/nginx/luigi-cup.access.log;
    error_log  /var/log/nginx/luigi-cup.error.log;

    # Gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Proxy para Next.js
    location / {
        proxy_pass         http://localhost:$APP_PORT;
        proxy_http_version 1.1;
        proxy_set_header   Upgrade \$http_upgrade;
        proxy_set_header   Connection 'upgrade';
        proxy_set_header   Host \$host;
        proxy_set_header   X-Real-IP \$remote_addr;
        proxy_set_header   X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header   X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    # Arquivos estáticos Next.js
    location /_next/static/ {
        proxy_pass http://localhost:$APP_PORT;
        expires    365d;
        add_header Cache-Control "public, immutable";
    }
}
NGINX

ln -sf /etc/nginx/sites-available/luigi-cup /etc/nginx/sites-enabled/luigi-cup
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

# ---------- Firewall ----------
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

echo ""
echo "======================================"
echo " Deploy concluído com sucesso!"
echo " Site: http://$DOMAIN"
echo "======================================"
echo ""
echo "Para habilitar HTTPS (SSL), rode:"
echo "  certbot --nginx -d $DOMAIN --non-interactive --agree-tos -m seu@email.com"
echo ""
echo "Comandos úteis:"
echo "  pm2 status          → ver status do app"
echo "  pm2 logs luigi-cup  → ver logs em tempo real"
echo "  pm2 restart luigi-cup → reiniciar app"
