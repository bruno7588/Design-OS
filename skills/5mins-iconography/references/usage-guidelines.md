# Iconography Usage Guidelines

Complete guide for using icons effectively across the 5Mins.ai platform with Iconsax React.

## Installation

```bash
npm install iconsax-react
```

## Import Syntax

```jsx
// Import specific icons
import { Home, User, Settings, ArrowRight } from 'iconsax-react';

// Import only what you need for better performance
import { SearchNormal1 } from 'iconsax-react';
```

## Icon Sizes

### Size Scale
Use consistent icon sizes across the application:

| Size | Value | Usage |
|------|-------|-------|
| **Small** | 16px | Small indicators, inline text icons, badges |
| **Medium** | 20px | Button icons, form elements, input icons |
| **Large** | 24px | Navigation, headers, cards (default size) |
| **Extra Large** | 32px | Large interactive elements, hero sections |

### Implementation

```jsx
// Small (16px)
<InfoCircle size="16" color="var(--neutral-500)" />

// Medium (20px) - Forms & buttons
<SearchNormal1 size="20" color="var(--neutral-500)" />

// Large (24px) - Default for most UI
<Home size="24" color="var(--neutral-800)" />

// Extra Large (32px)
<User size="32" color="var(--neutral-800)" />
```

### Using CSS Variables

```jsx
// Reference from CSS
<Home size={`var(--icon-size-lg)`} color="var(--neutral-800)" />

// Or use the numeric value
<Home size="24" color="var(--neutral-800)" />
```

## Icon Colors

Icons follow the same color system as typography. Use semantic colors for different states.

### Color Usage

```jsx
// Primary icons (interactive, active elements)
<Settings size="24" color="var(--neutral-800)" />

// Secondary icons (less prominent, supporting)
<User size="24" color="var(--neutral-500)" />

// Muted icons (disabled, inactive)
<ArrowRight size="24" color="var(--neutral-300)" />

// Success state icons
<TickCircle size="24" color="var(--success-500)" />

// Warning state icons
<InfoCircle size="24" color="var(--warning-500)" />

// Error/Danger state icons
<CloseCircle size="24" color="var(--danger-500)" />

// Link/Brand icons
<Home size="24" color="var(--primary-600)" />
```

### Color Reference Table

| State | Color Variable | Hex | Usage |
|-------|---------------|-----|-------|
| Primary | `--neutral-800` | #20222A | Interactive, active elements |
| Secondary | `--neutral-500` | #454C5E | Supporting elements |
| Muted | `--neutral-300` | #9EA4B3 | Disabled, inactive |
| Success | `--success-500` | #18A957 | Success states, completed |
| Warning | `--warning-500` | #FFA538 | Warnings, in-progress |
| Danger | `--danger-500` | #DF1642 | Errors, delete actions |
| Brand | `--primary-600` | #00AFC4 | Brand elements, links |

## Icon Variants

Iconsax provides two main variants:

### Linear (Default)
Use for most UI elements, navigation, and general interface icons.

```jsx
<Home size="24" color="var(--neutral-800)" variant="Linear" />
```

**Usage:**
- Default state icons
- Navigation items (inactive)
- Form field icons
- General UI elements

### Bold
Use for active states, selected items, or emphasis.

```jsx
<Home size="24" color="var(--primary-600)" variant="Bold" />
```

**Usage:**
- Active navigation items
- Selected states
- Important actions
- Emphasized elements

## Common Icon Patterns

### Navigation Icons

```jsx
// Inactive navigation item
<Home 
  size="24" 
  color="var(--neutral-500)" 
  variant="Linear" 
/>

// Active navigation item
<Home 
  size="24" 
  color="var(--primary-600)" 
  variant="Bold" 
/>
```

### Button Icons

```jsx
// Primary button with icon
<button className="btn-primary">
  <ArrowRight size="20" color="white" variant="Linear" />
  Continue Learning
</button>

// Icon-only button
<button className="icon-button">
  <Settings size="24" color="var(--neutral-800)" />
</button>
```

### Input Icons

```jsx
// Search input with icon
<div className="input-with-icon">
  <SearchNormal1 
    size="20" 
    color="var(--neutral-500)" 
    variant="Linear" 
  />
  <input 
    type="text" 
    placeholder="Search courses..." 
    style={{ paddingLeft: '40px' }}
  />
</div>

// Form field with validation icon
<div className="input-group">
  <input type="email" placeholder="Email" />
  <TickCircle 
    size="20" 
    color="var(--success-500)" 
    variant="Bold" 
  />
</div>
```

### Status Icons

```jsx
// Success status
<div className="status-icon">
  <TickCircle 
    size="20" 
    color="var(--success-500)" 
    variant="Bold" 
  />
  <span>Completed</span>
</div>

// Warning status
<div className="status-icon">
  <InfoCircle 
    size="20" 
    color="var(--warning-500)" 
    variant="Linear" 
  />
  <span>In Progress</span>
</div>

// Error status
<div className="status-icon">
  <CloseCircle 
    size="20" 
    color="var(--danger-500)" 
    variant="Linear" 
  />
  <span>Failed</span>
</div>
```

### Card Icons

```jsx
// Course card with icon
<div className="card">
  <div className="icon-text">
    <Video 
      size="24" 
      color="var(--neutral-800)" 
      variant="Linear" 
    />
    <h4>Video Course</h4>
  </div>
  <p>Watch and learn essential skills</p>
</div>
```

### List Items with Icons

```jsx
// Feature list
<ul className="icon-list">
  <li className="icon-list-item">
    <TickCircle 
      size="20" 
      color="var(--success-500)" 
      variant="Bold" 
    />
    <span>Interactive quizzes</span>
  </li>
  <li className="icon-list-item">
    <TickCircle 
      size="20" 
      color="var(--success-500)" 
      variant="Bold" 
    />
    <span>Progress tracking</span>
  </li>
</ul>
```

