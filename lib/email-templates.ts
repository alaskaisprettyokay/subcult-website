const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://subcult.music';

const baseStyles = `
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
  .header { text-align: center; margin-bottom: 30px; }
  .logo { width: 60px; height: 60px; }
  .content { margin-bottom: 30px; }
  .footer { text-align: center; font-size: 12px; color: #888; margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; }
  a { color: #000; }
`;

const footer = (email: string) => `
  <div class="footer">
    <p>SubCult</p>
    <p>
      <a href="${BASE_URL}/unsubscribe?email=${encodeURIComponent(email)}">Unsubscribe</a>
    </p>
  </div>
`;

export const welcomeListener = (email: string): string => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to SubCult</title>
  <style>${baseStyles}</style>
</head>
<body>
  <div class="header">
    <img src="${BASE_URL}/subcult-globe-white.png" alt="SubCult" class="logo" style="filter: invert(1);">
  </div>
  <div class="content">
    <h1>Welcome to SubCult</h1>
    <p>Thanks for joining. You're now on the list.</p>
    <p>We'll keep you posted on new releases, events, and exclusive content.</p>
    <p>— The SubCult Team</p>
  </div>
  ${footer(email)}
</body>
</html>
`;

export const welcomeCurator = (email: string): string => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to SubCult</title>
  <style>${baseStyles}</style>
</head>
<body>
  <div class="header">
    <img src="${BASE_URL}/subcult-globe-white.png" alt="SubCult" class="logo" style="filter: invert(1);">
  </div>
  <div class="content">
    <h1>Welcome to SubCult</h1>
    <p>Thanks for joining as a creator.</p>
    <p>We'll be in touch soon with next steps on how to share your music with our community.</p>
    <p>— The SubCult Team</p>
  </div>
  ${footer(email)}
</body>
</html>
`;

export const newsletter = (subject: string, content: string, email: string): string => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
  <style>${baseStyles}</style>
</head>
<body>
  <div class="header">
    <img src="${BASE_URL}/subcult-globe-white.png" alt="SubCult" class="logo" style="filter: invert(1);">
  </div>
  <div class="content">
    ${content}
  </div>
  ${footer(email)}
</body>
</html>
`;
