# Educent Pro Platform

![Educent Pro](https://imgix.cosmicjs.com/d7737ff0-ba56-11f0-acea-b11c5ee9e1b0-photo-1519452575417-564c1401ecc0-1762361473384.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A comprehensive multi-tenant institute management platform with role-based dashboards, real-time attendance tracking, and reward management system powered by [Cosmic](https://www.cosmicjs.com).

## ✨ Features

- 🏫 **Multi-Tenant Architecture** - Complete tenant isolation for multiple institutes
- 👥 **Role-Based Access Control** - Separate dashboards for Students, Parents, Lecturers, Principals, and Admin
- ✅ **Attendance Management** - QR code and manual attendance marking with real-time updates
- 🏆 **Reward System** - Automated eligibility based on 60-day attendance streaks
- 📊 **Analytics Dashboard** - Comprehensive metrics and insights for administrators
- 📱 **Mobile-First Design** - Fully responsive interface optimized for all devices
- 🔒 **Secure Authentication** - Role-aware token-based authentication
- 📝 **Audit Trail** - Complete logging of all system actions

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=690b62c2fb7423bbdde4ac23&clone_repository=690b679efb7423bbdde4ac9c)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Build Educent Pro: a multi-tenant institute management platform with a separate Admin HQ and per-campus Institute App. Requirements: strict hierarchical RBAC, realtime synchronization, deterministic attendance-based reward flow (spin wheel), immutable audit trails, accessible mobile-first UI, and full CI/CD and testing — delivered as a production-ready monorepo."

### Code Generation Prompt

> "Based on the content model I created for [Educent Pro specifications], now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🚀 Technologies

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **CMS**: [Cosmic](https://www.cosmicjs.com/docs)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **QR Code**: [react-qr-code](https://www.npmjs.com/package/react-qr-code)
- **Deployment**: Vercel/Netlify ready

## 🛠 Getting Started

### Prerequisites

- Node.js 18.x or later
- Bun package manager
- Cosmic account with configured bucket

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd educent-pro
```

2. Install dependencies
```bash
bun install
```

3. Set up environment variables
```bash
# Create .env.local file
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run development server
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📚 Cosmic SDK Examples

### Fetching Tenants
```typescript
const { objects: tenants } = await cosmic.objects
  .find({ type: 'tenants' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Attendance Records
```typescript
const { objects: records } = await cosmic.objects
  .find({ 
    type: 'attendance-records',
    'metadata.tenant': tenantId 
  })
  .props(['id', 'title', 'metadata'])
  .depth(2)
```

### Creating Audit Log
```typescript
await cosmic.objects.insertOne({
  type: 'audit-logs',
  title: 'User Login',
  metadata: {
    action: 'login',
    user: userId,
    tenant: tenantId,
    timestamp: new Date().toISOString()
  }
})
```

## 🎯 Cosmic CMS Integration

This application integrates with 8 Cosmic object types:

1. **Tenants** - Educational institutes with settings and configuration
2. **Users** - All system users with role-based permissions
3. **Students** - Student profiles linked to users and classes
4. **Classes** - Class sections with teachers and schedules
5. **Attendance Records** - Daily attendance data per class
6. **Reward Records** - Student reward requests and approvals
7. **Audit Logs** - System-wide action logging
8. **Notices** - Announcements and notifications

The app leverages Cosmic's powerful features:
- **Object Relationships** - Deep linking between entities
- **Metafields** - Rich data structures for complex requirements
- **Real-time Updates** - Live data synchronization
- **File Management** - Profile pictures and document storage

## 🚀 Deployment Options

### Deploy to Vercel

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy with one click

### Deploy to Netlify

1. Connect repository to Netlify
2. Configure build settings:
   - Build command: `bun run build`
   - Publish directory: `.next`
3. Add environment variables
4. Deploy

### Environment Variables

Required for all deployments:
- `COSMIC_BUCKET_SLUG` - Your Cosmic bucket identifier
- `COSMIC_READ_KEY` - Read access key
- `COSMIC_WRITE_KEY` - Write access key

---

Built with ❤️ using [Cosmic](https://www.cosmicjs.com)
<!-- README_END -->