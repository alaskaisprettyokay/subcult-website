// Subcult Email Templates
// Design system: #1a1a1a bg, white text, purple accent, Inter font, minimal underground aesthetic

const BRAND = {
  bg: '#1a1a1a',
  bgCard: '#242424',
  bgCardBorder: '#333333',
  text: '#ffffff',
  textSecondary: '#999999',
  textMuted: '#666666',
  accent: '#c084fc', // purple-400
  accentDim: '#7c3aed20', // purple with opacity
  link: '#c084fc',
  font: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Inter, Roboto, sans-serif",
  logoUrl: 'https://subcult.music/subcult-vector.png',
  wordmarkUrl: 'https://subcult.music/SUBCULT.png',
  siteUrl: 'https://subcult.music',
}

function layout(content: string, email?: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <title>Subcult</title>
  <!--[if mso]>
  <style>body{font-family:Arial,sans-serif!important;}</style>
  <![endif]-->
</head>
<body style="margin:0; padding:0; background-color:${BRAND.bg}; font-family:${BRAND.font}; -webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND.bg};">
    <tr>
      <td align="center" style="padding:40px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <img src="${BRAND.wordmarkUrl}" alt="SUBCULT" width="160" style="display:block; height:auto; filter:brightness(0) invert(1);" />
            </td>
          </tr>

          <!-- Content -->
          ${content}

          <!-- Footer -->
          <tr>
            <td style="padding-top:40px; border-top:1px solid #333;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center" style="padding:20px 0;">
                    <p style="margin:0 0 8px; color:${BRAND.textMuted}; font-size:13px; line-height:1.5;">
                      You're receiving this because you signed up at
                      <a href="${BRAND.siteUrl}" style="color:${BRAND.accent}; text-decoration:none;">subcult.music</a>
                    </p>
                    <p style="margin:0; color:${BRAND.textMuted}; font-size:13px;">
                      <a href="${BRAND.siteUrl}/unsubscribe${email ? '?email=' + encodeURIComponent(email) : ''}" style="color:${BRAND.textMuted}; text-decoration:underline;">Unsubscribe</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

function card(content: string): string {
  return `<tr>
  <td style="background-color:${BRAND.bgCard}; border:1px solid ${BRAND.bgCardBorder}; border-radius:4px; padding:28px 24px;">
    ${content}
  </td>
</tr>`
}

function divider(): string {
  return `<tr><td style="padding:16px 0;"><hr style="border:none; border-top:1px solid #333; margin:0;" /></td></tr>`
}

// ─── Welcome Email (Listener) ─────────────────────────────

export function welcomeListener(email: string): string {
  return layout(`
    ${card(`
      <h1 style="margin:0 0 16px; color:${BRAND.text}; font-size:22px; font-weight:600; letter-spacing:-0.3px;">
        Welcome to Subcult
      </h1>
      <p style="margin:0 0 20px; color:${BRAND.textSecondary}; font-size:15px; line-height:1.6;">
        You're in. We're building a new way to discover underground music — driven by people with taste, not algorithms.
      </p>
      <p style="margin:0 0 20px; color:${BRAND.textSecondary}; font-size:15px; line-height:1.6;">
        Here's what's coming for you:
      </p>
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 20px;">
        <tr>
          <td style="padding:6px 0; color:${BRAND.textSecondary}; font-size:14px; line-height:1.5;">
            <span style="color:${BRAND.accent}; margin-right:8px;">→</span>
            Music curated by real people from underground scenes worldwide
          </td>
        </tr>
        <tr>
          <td style="padding:6px 0; color:${BRAND.textSecondary}; font-size:14px; line-height:1.5;">
            <span style="color:${BRAND.accent}; margin-right:8px;">→</span>
            Direct connection to artists — no middlemen, no algorithms
          </td>
        </tr>
        <tr>
          <td style="padding:6px 0; color:${BRAND.textSecondary}; font-size:14px; line-height:1.5;">
            <span style="color:${BRAND.accent}; margin-right:8px;">→</span>
            Support the music you love, directly and instantly
          </td>
        </tr>
      </table>
      <p style="margin:0; color:${BRAND.textMuted}; font-size:13px; line-height:1.5;">
        We'll let you know when we launch. Until then — keep digging.
      </p>
    `)}
  `, email)
}

// ─── Welcome Email (Curator / Artist) ─────────────────────

export function welcomeCurator(email: string): string {
  return layout(`
    ${card(`
      <h1 style="margin:0 0 16px; color:${BRAND.text}; font-size:22px; font-weight:600; letter-spacing:-0.3px;">
        Welcome to Subcult
      </h1>
      <p style="margin:0 0 20px; color:${BRAND.textSecondary}; font-size:15px; line-height:1.6;">
        You're in. We're building infrastructure for people like you — the ones who find, champion, and create the music that matters.
      </p>
      <p style="margin:0 0 20px; color:${BRAND.textSecondary}; font-size:15px; line-height:1.6;">
        Here's what we're building for you:
      </p>
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 20px;">
        <tr>
          <td style="padding:6px 0; color:${BRAND.textSecondary}; font-size:14px; line-height:1.5;">
            <span style="color:${BRAND.accent}; margin-right:8px;">→</span>
            Your own space — a community built around your taste
          </td>
        </tr>
        <tr>
          <td style="padding:6px 0; color:${BRAND.textSecondary}; font-size:14px; line-height:1.5;">
            <span style="color:${BRAND.accent}; margin-right:8px;">→</span>
            Direct payments from listeners — instant, global, no 30% cut
          </td>
        </tr>
        <tr>
          <td style="padding:6px 0; color:${BRAND.textSecondary}; font-size:14px; line-height:1.5;">
            <span style="color:${BRAND.accent}; margin-right:8px;">→</span>
            Curation recognized as labor — because it is
          </td>
        </tr>
      </table>
      <p style="margin:0; color:${BRAND.textMuted}; font-size:13px; line-height:1.5;">
        We'll reach out soon with early access. Reply to this email anytime — we read everything.
      </p>
    `)}
  `, email)
}

// ─── Newsletter Template ──────────────────────────────────

export function newsletter(subject: string, content: string, email?: string): string {
  // Convert markdown-ish content to HTML
  const htmlContent = content
    .replace(/^### (.+)$/gm, `<h3 style="margin:20px 0 8px; color:${BRAND.text}; font-size:16px; font-weight:600;">$1</h3>`)
    .replace(/^## (.+)$/gm, `<h2 style="margin:24px 0 12px; color:${BRAND.text}; font-size:18px; font-weight:600;">$1</h2>`)
    .replace(/\*\*(.+?)\*\*/g, `<strong style="color:${BRAND.text};">$1</strong>`)
    .replace(/\[(.+?)\]\((.+?)\)/g, `<a href="$2" style="color:${BRAND.accent}; text-decoration:none;">$1</a>`)
    .replace(/\n\n/g, `</p><p style="margin:0 0 16px; color:${BRAND.textSecondary}; font-size:15px; line-height:1.6;">`)
    .replace(/\n/g, '<br>')

  return layout(`
    ${card(`
      <h1 style="margin:0 0 20px; color:${BRAND.text}; font-size:22px; font-weight:600; letter-spacing:-0.3px;">
        ${subject}
      </h1>
      <div>
        <p style="margin:0 0 16px; color:${BRAND.textSecondary}; font-size:15px; line-height:1.6;">
          ${htmlContent}
        </p>
      </div>
    `)}
  `, email)
}

// ─── Announcement / Product Update ────────────────────────

export function announcement(
  headline: string,
  body: string,
  ctaText?: string,
  ctaUrl?: string,
  email?: string
): string {
  const ctaBlock = ctaText && ctaUrl ? `
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin:24px 0 0;">
      <tr>
        <td style="background-color:${BRAND.text}; border-radius:3px;">
          <a href="${ctaUrl}" style="display:inline-block; padding:12px 24px; color:${BRAND.bg}; font-size:14px; font-weight:600; text-decoration:none;">
            ${ctaText} →
          </a>
        </td>
      </tr>
    </table>
  ` : ''

  return layout(`
    ${card(`
      <h1 style="margin:0 0 16px; color:${BRAND.text}; font-size:22px; font-weight:600; letter-spacing:-0.3px;">
        ${headline}
      </h1>
      <p style="margin:0; color:${BRAND.textSecondary}; font-size:15px; line-height:1.6;">
        ${body.replace(/\n\n/g, `</p><p style="margin:16px 0 0; color:${BRAND.textSecondary}; font-size:15px; line-height:1.6;">`).replace(/\n/g, '<br>')}
      </p>
      ${ctaBlock}
    `)}
  `, email)
}

export { BRAND, layout, card, divider }
