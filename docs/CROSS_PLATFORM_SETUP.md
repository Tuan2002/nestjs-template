# Cross-Platform Development Setup

This document provides setup instructions for developers using different operating systems.

## 🖥️ Windows Setup

### Prerequisites

1. **Node.js** (v18 or higher)

   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version`

2. **Git**

   - Download from [git-scm.com](https://git-scm.com/)
   - **Important**: During installation, select "Git Bash Here" option
   - Verify installation: `git --version`

3. **Package Manager**
   - We use `pnpm` for this project
   - Install: `npm install -g pnpm`
   - Verify: `pnpm --version`

### Development Environment Options

#### Option 1: Git Bash (Recommended)

- Most compatible with Unix-style commands
- Comes with Git for Windows
- Supports ANSI colors and emojis
- Most Husky hooks work out of the box

#### Option 2: PowerShell

- Native Windows terminal
- May require additional configuration for some commands
- Our Node.js scripts work perfectly here

#### Option 3: WSL2 (Windows Subsystem for Linux)

- Full Linux compatibility
- Best option for complex development workflows
- Requires Windows 10/11

### Project Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd cryptoishtar-backend
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up Husky hooks**

   ```bash
   pnpm run prepare
   ```

4. **Validate setup**

   ```bash
   # Cross-platform validation script
   node scripts/validate-husky.js

   # Or use npm script
   pnpm run validate-husky
   ```

### Windows-Specific Considerations

#### Terminal Compatibility

- ✅ **Node.js scripts**: Work in all terminals (PowerShell, CMD, Git Bash)
- ✅ **Security checks**: Use Node.js version for cross-platform compatibility
- ✅ **Git hooks**: Configured to work with Git for Windows
- ✅ **PowerShell alternative**: `scripts/security-check.ps1` available for native PowerShell users

#### Script Execution Options

```bash
# Option 1: Node.js (Recommended - used in Git hooks)
node scripts/security-check.js

# Option 2: PowerShell (Windows native)
.\scripts\security-check.ps1

# Option 3: Bash (Git Bash)
bash scripts/security-check.sh
```

#### Path Handling

- Our scripts automatically handle Windows vs Unix path separators
- No manual configuration required

#### Line Endings

- Git automatically handles CRLF/LF conversion
- Ensure your editor is configured for consistent line endings

#### PowerShell Execution Policy

If you encounter execution policy errors:

```powershell
# Check current policy
Get-ExecutionPolicy

# Allow local scripts (run as Administrator)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

## 🍎 macOS Setup

### Prerequisites

1. **Node.js** (v18 or higher)

   ```bash
   # Using Homebrew (recommended)
   brew install node

   # Or download from nodejs.org
   ```

2. **Git** (usually pre-installed)

   ```bash
   # Verify or install via Homebrew
   brew install git
   ```

3. **Package Manager**
   ```bash
   npm install -g pnpm
   ```

### Project Setup

Same as Windows setup above.

## 🐧 Linux Setup

### Prerequisites

1. **Node.js**

   ```bash
   # Ubuntu/Debian
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # Fedora/CentOS
   sudo dnf install nodejs npm
   ```

2. **Git**

   ```bash
   # Ubuntu/Debian
   sudo apt-get install git

   # Fedora/CentOS
   sudo dnf install git
   ```

3. **Package Manager**
   ```bash
   npm install -g pnpm
   ```

### Project Setup

Same as Windows setup above.

## 🔧 Available Scripts

All scripts are cross-platform compatible:

```bash
# Development
pnpm run start:dev          # Start development server
pnpm run build              # Build for production
pnpm run test               # Run tests
pnpm run test:cov           # Run tests with coverage

# Code Quality
pnpm run lint:check         # Check linting
pnpm run format:check       # Check formatting
pnpm run type-check         # TypeScript type checking
pnpm run security-check     # Security vulnerability scan

# Git Hooks Management
pnpm run prepare            # Set up Husky hooks
node scripts/validate-husky.js  # Validate Husky setup
```

## 🔒 Security Checks

Our security checks are implemented in Node.js for maximum compatibility:

- **Cross-platform**: Works on Windows, macOS, and Linux
- **No external dependencies**: Uses built-in Node.js modules
- **Smart detection**: Automatically detects Git vs non-Git environments
- **Comprehensive scanning**: Checks for secrets, keys, and sensitive files

## 🎯 Git Hooks

### Pre-commit

- Runs ESLint and Prettier on staged files
- Performs TypeScript type checking
- Runs test coverage validation

### Commit Message

- Enforces conventional commit format
- Examples: `feat:`, `fix:`, `docs:`, `refactor:`

### Pre-push

- Runs comprehensive security checks
- Executes full test suite
- Blocks push if any issues are found

## 🚨 Troubleshooting

### Windows Issues

1. **"Command not found" errors**

   - Ensure you're using Git Bash or have proper PATH configuration
   - Try using PowerShell as Administrator
   - Verify Node.js is in your PATH: `node --version`

2. **Permission errors**

   - Run terminal as Administrator
   - Check antivirus software isn't blocking script execution
   - Set PowerShell execution policy: `Set-ExecutionPolicy RemoteSigned`

3. **CRLF line ending issues**

   ```bash
   git config core.autocrlf true
   ```

4. **Husky hooks not working**

   - Ensure Git for Windows is installed (not just GitHub Desktop)
   - Use Git Bash for best compatibility
   - Verify hooks are executable: `ls -la .husky/`

5. **Script execution in different terminals**

   ```bash
   # Git Bash (recommended)
   ./scripts/security-check.sh

   # PowerShell
   .\scripts\security-check.ps1

   # Node.js (works everywhere)
   node scripts/security-check.js
   ```

### All Platforms

1. **Husky hooks not running**

   ```bash
   # Reinstall Husky
   rm -rf .husky
   pnpm run prepare
   ```

2. **Security check false positives**

   - Check the specific patterns being flagged
   - Update `.gitignore` if needed
   - Contact team lead for whitelist additions

3. **Node.js version issues**

   ```bash
   # Check version
   node --version

   # Should be v18 or higher
   ```

## 📞 Support

If you encounter any platform-specific issues:

1. Check this documentation first
2. Try the troubleshooting section
3. Search existing issues in the repository
4. Contact the development team

## 🔄 Updates

This setup is regularly tested on:

- ✅ Windows 10/11 (PowerShell, Git Bash, WSL2)
- ✅ macOS (Monterey+)
- ✅ Ubuntu 20.04+ LTS
- ✅ GitHub Actions (CI/CD)
