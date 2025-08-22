# Dynamic Form Generator - Frontend

A modern React frontend for the Dynamic Form Generator system that allows users to upload DOCX templates and generate dynamic forms for document creation.

## Features

- 📄 **Template Upload**: Upload DOCX files with placeholders
- 🔍 **Template Inspection**: Automatically detect form fields from templates
- 📝 **Dynamic Forms**: Generate interactive forms based on template placeholders
- 🎨 **Modern UI**: Clean, responsive design with dark/light mode
- 🌐 **Internationalization**: Support for English and Arabic
- 📱 **Mobile Responsive**: Works on all device sizes

## Technology Stack

- **React 18** with TypeScript
- **Vite** for fast development
- **TailwindCSS** for styling
- **React Router** for navigation
- **React Query** for state management
- **React Hook Form** for form handling
- **Framer Motion** for animations
- **i18next** for internationalization

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Backend API running (see DynamicFormGen-Backend)

### Installation

1. **Clone or download this frontend project**

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure environment**:
   ```bash
   # Copy .env file and update if needed
   cp .env .env.local
   ```
   Update `VITE_API_URL` to point to your backend server.

4. **Start development server**:
   ```bash
   npm run dev
   ```

5. **Open in browser**: http://localhost:5173

## Environment Variables

Create a `.env` file in the root directory:

```env
# Backend API URL
VITE_API_URL=http://localhost:4000/api

# Application Settings
VITE_APP_NAME=Dynamic Form Generator
VITE_APP_DESCRIPTION=Template Based Document Creation
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Project Structure

```
src/
├── app/                 # App configuration
│   ├── i18n.ts         # Internationalization setup
│   ├── main.tsx        # App entry point
│   └── router.tsx      # Route configuration
├── components/         # Reusable components
│   ├── forms/          # Form components
│   ├── layout/         # Layout components
│   └── ui/             # UI components
├── lib/                # Utilities and API
│   ├── api.ts          # API client setup
│   ├── queries.ts      # React Query hooks
│   └── utils.ts        # Helper functions
├── pages/              # Page components
│   ├── Home.tsx        # Landing page
│   ├── UploadInspect.tsx # Template upload
│   ├── RenderPage.tsx  # Document generation
│   └── Docs.tsx        # Documentation
└── styles/             # Global styles
    └── index.css       # Tailwind CSS
```

## Usage

1. **Upload Template**: Go to the upload page and select a DOCX file with placeholders
2. **Inspect Fields**: The system automatically detects form fields from your template
3. **Generate Form**: Fill out the dynamic form with your data
4. **Download Document**: Generate and download the completed document

## Placeholder Formats

The system supports multiple placeholder formats:

- **Simple**: `{variable}` or `{{variable}}`
- **Advanced**: `{{variable | type=text | required=true}}`
- **Examples**:
  - `{name}` - Simple text field
  - `{{email | type=email}}` - Email field
  - `{{salary | type=number | min=0}}` - Number field with validation

## Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Static Hosting

The `dist` folder can be deployed to any static hosting service like:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

### Environment Configuration

For production, update the environment variables:

```env
VITE_API_URL=https://your-backend-api.com/api
```

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure the backend CORS settings include your frontend URL
2. **API Connection**: Verify `VITE_API_URL` points to the correct backend
3. **Build Errors**: Clear `node_modules` and reinstall dependencies

### Development Tips

- Use browser DevTools to inspect API calls
- Check the Network tab for failed requests
- Enable React Query DevTools for state debugging

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT License - see LICENSE file for details