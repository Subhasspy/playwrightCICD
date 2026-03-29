# Playwright E2E Testing Portfolio Project

A comprehensive end-to-end testing portfolio project demonstrating advanced Playwright skills, including page object models, custom fixtures, API testing, and CI/CD integration.

## 🚀 Features

- **Complex Test Website**: Multi-page web application with forms, dynamic content, and API interactions
- **Page Object Model**: Well-structured page classes with clear naming conventions
- **Custom Fixtures**: Reusable test setup and data management
- **API Testing**: Backend API validation and mocking capabilities
- **Cross-Browser Testing**: Automated tests across Chromium, Firefox, and WebKit
- **CI/CD Ready**: GitHub Actions workflow for automated testing
- **Comprehensive Documentation**: Inline comments and guides for best practices

## 🏗️ Project Structure

```
├── src/                    # Test website source code
│   ├── server.js          # Express.js backend server
│   └── public/            # Frontend assets
│       ├── index.html     # Home page
│       ├── login.html     # Login page
│       ├── dashboard.html # Dashboard with dynamic content
│       ├── forms.html     # Form testing page
│       ├── api-demo.html  # API interaction demo
│       ├── styles.css     # CSS styles
│       └── script.js      # Client-side JavaScript
├── tests/                 # Test files
│   ├── pages/            # Page object classes
│   │   ├── HomePage.ts
│   │   ├── LoginPage.ts
│   │   ├── DashboardPage.ts
│   │   ├── FormsPage.ts
│   │   └── ApiDemoPage.ts
│   ├── fixtures/         # Test fixtures and data
│   │   ├── customFixtures.ts
│   │   └── testData.ts
│   ├── utils/            # Helper utilities
│   │   ├── apiHelpers.ts
│   │   └── testHelpers.ts
│   ├── *.spec.ts         # Test specification files
├── playwright.config.ts  # Playwright configuration
├── package.json          # Project dependencies
└── README.md            # This file
```

## 🛠️ Setup and Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/playwright-e2e-portfolio.git
   cd playwright-e2e-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the test website**
   ```bash
   npm start
   ```
   The website will be available at `http://localhost:3001`

4. **Run the tests**
   ```bash
   # Run all tests
   npm test

   # Run tests in headed mode (visible browser)
   npm run test:headed

   # Run tests with UI mode
   npm run test:ui
   ```

## 📋 Test Coverage

### Home Page Tests
- Page loading and navigation
- Interactive counter functionality
- CTA button navigation
- Feature section verification

### Login Page Tests
- Form validation and submission
- Authentication success/failure scenarios
- Error message handling
- Navigation after login

### Dashboard Page Tests
- Dynamic data loading
- UI state management
- Theme toggling
- Notification system

### Forms Page Tests
- Form field interactions
- Data submission and validation
- File upload simulation
- Form state persistence

### API Demo Page Tests
- API data fetching
- Error handling
- Real-time updates
- Concurrent API operations

## 🏃‍♂️ Running Tests

### Basic Commands

```bash
# Run all tests
npm test

# Run specific test file
npx playwright test tests/homePage.spec.ts

# Run tests in a specific browser
npx playwright test --project=chromium

# Run tests with debugging
npx playwright test --debug

# Generate and view HTML report
npx playwright show-report
```

### Test Configuration

The project uses the following Playwright configuration:
- **Browsers**: Chromium, Firefox, WebKit
- **Parallel Execution**: 8 workers
- **Retries**: 2 on CI, 0 locally
- **Timeouts**: 10s action timeout, 30s navigation timeout
- **Artifacts**: Screenshots on failure, videos on retry, traces

## 📚 Best Practices Demonstrated

### 1. Page Object Model
- Clear separation of concerns
- Reusable page methods
- Consistent naming conventions (camelCase)
- TypeScript for better IDE support

### 2. Test Organization
- Logical grouping with `describe` blocks
- Before/after hooks for setup
- Data-driven testing with fixtures
- Parallel test execution

### 3. Fixtures and Data Management
- Custom fixtures for page objects
- Centralized test data
- Environment-specific configuration
- Reusable helper functions

### 4. Error Handling and Debugging
- Comprehensive assertions
- Screenshot and video capture
- Trace collection for debugging
- Proper error messages

### 5. CI/CD Integration
- GitHub Actions workflow
- Automated test execution
- Artifact collection
- Status badges

## 🔧 Development Guidelines

### Naming Conventions
- **Files**: kebab-case (e.g., `home-page.spec.ts`)
- **Classes**: PascalCase (e.g., `HomePage`)
- **Methods/Variables**: camelCase (e.g., `clickCtaButton()`)
- **Test Descriptions**: Clear, descriptive sentences

### Code Structure
- One page object class per page/component
- Separate test data from test logic
- Use fixtures for common setup
- Keep tests focused and atomic

### Writing Tests
```typescript
test.describe('Feature Name', () => {
  test.beforeEach(async ({ pageObject }) => {
    await pageObject.goto();
  });

  test('should perform specific action', async ({ pageObject }) => {
    // Arrange
    await pageObject.setupInitialState();

    // Act
    await pageObject.performAction();

    // Assert
    await expect(pageObject.resultElement).toHaveText('Expected Result');
  });
});
```

## 🚀 CI/CD

This project includes GitHub Actions workflow for automated testing:

- Runs on every push and pull request
- Tests across all configured browsers
- Generates test reports and artifacts
- Provides status checks

## 📊 Test Results

After running tests, view the HTML report:
```bash
npx playwright show-report
```

The report includes:
- Test execution summary
- Screenshots for failed tests
- Video recordings
- Trace files for debugging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Write tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

For questions or feedback about this portfolio project, please open an issue on GitHub.

---

**Note**: This project is designed to showcase E2E testing skills and may not represent a production-ready application. The test website includes simulated delays and error conditions for testing purposes.