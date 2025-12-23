# Resume Setup Instructions

## Creating Your Professional Resume

Your portfolio includes "Download Resume" buttons in two locations:
1. Hero section
2. Contact section

## Current Status:
⚠️ **Placeholder path:** `/path/to/resume.pdf`
✅ **You need to:** Create and upload your PDF resume

## Resume Creation Steps:

### Option 1: Using Canva (Recommended - Free)
1. Go to: https://www.canva.com/
2. Search: "Resume Templates"
3. Choose professional template
4. Fill in your details:
   - Name: Dolly Bisht
   - Email: dollybisht408@gmail.com
   - Phone: Your number
   - Location: Himachal Pradesh, India
   - Education: BCA, Himachal Eternal University
   - Skills: React, JavaScript, HTML5, CSS3, Python
   - Projects: (Use your portfolio projects)
   - Certifications: ML, Prompt Engineering, IAYP
5. Download as PDF
6. Name it: `Dolly_Bisht_Resume.pdf`

### Option 2: Google Docs
1. Google Docs → Template Gallery → Resumes
2. Choose clean, professional template
3. Fill in details
4. Download as PDF

### Option 3: LaTeX (Advanced)
- Use Overleaf.com
- Template: https://www.overleaf.com/latex/templates/resume/
- Best for technical resumes

## Resume Content Checklist:

### Essential Sections:
- [ ] Contact Information (name, email, phone, LinkedIn, GitHub)
- [ ] Professional Summary (2-3 sentences)
- [ ] Education (BCA, University, Year)
- [ ] Technical Skills (grouped: Frontend, Programming, Tools)
- [ ] Projects (3-4 best projects with descriptions)
- [ ] Certifications
- [ ] Achievements (IAYP, etc.)

### Optional:
- [ ] Work Experience / Internships
- [ ] Volunteer Work
- [ ] Languages
- [ ] Hobbies (if relevant)

## Uploading Your Resume:

### Step 1: Save PDF
```bash
# Save your resume as:
/home/sama/Downloads/portfolio/Dolly_Bisht_Resume.pdf
```

### Step 2: Update HTML Links

Find and replace in `index.html`:

**Current:**
```html
href="/path/to/resume.pdf"
```

**Replace with:**
```html
href="Dolly_Bisht_Resume.pdf"
```

Or use absolute path:
```html
href="/home/sama/Downloads/portfolio/Dolly_Bisht_Resume.pdf"
```

### Step 3: Test Download
1. Open portfolio in browser
2. Click "Download Resume" button
3. Verify PDF downloads correctly

## Resume Best Practices:

✅ **DO:**
- Keep it 1 page (2 pages max)
- Use professional fonts (Inter, Roboto, Arial)
- Include quantifiable achievements
- Use action verbs (Built, Developed, Implemented)
- Proofread for typos
- Save as PDF (not Word doc)
- Use consistent formatting
- Include links to GitHub/LinkedIn

❌ **DON'T:**
- Use fancy graphics/colors (unless design role)
- Include photo (unless common in your region)
- Use first person ("I built..." → "Built...")
- Include irrelevant information
- Use small fonts (<10pt)
- Have typos or grammatical errors

## ATS-Friendly Tips:

1. Use standard section headers (Education, Experience, Skills)
2. Avoid tables and columns (use simple lists)
3. Include keywords from job descriptions
4. Use standard fonts
5. Save as PDF (not image)
6. Don't use headers/footers for important info

## Example Summary Statement:

```
BCA student specializing in Frontend Development with 3+ years of coding 
experience. Proficient in React, JavaScript, HTML5, and CSS3. Built 10+ 
responsive web applications including e-commerce platforms and food ordering 
systems. Passionate about creating user-centric interfaces with clean, 
maintainable code.
```

## File Naming Convention:

✅ Good:
- `Dolly_Bisht_Resume.pdf`
- `Dolly_Bisht_CV_2025.pdf`

❌ Bad:
- `resume.pdf`
- `my_cv_final_v2.pdf`
- `Untitled.pdf`

## Testing Checklist:

After uploading:
- [ ] File exists at correct path
- [ ] File size reasonable (<500KB)
- [ ] PDF opens correctly
- [ ] All text is selectable (not image)
- [ ] Links work in index.html
- [ ] Download works on mobile
- [ ] File name is professional

## Need Help?

Resources:
- Canva Resume Templates: https://www.canva.com/resumes/templates/
- Resume Examples: https://www.indeed.com/career-advice/resume-samples
- ATS Checker: https://www.jobscan.co/

---

**Next Step:** Create your resume and save it in the portfolio folder!
