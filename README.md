## Description
A NestJS application template with a comprehensive development workflow, including testing, linting, formatting, and cross-platform compatibility.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov

# watch mode
$ pnpm run test:watch
```

## Development Workflow

This project uses **Husky** for Git hooks to ensure code quality and consistency across all platforms.

### 🌍 Cross-Platform Compatibility

Our development setup works seamlessly on:

- ✅ **Windows** (PowerShell, Git Bash, WSL2)
- ✅ **macOS** (Terminal, iTerm2)
- ✅ **Linux** (bash, zsh)

For platform-specific setup instructions, see [Cross-Platform Setup Guide](docs/CROSS_PLATFORM_SETUP.md).

### Code Quality Tools

```bash
# Lint and fix code
$ pnpm run lint

# Check linting without fixing
$ pnpm run lint:check

# Format code
$ pnpm run format

# Check formatting without fixing
$ pnpm run format:check

# Type checking
$ pnpm run type-check
```

### Commit Message Format

This project follows conventional commit format:

```
<type>[optional scope]: <description>

Examples:
- feat: add user authentication
- fix(api): resolve CORS issue
- docs: update README
- test: add unit tests for user service
```

**Types**: feat, fix, docs, style, refactor, perf, test, chore, ci, build, revert

## License

This project is [MIT licensed](LICENSE).
