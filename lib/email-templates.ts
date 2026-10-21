// Subcult email templates.
// Brand: near-black paper, warm off-white type, sage for links, the S mark, plain sans-serif,
// few words. Matches the Subcult app and the ADE page. Flat layout (no cards) so it renders the
// same in Gmail, Apple Mail and Outlook.

const BRAND = {
  bg: '#0d0e0c',
  bgCard: '#0d0e0c',
  bgCardBorder: '#2b2d28',
  rule: '#2b2d28',
  text: '#eeeee8',
  textSecondary: '#b4b9ab',
  textMuted: '#8f9487',
  accent: '#a2b18d',
  accentDim: '#a2b18d20',
  link: '#a2b18d',
  font: "Helvetica, Arial, sans-serif",
  markUrl: 'https://subcult.music/email/subcult-mark.png',
  // Kept for older templates that still reference them.
  logoUrl: 'https://subcult.music/email/subcult-mark.png',
  wordmarkUrl: 'https://subcult.music/email/subcult-mark.png',
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
<body style="margin:0; padding:0; background-color:${BRAND.bg}; color:${BRAND.text}; font-family:${BRAND.font}; -webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" bgcolor="${BRAND.bg}" style="background-color:${BRAND.bg};">
    <tr>
      <td align="center" style="padding:56px 24px 40px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:480px;">

          <!-- Mark -->
          <tr>
            <td align="left" style="padding-bottom:40px;">
              <img src="${BRAND.markUrl}" alt="Subcult" width="56" height="56" style="display:block; width:56px; height:56px; border:0;" />
            </td>
          </tr>

          <!-- Content -->
          ${content}

          <!-- Footer -->
          <tr>
            <td style="padding-top:40px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="border-top:1px solid ${BRAND.rule}; padding-top:20px;">
                    <p style="margin:0 0 6px; color:${BRAND.textMuted}; font-size:12px; line-height:1.6;">
                      You joined the Subcult mailing list.
                    </p>
                    <p style="margin:0; color:${BRAND.textMuted}; font-size:12px; line-height:1.6;">
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
  <td style="padding:0;">
    ${content}
  </td>
</tr>`
}

function divider(): string {
  return `<tr><td style="padding:16px 0;"><hr style="border:none; border-top:1px solid ${BRAND.rule}; margin:0;" /></td></tr>`
}

const h1 = `margin:0 0 20px; color:${BRAND.text}; font-size:26px; font-weight:700; line-height:1.15; letter-spacing:-0.5px;`
const body = `margin:0 0 18px; color:${BRAND.textSecondary}; font-size:16px; line-height:1.6;`
const sign = `margin:28px 0 0; color:${BRAND.text}; font-size:16px; line-height:1.6;`

// ─── Welcome Email (Listener) ─────────────────────────────

export function welcomeListener(email: string): string {
  return layout(`
    ${card(`
      <h1 style="${h1}">You’re on the list.</h1>
      <p style="${body}">
        Subcult is music passed from person to person: collections kept by people you trust, with the reason each record matters.
      </p>
      <p style="${body}">
        We’ll write when there’s something to hear: a release, a show, an invite.
      </p>
      <p style="${sign}">AK</p>
    `)}
  `, email)
}

// ─── Welcome Email (Curator / Artist) ─────────────────────

export function welcomeCurator(email: string): string {
  return layout(`
    ${card(`
      <h1 style="${h1}">You’re on the list.</h1>
      <p style="${body}">
        Subcult is built for the people who find and carry music: curators, DJs and artists. Your taste is the work, and it should be credited and paid.
      </p>
      <p style="${body}">
        We’ll be in touch with early access. Reply any time; we read everything.
      </p>
      <p style="${sign}">AK</p>
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
