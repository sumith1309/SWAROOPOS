import { CAREER, EDUCATION, SKILLS, CERTIFICATIONS, LANGUAGES, CONTACT, PROFESSIONAL_SUMMARY, FEATURED_PRODUCTS, ADDITIONAL_PRODUCTS } from "@/lib/data";

export async function GET() {
  const allProducts = [...FEATURED_PRODUCTS, ...ADDITIONAL_PRODUCTS];

  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1a1a1a; font-size: 11px; line-height: 1.5; padding: 40px 50px; max-width: 800px; margin: 0 auto; }
  h1 { font-size: 22px; font-weight: 700; color: #0f172a; margin-bottom: 2px; }
  h2 { font-size: 13px; font-weight: 700; color: #1e40af; text-transform: uppercase; letter-spacing: 1px; border-bottom: 2px solid #1e40af; padding-bottom: 3px; margin: 18px 0 8px; }
  h3 { font-size: 12px; font-weight: 600; color: #0f172a; }
  .subtitle { font-size: 13px; color: #475569; font-weight: 500; }
  .contact-row { font-size: 10px; color: #64748b; margin-top: 4px; }
  .contact-row a { color: #1e40af; text-decoration: none; }
  .summary { font-size: 11px; color: #334155; margin: 10px 0; line-height: 1.6; }
  .entry { margin-bottom: 10px; }
  .entry-header { display: flex; justify-content: space-between; align-items: baseline; }
  .entry-meta { font-size: 10px; color: #64748b; }
  .entry ul { margin: 3px 0 0 16px; }
  .entry li { font-size: 10.5px; color: #334155; margin-bottom: 1px; }
  .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .skill-category { }
  .skill-category h4 { font-size: 11px; font-weight: 600; color: #1e40af; margin-bottom: 2px; }
  .skill-category p { font-size: 10px; color: #475569; line-height: 1.5; }
  .projects-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 4px 16px; }
  .project-item { font-size: 10px; color: #334155; padding: 2px 0; }
  .project-item strong { color: #0f172a; }
  .project-item .domain { font-size: 9px; color: #64748b; }
  .certs li { font-size: 10.5px; color: #334155; margin-bottom: 1px; }
  .langs { font-size: 10.5px; color: #334155; }
  .footer { text-align: center; font-size: 9px; color: #94a3b8; margin-top: 20px; border-top: 1px solid #e2e8f0; padding-top: 8px; }
</style>
</head>
<body>

<h1>S. Jyothi Swaroop</h1>
<div class="subtitle">AI Product Manager & Startup Co-Founder</div>
<div class="contact-row">
  ${CONTACT.location} · <a href="mailto:${CONTACT.email}">${CONTACT.email}</a> · ${CONTACT.phone} · <a href="${CONTACT.linkedin}">LinkedIn</a> · <a href="${CONTACT.github}">GitHub</a> · <a href="https://swaroopos.vercel.app">Portfolio</a>
</div>

<div class="summary">${PROFESSIONAL_SUMMARY}</div>

<h2>Experience</h2>
${CAREER.map(c => `
<div class="entry">
  <div class="entry-header">
    <h3>${c.role} — ${c.company}</h3>
    <span class="entry-meta">${c.period} · ${c.location}</span>
  </div>
  <ul>
    ${c.highlights.map(h => `<li>${h}</li>`).join("")}
  </ul>
  ${c.stack.length ? `<div class="entry-meta" style="margin-top:2px">Stack: ${c.stack.join(", ")}</div>` : ""}
</div>
`).join("")}

<h2>Education</h2>
${EDUCATION.map(e => `
<div class="entry">
  <div class="entry-header">
    <h3>${e.degree} — ${e.institution}</h3>
    <span class="entry-meta">${e.period}</span>
  </div>
  <div class="entry-meta">${e.campuses}</div>
  ${e.coursework ? `<div class="entry-meta" style="margin-top:2px">${e.coursework.join(" · ")}</div>` : ""}
</div>
`).join("")}

<h2>Skills</h2>
<div class="skills-grid">
  ${Object.entries(SKILLS).map(([cat, items]) => `
  <div class="skill-category">
    <h4>${cat}</h4>
    <p>${(items as string[]).join(", ")}</p>
  </div>
  `).join("")}
</div>

<h2>Projects (${allProducts.length})</h2>
<div class="projects-grid">
  ${allProducts.map(p => `
  <div class="project-item">
    <strong>${p.name}</strong> <span class="domain">(${p.year})</span><br/>
    ${p.tagline}
  </div>
  `).join("")}
</div>

<h2>Certifications</h2>
<ul class="certs">
  ${CERTIFICATIONS.map(c => `<li>${c}</li>`).join("")}
</ul>

<h2>Languages</h2>
<div class="langs">
  ${LANGUAGES.map(l => `${l.name}: ${l.level}`).join(" · ")}
</div>

<div class="footer">
  Generated from swaroopos.vercel.app · ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
</div>

</body>
</html>`;

  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Content-Disposition": "inline; filename=S_Jyothi_Swaroop_CV.html",
    },
  });
}
