import fs from "fs";
import path from "path";

interface ContactEmailParams {
	name: string;
	email: string;
	phone: string;
	message: string;
}

const logoPath = path.join(
	process.cwd(),
	"public",
	"images",
	"logo",
	"Access Logo-2.png"
);
const logoBase64 = fs.readFileSync(logoPath).toString("base64");
const logoDataUrl = `data:image/png;base64,${logoBase64}`;

export function contactEmail({
	name,
	email,
	phone,
	message,
}: ContactEmailParams) {
	const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body style="margin:0;padding:0;background-color:#f7f7f7;font-family:Helvetica, Arial, sans-serif;color:#333;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#f7f7f7;padding:20px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#ffffff;border-radius:4px;overflow:hidden;">
            <tr style="background-color:#f7f7f7;">
              <td style="padding:20px;text-align:center;">
                <img src="${logoDataUrl}" alt="Access Health" width="200" style="display:block;margin:0 auto;" />
              </td>
            </tr>
            <tr>
              <td style="padding:20px;">
                <h2 style="margin:0 0 16px;color:#0863C5;font-size:20px;">New Contact Form Submission</h2>
                <p style="margin:0 0 8px;"><strong>Name:</strong> ${name}</p>
                <p style="margin:0 0 8px;"><strong>Email:</strong> <a href="mailto:${email}" style="color:#0863C5;">${email}</a></p>
                <p style="margin:0 0 16px;"><strong>Phone:</strong> <a href="tel:${phone}" style="color:#0863C5;">${phone}</a></p>
                <p style="margin:0;white-space:pre-line;">${message}</p>
              </td>
            </tr>
            <tr>
              <td style="background-color:#f0f4f8;padding:20px;text-align:center;font-size:14px;color:#555;">
                <p style="margin:0 0 8px;">Access Health</p>
                <p style="margin:0;">Need assistance? <a href="mailto:info@accesshealth.com" style="color:#0863C5;">Contact us</a></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

	const text = `Access Health - New Contact Form Submission\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}\n\nNeed assistance? Contact us at info@accesshealth.com`;

	return { html, text };
}
