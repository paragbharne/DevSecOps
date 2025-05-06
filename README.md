# 🔐 DevSecOps Pipeline for Your Repository

This project integrates a comprehensive GitHub Actions–based DevSecOps pipeline to ensure secure coding practices, dependency management, and container security.

---

## ✅ Pipeline Overview

The pipeline is triggered automatically on:
- Push events to `main` or `security-checks` branches.
- Pull requests targeting the `main` branch.
- Manual dispatch via GitHub Actions.

---

## 🧭 Features Overview

| **Security Check Type**               | **Tool Used**        | **Description**                                                             |
|--------------------------------------|----------------------|-----------------------------------------------------------------------------|
| **Static Application Security Testing (SAST)** | CodeQL           | Identifies vulnerabilities like SQLi, XSS, and other coding flaws.          |
| **Dependency Scanning**              | Trivy (Filesystem)   | Scans project dependencies for known vulnerabilities.                       |
| **Code Linting with Security Rules** | ESLint               | Enforces secure JavaScript/TypeScript coding standards.                     |
| **Secret Scanning**                  | Gitleaks             | Detects hardcoded secrets such as API keys and tokens.                      |
| **Container Image Scanning**         | Trivy (Image)        | Scans Docker images for OS and library vulnerabilities.                     |

---

## 🧪 1. Static Application Security Testing (SAST)

- **🔧 Tool:** GitHub CodeQL  
- **📦 Language:** JavaScript/TypeScript

CodeQL analyzes the source code to detect common security vulnerabilities.

**Output:**  
- `codeql-results.sarif` (SARIF report)

---

## 📦 2. Dependency Scanning

- **🔧 Tool:** Trivy

Trivy scans your project for vulnerabilities in open-source dependencies listed in:
- `package.json`
- `yarn.lock`

**Output:**  
- `trivy-results.json` (JSON report)

---

## 🧹 3. Code Linting with Security Rules

- **🔧 Tool:** ESLint  
- **🔒 Plugins:**
  - `eslint-plugin-security`
  - `eslint-plugin-node`

This ensures secure JavaScript/TypeScript coding practices and identifies potential issues with:
- Node.js APIs
- Common JS misuses
- Insecure code patterns

**Output:**  
- `eslint-results.json`

---

## 🔐 4. Secret Scanning

- **🔧 Tool:** Gitleaks

Gitleaks scans for secrets like:
- API keys
- Access tokens
- Passwords in source files or history

**Output Includes:**  
- Rule ID  
- Commit ID  
- File and line number  
- Author and timestamp

---

## 🐳 5. Container Image Scanning

- **🔧 Tool:** Trivy

After building the Docker image, Trivy scans it for vulnerabilities in:
- Operating system layers
- Application dependencies

**Output:**  
- `trivy-report.json`

---

## 🗂 Artifacts Uploaded

Each tool’s results are uploaded as downloadable artifacts:
- `eslint-results.json`
- `trivy-results.json`
- `trivy-report.json`
- `codeql-results.sarif`

---

## 🚀 When Does the Pipeline Run?

The workflow triggers:
- On push to `main` or `security-checks`
- On pull request to `main`
- Manually via GitHub Actions

---

## 📌 Requirements for Local Testing

To test these tools locally, use the following commands:

```bash
# Install dependencies
npm install

# Run ESLint
npx eslint . --ext .js,.jsx,.ts,.tsx

# Install and run Trivy
sudo apt-get install wget gnupg -y
wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | gpg --dearmor | sudo tee /usr/share/keyrings/trivy.gpg > /dev/null
echo "deb [signed-by=/usr/share/keyrings/trivy.gpg] https://aquasecurity.github.io/trivy-repo/deb generic main" | sudo tee /etc/apt/sources.list.d/trivy.list
sudo apt-get update
sudo apt-get install trivy -y
trivy fs .

# Run Gitleaks
gitleaks detect --source=. --report-format=json
