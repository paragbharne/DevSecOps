# 🛡 GitHub Advanced Security (GHAS) Integration

---

## 📌 1. Purpose

Security is a critical aspect of modern software development. By integrating GitHub Advanced Security (GHAS) into our DevSecOps pipeline, we aim to identify and mitigate security vulnerabilities early in the development lifecycle. This ensures secure coding practices, dependency hygiene, and secret management.

This documentation outlines the integration of GHAS into a sample Node.js project with the following security goals:

- **Code Scanning** using GitHub’s CodeQL.
- **Dependency Scanning** with Dependabot.
- **Secret Detection** for hardcoded credentials (e.g., API keys, tokens).
- **Centralized Security Alerts** for actionable insights.

---

## 🔬 2. Integration

### 🔧 Tooling Selected:
1. **CodeQL**: A static code analysis engine that identifies vulnerabilities in JavaScript/TypeScript code.
2. **Dependabot**: Scans `package.json` and `yarn.lock` for vulnerable dependencies.
3. **GitHub Secret Scanning**: Detects hardcoded secrets like API keys, passwords, and tokens.

### 🧪 Setting and configuration:
1. **Repository Creation**:
   - Created a GitHub repository for a sample Node.js application.
   - Pushed intentionally vulnerable code to test the integration.

2. **Code Scanning**:
   - Added `.github/workflows/codeql.yml` to enable automatic code scanning.
   - Configured CodeQL to scan JavaScript/TypeScript files.

3. **Dependency Scanning**:
   - Added `.github/dependabot.yml` to enable daily scans for:
     - Node.js dependencies (`npm`).
     - Docker base images.

4. **Secret Detection**:
   - Tested by pushing a commit with a hardcoded API key.
   - GitHub immediately flagged the secret and triggered an alert.

---

## 📷 Result / Outcomes:

1. **Dependabot Alerts**:
   - Shows detected CVEs in `package.json` and `yarn.lock`.

2. **CodeQL Scan Results**:
   - Lists vulnerabilities in the source code, such as unsafe patterns and hardcoded strings.

3. **Secret Scanning Alert**:
   - Flags hardcoded API keys and prevents them from being pushed.

4. **Security Dashboard**:
   - Provides a centralized view of all security alerts and their statuses.

![alt text](image.png)

![alt text](image-1.png)

![alt text](image-2.png)

![alt text](image-3.png)

---

## 📊 3.Analysis

### ✅ Benefits:
1. **Shift-Left Security**:
   - Vulnerabilities are detected at the commit or pull request stage, reducing the risk of introducing issues into production.

2. **Automated Scanning**:
   - CodeQL, Dependabot, and Secret Scanning run automatically on every push, pull request, and schedule.

3. **Centralized Insights**:
   - All security alerts are visible in the GitHub Security Dashboard, making it easy to track and resolve issues.

4. **Reduced Risk**:
   - Early detection of secrets and CVEs prevents credential leaks and supply chain attacks.

5. **Low Overhead**:
   - Native integration with GitHub Actions eliminates the need for additional tools or agents.

### ⚠️ Advantages:
1. **CI/CD Overhead**:
   - CodeQL scans may add 30–60 seconds to CI jobs, depending on the project size.

2. **False Positives**:
   - Some security warnings may require manual triage to determine their relevance.

3. **Strict Secret Detection**:
   - Even test keys are flagged, requiring careful handling of test credentials.

---

## ✅ 4. Conclusion

After enabling GHAS and configuring the pipeline:

1. **Code Scanning**:
   - CodeQL detected several vulnerabilities, including unsafe patterns and hardcoded strings.

2. **Dependency Scanning**:
   - Dependabot flagged multiple outdated and vulnerable packages in `package.json`.

3. **Secret Detection**:
   - GitHub blocked a test commit containing an API key and triggered an alert.

4. **Security Dashboard**:
   - Provided a centralized view of all security issues, making it easy to prioritize and resolve them.

This integration demonstrates the effectiveness of GHAS in enforcing security best practices and reducing risks in real-time.

