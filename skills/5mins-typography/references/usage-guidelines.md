# Typography Usage Guidelines

Complete guide for using 5Mins.ai typography system effectively across all interfaces.

## Hierarchy and Semantic Meaning

### H1 - Page Titles (32px, Bold)
**Use for:** Main page titles, primary content headers

**Examples:**
- Dashboard page title: "Team Management"
- Course page title: "Introduction to Workplace Safety"
- Profile page title: "My Learning Path"

**Best practices:**
- Use only once per page
- Should be the most prominent text element
- Always use neutral-800 color
- Consider reducing size on mobile

### H2 - Section Headers (24px, Bold)
**Use for:** Major section headers, main content blocks

**Examples:**
- "Course Overview"
- "Your Progress"
- "Team Statistics"
- "Recent Activity"

**Best practices:**
- Can use multiple times per page
- Creates clear visual hierarchy below H1
- Use for major content divisions

### H3 - Subsection Headers (20px, Bold)
**Use for:** Subsection headers, content group titles

**Examples:**
- "Completed Courses"
- "Learning Objectives"
- "Prerequisites"
- Card section titles within larger sections

**Best practices:**
- Use for breaking up content within H2 sections
- Good for card group headers
- Maintains clear hierarchy

### H4 - Component Titles (16px, Bold)
**Use for:** Component titles, card headers, modal titles

**Examples:**
- Course card titles
- Modal dialog headers: "Confirm Enrollment"
- Settings section labels
- Form section headers

**Best practices:**
- Perfect for card-based UIs
- Use for interactive component headers
- Common in dashboards and grids

### H5 - Small Component Headers (14px, Bold)
**Use for:** Small component headers, prominent labels

**Examples:**
- Sidebar section labels
- Small card headers
- Table column headers
- List item titles

**Best practices:**
- Good for compact interfaces
- Use in sidebars and navigation
- Appropriate for dense information displays

### H6 - Micro Headers (12px, Bold, 140% line-height)
**Use for:** Micro headers, tags, small labels, metadata

**Examples:**
- Badge labels
- Tag text
- Timestamp labels
- Category labels
- Metadata headers

**Best practices:**
- Smallest heading size
- Use sparingly
- Good for very compact UIs or metadata

## Body Text Sizes

### Paragraph Large (16px) - Default Body Text

**Regular weight (400):**
```css
.text-body-l
.text-body-l-regular
```

**Use for:**
- Main body content
- Course descriptions
- Paragraph text in articles
- Default text size for most content

**Medium weight (500):**
```css
.text-body-l-medium
```

**Use for:**
- Emphasized body text
- Important paragraphs
- Slightly more prominent content
- Call-out text within paragraphs

### Paragraph Medium (14px) - Secondary Body Text

**Regular weight (400):**
```css
.text-body-m
.text-body-m-regular
```

**Use for:**
- Secondary descriptions
- List items
- Table content
- Sidebar text
- Card descriptions

**Medium weight (500):**
```css
.text-body-m-medium
```

**Use for:**
- Important list items
- Emphasized table cells
- Selected item text
- Form labels

### Paragraph Small (12px) - Captions & Labels

**Regular weight (400):**
```css
.text-body-s
.text-body-s-regular
```

**Use for:**
- Captions
- Help text
- Timestamps
- Small labels
- Footer text
- Metadata

**Medium weight (500):**
```css
.text-body-s-medium
```

**Use for:**
- Emphasized captions
- Important labels
- Selected states in small text
- Badge text

## Button Text Styles

### Button Large (16px, Bold)
```css
.text-button-l
```

**Use for:**
- Primary call-to-action buttons
- Hero section buttons
- Large prominent actions
- Desktop main buttons

**Examples:**
- "Start Learning"
- "Enroll Now"
- "Create Course"

### Button Medium (14px, Bold)
```css
.text-button-m
```

**Use for:**
- Standard buttons throughout interface
- Secondary actions
- Form submit buttons
- Most common button size

**Examples:**
- "Save Changes"
- "View Details"
- "Download Certificate"

### Button Small (12px, Bold, 120% line-height)
```css
.text-button-s
```

**Use for:**
- Compact buttons in tables
- Icon + text buttons
- Toolbar buttons
- Dense UI areas

**Examples:**
- "Edit"
- "Delete"
- Table action buttons

## Text Color Usage

### Primary Text (neutral-800)
```css
.text-primary
color: var(--neutral-800); /* #20222A */
```

**Use for:**
- All headings (H1-H6)
- Primary content that needs emphasis
- Important data values
- Active navigation items

### Secondary Text (neutral-500)
```css
.text-secondary
color: var(--neutral-500); /* #454C5E */
```

**Use for:**
- Body text (default)
- Descriptions
- Paragraph content
- Most readable text

