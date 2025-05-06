# 🔐 DevSecOps Pipeline for Your Repository

This project integrates a comprehensive GitHub Actions–based DevSecOps pipeline to ensure secure coding practices, dependency management, and container security.

The implementations focus on preventing and identifying security vulnerabilities, also helping to detect secrets used, resolve dependency issues, and improve processes aligned with standard security guidelines, resulting in smoother development.

---

## ✅ Pipeline Overview

The pipeline is triggered automatically on:
- Push events to `main` or `security-checks` branches.
- Pull requests targeting the `main` branch.
- Manual dispatch via GitHub Actions.

---
## Pipeline Summary
![image](https://github.com/user-attachments/assets/fd102344-70a8-485a-8260-cb9972f24d13)

## Pipeline Artifacts
![image](https://github.com/user-attachments/assets/583f9415-229d-43cd-8b5f-d20782cde41c)

---

## 🧭 Features Overview

| **Security Check Type**            | **Tool Used**         | **Description**                                                                 |
|------------------------------------|-----------------------|---------------------------------------------------------------------------------|
| **Static Application Security Testing (SAST)** | CodeQL                | Identifies vulnerabilities like SQLi, XSS, and other coding flaws.             |
| **Dependency Scanning**            | Trivy (Filesystem)    | Scans project dependencies for known vulnerabilities.                          |
| **Code Linting with Security Rules** | ESLint                | Enforces secure JavaScript/TypeScript coding standards.                        |
| **Secret Scanning**                | Gitleaks              | Detects hardcoded secrets such as API keys and tokens.                         |
| **Container Image Scanning**       | Trivy (Image)         | Scans Docker images for OS and library vulnerabilities.                        |

---

## ⚙️ Configuration Details for Each Tool

### 1. **Static Application Security Testing (SAST)**
- **Tool:** CodeQL  
- **Configuration:**  
  - Language: `JavaScript`
  - SARIF report generated at `.github/codeql/codeql-results.sarif`
- **Why Chosen:**  
  CodeQL provides deep analysis of source code to detect vulnerabilities like SQL injection, XSS, and other common security flaws. It integrates seamlessly with GitHub Actions.
- **Interpreting Results:**  
  The SARIF report contains detailed information about detected vulnerabilities, including severity, location in the code, and remediation suggestions.

---

### 2. **Dependency Scanning**
- **Tool:** Trivy (Filesystem)  
- **Configuration:**  
  - Scans `package.json` and `yarn.lock` for library vulnerabilities.
  - Output: `trivy-results.json` (JSON format).
- **Why Chosen:**  
  Trivy is lightweight, fast, and supports scanning for known CVEs in open-source dependencies.
- **Interpreting Results:**  
  The JSON report lists vulnerabilities by severity (e.g., CRITICAL, HIGH), affected packages, and remediation steps.

---

### 3. **Code Linting with Security Rules**
- **Tool:** ESLint  
- **Configuration:**  
  - Plugins: `eslint-plugin-security`, `eslint-plugin-node`
  - Output: `eslint-results.json`
- **Why Chosen:**  
  ESLint enforces secure coding practices and identifies potential issues in JavaScript/TypeScript code, such as unsafe Node.js APIs or insecure patterns.
- **Interpreting Results:**  
  The JSON report highlights linting errors and warnings, including security-related issues, with file and line numbers.

---

### 4. **Secret Scanning**
- **Tool:** Gitleaks  
- **Configuration:**  
  - Custom configuration file: `.gitleaks.toml`
  - Output: `gitleaks-results.json`
- **Why Chosen:**  
  Gitleaks is effective at detecting hardcoded secrets (e.g., API keys, tokens) in source code and commit history.
- **Interpreting Results:**  
  The JSON report includes details such as the type of secret, file location, and commit ID. Secrets are redacted in the output for security.

---

### 5. **Container Image Scanning**
- **Tool:** Trivy (Image)  
- **Configuration:**  
  - Scans Docker images for OS and library vulnerabilities.
  - Output: `trivy-report.json`
- **Why Chosen:**  
  Trivy provides comprehensive scanning for container images, ensuring the base image and application dependencies are secure.
- **Interpreting Results:**  
  The JSON report lists vulnerabilities by severity, affected layers, and suggested fixes.

---

## 🛠️ Custom Rules or Configurations

1. **CodeQL**:  
   - Custom queries can be added to enhance detection capabilities.  
   - Current configuration uses default JavaScript rules.

2. **Gitleaks**:  
   - `.gitleaks.toml` includes custom regex patterns to detect organization-specific secrets.

3. **ESLint**:  
   - Security-focused plugins (`eslint-plugin-security`, `eslint-plugin-node`) are added to enforce secure coding practices.

---

## 📊 How to Interpret the Results

1. **CodeQL**:  
   - Review the SARIF report for detected vulnerabilities.  
   - Focus on HIGH and CRITICAL severity issues.  
   - Follow remediation steps provided in the report.

2. **Trivy (Filesystem)**:  
   - Check `trivy-results.json` for dependency vulnerabilities.  
   - Update affected packages to patched versions.

3. **ESLint**:  
   - Review `eslint-results.json` for linting errors and warnings.  
   - Fix issues flagged as security risks.

4. **Gitleaks**:  
   - Inspect `gitleaks-results.json` for detected secrets.  
   - Rotate exposed secrets and remove them from the codebase.

5. **Trivy (Image)**:  
   - Analyze `trivy-report.json` for container vulnerabilities.  
   - Update the base image or dependencies to secure versions.

---

## 🚀 When Does the Pipeline Run?

The workflow triggers:
- On push to `main` or `security-checks`
- On pull request to `main`
- Manually via GitHub Actions

---

## 📌 Requirements for Local Testing

If you want to test these tools locally:

```bash
# Install dependencies
npm install

# Run ESLint
npx eslint . --ext .js,.jsx,.ts,.tsx

# Install and run Trivy
sudo apt-get install wget gnupg
wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | gpg --dearmor | sudo tee /usr/share/keyrings/trivy.gpg > /dev/null
echo "deb [signed-by=/usr/share/keyrings/trivy.gpg] https://aquasecurity.github.io/trivy-repo/deb generic main" | sudo tee -a /etc/apt/sources.list.d/trivy.list
sudo apt-get update
sudo apt-get install trivy -y
trivy fs .

# Run Gitleaks
gitleaks detect --source=. --report-format=json
