# Windows Development Guide

This guide provides specific instructions for Windows developers working on the CryptoIshtar Backend project.

## ✅ Windows Compatibility Status

Our development environment is **fully compatible** with Windows. All scripts and tools work across:

- **Windows 10/11** ✅
- **PowerShell** ✅
- **Command Prompt** ✅
- **Git Bash** ✅ (Recommended)
- **WSL2** ✅

## 🚀 Quick Setup (Windows)

### Option 1: Automated Setup

Run the setup script:

```cmd
scripts\setup-windows.bat
```

### Option 2: Manual Setup

```powershell
# 1. Install dependencies
pnpm install

# 2. Set up Git hooks
pnpm run prepare

# 3. Validate setup
pnpm run validate-husky
```

## 🔧 Script Compatibility

### Security Checks

```powershell
# Method 1: Node.js (Recommended - cross-platform)
node scripts/security-check.js

# Method 2: PowerShell native
.\scripts\security-check.ps1

# Method 3: Git Bash
bash scripts/security-check.sh

# Method 4: npm script (works everywhere)
pnpm run security-check
```

### Validation

```powershell
# Cross-platform validation
node scripts/validate-husky.js

# Or via npm
pnpm run validate-husky
```

## 🎯 Git Hooks on Windows

### How It Works

- **Husky** automatically installs Git hooks during `pnpm install`
- All hooks use **Node.js scripts** for maximum compatibility
- No bash dependencies required for core functionality

### Hook Execution

```bash
# Pre-commit (runs automatically)
- ESLint check and fix
- Prettier formatting
- TypeScript type checking
- Test coverage validation

# Commit-msg (runs automatically)
- Validates conventional commit format
- Examples: "feat:", "fix:", "docs:"

# Pre-push (runs automatically)
- Comprehensive security scan
- Full test suite execution
- Blocks push if issues found
```

## 🐛 Windows-Specific Troubleshooting

### Common Issues

#### 1. PowerShell Execution Policy

**Problem**: `cannot be loaded because running scripts is disabled`

**Solution**:

```powershell
# Check current policy
Get-ExecutionPolicy

# Set policy for current user (recommended)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# Or for all users (requires admin)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned
```

#### 2. Git Hooks Not Working

**Problem**: Hooks don't execute or show permission errors

**Solutions**:

```bash
# Ensure you have Git for Windows (not just GitHub Desktop)
git --version

# Reinstall hooks
rm -rf .husky
pnpm run prepare

# Check hook permissions (in Git Bash)
ls -la .husky/
```

#### 3. Path Issues

**Problem**: Commands not found

**Solutions**:

```powershell
# Verify Node.js is in PATH
node --version

# Verify Git is in PATH
git --version

# Add to PATH if needed (Control Panel > System > Environment Variables)
```

#### 4. Line Ending Issues

**Problem**: Git complains about line endings

**Solution**:

```bash
# Configure Git to handle line endings automatically
git config --global core.autocrlf true
```

### Terminal Recommendations

#### ✅ Git Bash (Highly Recommended)

- Comes with Git for Windows
- Best Unix compatibility
- All scripts work perfectly
- Supports colors and emojis

#### ✅ PowerShell

- Native Windows terminal
- Our PowerShell scripts available
- Good for Windows-specific tasks

#### ⚠️ Command Prompt

- Basic functionality works
- Limited color support
- Use PowerShell instead if possible

#### ✅ Windows Terminal

- Modern terminal with tabs
- Works with PowerShell, CMD, Git Bash
- Excellent emoji and color support

## 🔒 Security Features

### Automatic Detection

Our security system detects:

- ✅ Environment files (`.env`) in repository
- ✅ Hardcoded API keys and secrets
- ✅ AWS credentials
- ✅ Private keys and certificates
- ✅ Database connection strings with passwords

### Windows-Specific Patterns

```powershell
# Also detects Windows-specific paths
$env:USERPROFILE\.aws\credentials
$env:APPDATA\secrets\*
```

## 📦 Package Management

### pnpm on Windows

```powershell
# Install pnpm globally
npm install -g pnpm

# Verify installation
pnpm --version

# Update pnpm
pnpm add -g pnpm
```

### Alternative: npm

If you prefer npm over pnpm:

```powershell
# Replace pnpm commands with npm
npm install     # instead of pnpm install
npm run test    # instead of pnpm run test
npm run start   # instead of pnpm run start
```

## 🧪 Testing

### Running Tests

```powershell
# All tests
pnpm test

# Specific test files
pnpm test announcement

# With coverage
pnpm run test:cov

# Watch mode
pnpm run test:watch
```

### Test Output

- ✅ **Colors**: Supported in modern terminals
- ✅ **Progress bars**: Work in PowerShell and Git Bash
- ✅ **Coverage reports**: Generated in `coverage/` folder

## 🔄 CI/CD Considerations

### GitHub Actions

Our setup works seamlessly with GitHub Actions:

```yaml
# .github/workflows/ci.yml works on:
- windows-latest ✅
- macos-latest ✅
- ubuntu-latest ✅
```

### Local Testing

```powershell
# Test the same commands that run in CI
pnpm run lint:check
pnpm run type-check
pnpm run test
pnpm run security-check
```

## 📞 Support

### Getting Help

1. **Check this guide first**
2. **Try the troubleshooting section**
3. **Use the automated setup script**
4. **Contact the development team**

### Reporting Windows Issues

When reporting issues, please include:

- Windows version (10/11)
- Terminal used (PowerShell/Git Bash/CMD)
- Node.js version (`node --version`)
- Error messages (full output)

## 🎉 Success Indicators

Your setup is working correctly when:

- ✅ `pnpm run validate-husky` passes
- ✅ `pnpm run security-check` runs without errors
- ✅ `pnpm test` executes successfully
- ✅ Git hooks trigger on commit/push
- ✅ All scripts work in your preferred terminal

---

**Happy coding on Windows!** 🚀