### Quiz Type Icons

Match quiz types with appropriate icons:

```jsx
// Blaze Quiz
<Flash 
  size="24" 
  color="var(--blaze-quiz)" 
  variant="Bold" 
/>

// Lesson Quiz
<Book1 
  size="24" 
  color="var(--lesson-quiz)" 
  variant="Linear" 
/>

// Certificate Quiz
<Award 
  size="24" 
  color="var(--certificate-quiz)" 
  variant="Bold" 
/>

// Case Study Quiz
<DocumentText 
  size="24" 
  color="var(--case-study-quiz)" 
  variant="Linear" 
/>
```

## Commonly Used Icons

### Navigation
```jsx
<Home size="24" />           // Dashboard, home
<Book1 size="24" />          // Courses, learning
<Profile2User size="24" />   // Team, users
<Setting2 size="24" />       // Settings
<NotificationBing size="24" /> // Notifications
```

### Actions
```jsx
<Add size="24" />            // Add, create
<Edit size="24" />           // Edit
<Trash size="24" />          // Delete
<Eye size="24" />            // View
<Download size="24" />       // Download
<Share size="24" />          // Share
```

### Status & Feedback
```jsx
<TickCircle size="20" />     // Success, completed
<InfoCircle size="20" />     // Information, warning
<CloseCircle size="20" />    // Error, failed
<Clock size="20" />          // Pending, in progress
```

### Form & Input
```jsx
<SearchNormal1 size="20" />  // Search
<Calendar size="20" />       // Date picker
<Location size="20" />       // Location
<Sms size="20" />            // Email
<Lock size="20" />           // Password
```

### Media & Content
```jsx
<Video size="24" />          // Video content
<Image size="24" />          // Images
<DocumentText size="24" />   // Documents
<MicrophoneSlash size="24" /> // Audio
```

### Navigation & Movement
```jsx
<ArrowRight size="20" />     // Next, forward
<ArrowLeft size="20" />      // Back, previous
<ArrowDown size="20" />      // Expand, dropdown
<ArrowUp size="20" />        // Collapse
```

## Best Practices

### 1. Consistency
Always use Iconsax React icons to maintain visual consistency across the platform.

```jsx
// ✓ Good: Using Iconsax
<Home size="24" color="var(--neutral-800)" />

// ✗ Bad: Mixing icon libraries
<FontAwesomeIcon icon={faHome} />
```

### 2. Size Standards
Stick to the defined icon size scale (16, 20, 24, 32).

```jsx
// ✓ Good: Standard sizes
<Settings size="24" />

// ✗ Bad: Non-standard sizes
<Settings size="23" />
```

### 3. Color Harmony
Use colors from the design system palette.

```jsx
// ✓ Good: Design system colors
<User size="24" color="var(--neutral-800)" />

// ✗ Bad: Arbitrary colors
<User size="24" color="#123456" />
```

### 4. Semantic Meaning
Choose icons that clearly represent their function.

```jsx
// ✓ Good: Clear meaning
<Trash size="20" />  // For delete action

// ✗ Bad: Confusing meaning
<Heart size="20" />  // For delete action
```

### 5. Accessibility
Provide proper aria-labels for icons used without text.

```jsx
// ✓ Good: With aria-label
<button aria-label="Delete course">
  <Trash size="20" color="var(--danger-500)" />
</button>

// Icon with visible text (no aria-label needed)
<button>
  <Trash size="20" color="var(--danger-500)" />
  Delete
</button>
```

### 6. Performance
Import only the icons you need to reduce bundle size.

```jsx
// ✓ Good: Specific imports
import { Home, User, Settings } from 'iconsax-react';

// ✗ Bad: Importing everything
import * as Icons from 'iconsax-react';
```

### 7. Variant Usage
Use Linear for default states, Bold for active/selected states.

```jsx
// Default navigation item
<Home size="24" color="var(--neutral-500)" variant="Linear" />

// Active navigation item
<Home size="24" color="var(--primary-600)" variant="Bold" />
```

## Icon Size Guidelines by Context

| Context | Size | Example |
|---------|------|---------|
| Badge text | 16px | Small indicator next to text |
| Button icon | 20px | Icon inside button |
| Form input | 20px | Search icon in input field |
| Navigation | 24px | Sidebar navigation items |
| Card header | 24px | Icon in card title |
| Page header | 32px | Large icon in hero section |
| Empty state | 32px+ | Large centered icon |

## Responsive Considerations

Icons generally don't need to change size on mobile, but consider:

```jsx
// Desktop: Larger icon in hero
<Home size="32" color="var(--primary-600)" />

// Mobile: Same size or slightly smaller
<Home size="24" color="var(--primary-600)" />
```

## Icon Documentation

For the complete list of available icons:
- [Iconsax React Documentation](https://iconsax-react.pages.dev/)
- [Iconsax Icon Library](https://iconsax.io/)

Search for icons by category: Essential, Arrows, Business, Content, Users, etc.

## Quick Reference Table

| Usage | Size | Color | Variant |
|-------|------|-------|---------|
| Navigation (inactive) | 24px | neutral-500 | Linear |
| Navigation (active) | 24px | primary-600 | Bold |
| Button icon | 20px | white/neutral-800 | Linear |
| Form input | 20px | neutral-500 | Linear |
| Success status | 20px | success-500 | Bold |
| Warning status | 20px | warning-500 | Linear |
| Error status | 20px | danger-500 | Linear |
| Disabled state | 20px | neutral-300 | Linear |
| Small indicator | 16px | neutral-500 | Linear |
