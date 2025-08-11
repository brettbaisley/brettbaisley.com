# Brett Baisley Personal Website

Brett Baisley's personal website is an Astro static site generator project with TailwindCSS for styling, Azure Functions for backend API functionality, and Playwright for monitoring. The site is deployed to Azure Static Web Apps.

**Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Prerequisites and Installation
- Node.js v20+ and npm are required
- Install main project dependencies: `npm install` (takes ~45 seconds)
- Install API dependencies: `cd api && npm install` (takes ~5 seconds)
- For testing: `npm install playwright @playwright/test` (takes ~3 seconds)
- Browser installation: `npx playwright install chromium` (may fail in CI environments due to download issues - document this limitation)

### Building and Running
- **Build the site**: `npm run build` - takes ~4 seconds. NEVER CANCEL. Set timeout to 30+ seconds for safety.
- **Development server**: `npm run dev` - starts in ~400ms, serves at http://localhost:4321/
- **Preview build**: `npm run preview` - serves built site, typically at http://localhost:4322/ if 4321 is in use
- **Astro commands**: `npm run astro [command]` or `npx astro [command]`

### API Development
- **Azure Functions**: Located in `api/` directory
- **Start API locally**: `cd api && npm start` (requires Azure Functions Core Tools)
- **API endpoints**: 
  - `/api/sendemail` - POST endpoint for contact form submissions
  - `/api/hello` - GET endpoint for testing
  - `/api/goodbye` - GET endpoint for testing

### Testing
- **Playwright tests**: `npx playwright test` - runs monitoring tests
- **Manual validation**: ALWAYS test the contact form after making changes:
  1. Start dev server: `npm run dev`
  2. Navigate to http://localhost:4321/
  3. Fill out contact form with test data
  4. Verify form submission works (though email sending requires Azure credentials)
- **NEVER CANCEL** Playwright browser downloads - they may take 10+ minutes and can fail in restricted environments

## Validation Requirements

### Critical User Scenarios
**ALWAYS test these scenarios after making changes:**

1. **Homepage loads correctly**:
   - Start `npm run dev`
   - Verify page loads at http://localhost:4321/
   - Check that title shows "Brett Baisley"
   - Verify all sections render properly (Hero, Experience, Skills, etc.)

2. **Contact form functionality**:
   - Navigate to contact form section
   - Fill in: Name, Email, Message fields
   - Click "Send Message" button
   - Note: Full email functionality requires Azure credentials, but form should submit without errors

3. **Build and preview workflow**:
   - Run `npm run build` (should complete in ~4 seconds)
   - Run `npm run preview` to test built site
   - Verify all pages accessible: `/`, `/westjet`, `/404`

### Build Pipeline Validation
- **Azure Static Web Apps deployment**: Automatically triggered on push to main branch
- **Weekly monitoring**: Playwright tests run automatically Monday/Friday at 11 AM UTC
- **Manual testing**: Use `npx playwright test` to run the monitoring scenarios locally

## Common Tasks and File Locations

### Key Project Structure
```
├── src/
│   ├── components/       # Astro components (Hero, Contact, Footer, etc.)
│   ├── layouts/         # Base layout templates
│   ├── pages/           # Routes (index.astro, westjet.astro, 404.astro)
│   ├── styles/          # CSS and styling
│   └── images/          # Static images
├── api/
│   ├── src/functions/   # Azure Functions (sendEmail.js, hello.js, goodbye.js)
│   └── package.json     # API dependencies
├── tests/               # Playwright test files
├── public/              # Static assets
├── dist/                # Build output (generated)
└── .github/workflows/   # CI/CD pipelines
```

### Frequently Modified Files
- `src/pages/index.astro` - Main homepage
- `src/components/Contact.astro` - Contact form component
- `api/src/functions/sendEmail.js` - Email sending functionality
- `tests/weekly-monitor.spec.js` - Monitoring tests

### Configuration Files
- `package.json` - Main project dependencies and scripts
- `astro.config.mjs` - Astro configuration with TailwindCSS
- `tsconfig.json` - TypeScript configuration
- `.github/workflows/` - Azure deployment and monitoring workflows

## Troubleshooting

### Common Issues and Solutions
1. **"Port 4321 is in use"**: Astro automatically finds next available port
2. **Playwright browser install fails**: Common in CI environments - document as known limitation
3. **API functions not working locally**: Requires Azure Functions Core Tools (`npm install -g azure-functions-core-tools@4`)
4. **Build errors with images**: Check `src/images/` directory and Astro image optimization

### Time Expectations (NEVER CANCEL)
- `npm install`: 45 seconds maximum, set timeout to 120+ seconds
- `npm run build`: 4 seconds typical, set timeout to 30+ seconds  
- `npm run dev`: Starts in <1 second, set timeout to 15+ seconds
- `npx playwright install`: 10+ minutes, may fail in restricted environments
- `npx playwright test`: 30+ seconds for full suite, set timeout to 120+ seconds

### Development Workflow
1. Always run `npm install` first in a fresh environment
2. Test changes with `npm run dev` before building
3. Run `npm run build` to verify production build works
4. Test contact form functionality manually for any UI changes
5. If modifying API functions, test locally with Azure Functions Core Tools

### Deployment Notes
- **Production site**: https://brettbaisley.com
- **Automatic deployment**: Triggered on push to main branch via Azure Static Web Apps
- **API deployment**: Azure Functions automatically deployed with static site
- **Monitoring**: Weekly Playwright tests ensure site health

## Dependencies and Ecosystem

### Core Technologies
- **Astro v5.12.9**: Static site generator
- **TailwindCSS v4.1.11**: Utility-first CSS framework
- **Azure Functions v4**: Serverless backend API
- **Playwright**: End-to-end testing and monitoring

### VS Code Configuration
- Recommended extensions: Azure Functions, Python
- Azure Functions settings configured for JavaScript runtime v4
- Debug configuration available in `.vscode/launch.json`

### CI/CD Pipeline
- **Azure Static Web Apps**: Handles build and deployment
- **GitHub Actions**: Weekly monitoring with Playwright
- **Build output**: Static files to `/dist`, API functions auto-deployed

**Always validate changes by running the complete development workflow: install, build, dev server, and manual testing before committing.**