### Label Text (neutral-400)
```css
.text-label
color: var(--neutral-400); /* #656B7C */
```

**Use for:**
- Form labels
- Input placeholders
- Small captions
- Tertiary information
- Timestamps

### Muted Text (neutral-300)
```css
.text-muted
color: var(--neutral-300); /* #9EA4B3 */
```

**Use for:**
- Disabled text
- Deemphasized content
- Placeholder text
- Very low priority information

### Link Text
```css
.text-link
color: var(--primary-600); /* #00AFC4 */
```

**Hover state:**
```css
.text-link:hover
color: var(--primary-700); /* #008393 */
text-decoration: underline;
```

**Use for:**
- All clickable text links
- Navigation links
- In-text hyperlinks
- "Learn more" links

## Common Patterns

### Page Header
```html
<div>
  <h1 class="heading-1">Team Dashboard</h1>
  <p class="text-body-m text-label">Manage your team's learning progress</p>
</div>
```

### Card Header
```html
<div class="card">
  <h4 class="heading-4">Workplace Safety</h4>
  <p class="text-body-m text-secondary">
    Essential safety protocols for all employees
  </p>
</div>
```

### Stats Display
```html
<div>
  <p class="text-body-s text-label">Total Learners</p>
  <h2 class="heading-2 text-primary">1,234</h2>
</div>
```

### Form Label
```html
<label class="text-body-m-medium text-secondary">
  Course Title
</label>
<input class="text-body-l" placeholder="Enter course name" />
```

### Timestamp/Metadata
```html
<p class="text-body-s text-label">
  Last updated: 2 hours ago
</p>
```

### Button with Text
```html
<button class="btn-primary text-button-m">
  Continue Learning
</button>
```

## Responsive Typography

### Mobile Adjustments

On tablets (≤768px):
- H1: 32px → 28px
- H2: 24px → 22px
- Other sizes remain the same

On mobile (≤480px):
- H1: 32px → 24px
- H2: 24px → 20px
- Consider using smaller button sizes

### Best Practices for Mobile
- Reduce heading sizes for better fit
- Maintain body text size for readability
- Ensure touch targets are sufficient
- Test line lengths (45-75 characters optimal)
- Use smaller button text on compact screens

## Accessibility Guidelines

### Readability
- Body text minimum: 16px (text-body-l) for main content
- Line height: 1.5 (150%) for optimal readability
- Maximum line length: 70-80 characters
- Paragraph spacing: Use margin for visual breaks

### Contrast Requirements
- Primary text (neutral-800) on white: Excellent contrast
- Secondary text (neutral-500) on white: Good contrast (AA)
- Label text (neutral-400) on white: Sufficient for labels (AA)
- Muted text (neutral-300): Use for disabled states only

### Text Hierarchy
- Use semantic HTML (h1, h2, h3) not just classes
- Maintain logical heading order
- Don't skip heading levels
- Screen readers depend on proper hierarchy

## Font Loading

### Google Fonts Import
```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap');
```

### Font-Display Strategy
- Uses `display=swap` for better performance
- Fallback: System fonts (Apple, Segoe UI, Roboto)
- Ensures text remains visible during load

### System Font Fallback
```css
font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
```

## Common Mistakes to Avoid

### Don't:
✗ Mix different font weights inconsistently
✗ Use muted text (neutral-300) for important content
✗ Skip heading levels (H1 → H3)
✗ Use all caps excessively
✗ Make body text too small (<14px for main content)
✗ Use bold for entire paragraphs
✗ Forget to specify line-height

### Do:
✓ Use heading hierarchy semantically
✓ Match text size to importance
✓ Use medium weight for subtle emphasis
✓ Maintain consistent spacing
✓ Test on actual devices
✓ Use appropriate colors for text purpose
✓ Leverage CSS custom properties

## Quick Reference

| Element | Size | Weight | Line Height | Color |
|---------|------|--------|-------------|-------|
| H1 | 32px | 700 | 1.5 | neutral-800 |
| H2 | 24px | 700 | 1.5 | neutral-800 |
| H3 | 20px | 700 | 1.5 | neutral-800 |
| H4 | 16px | 700 | 1.5 | neutral-800 |
| H5 | 14px | 700 | 1.5 | neutral-800 |
| H6 | 12px | 700 | 1.4 | neutral-800 |
| Body L | 16px | 400/500 | 1.5 | neutral-500 |
| Body M | 14px | 400/500 | 1.5 | neutral-500 |
| Body S | 12px | 400/500 | 1.4 | neutral-500 |
| Button L | 16px | 700 | 1.5 | - |
| Button M | 14px | 700 | 1.5 | - |
| Button S | 12px | 700 | 1.2 | - |
