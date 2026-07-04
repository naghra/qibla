# Add GitHub Actions deploy key to Contabo server
# Run ONCE in Contabo Control Panel → VNC Console (or SSH as root):

mkdir -p ~/.ssh && chmod 700 ~/.ssh
echo 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIFUX1vnnR52xysaPMaxaZMevsGrY6/42yq4TuJeLIDri qibla-deploy@github-actions' >> ~/.ssh/authorized_keys
chmod 600 ~/.ssh/authorized_keys

# Then add GitHub repo secrets (Settings → Secrets → Actions):
# CONTABO_HOST=185.214.135.141
# CONTABO_USER=root
# CONTABO_SSH_KEY=<contents of private key — ask agent>
# VITE_ADMIN_PASSWORD=<your admin password>

# Or run full install directly in VNC console:
# curl -fsSL https://raw.githubusercontent.com/naghra/qibla/cursor/contabo-deploy-8af4/deploy/install-on-server.sh | bash -s -- \
#   --domain travelsmarttravelfast.com \
#   --admin-password 'YOUR_PASSWORD' \
#   --email support@travelsmarttravelfast.com
