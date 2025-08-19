export function SiteFooter() {
  return (
    <footer className="border-t mt-16">
      <div className="container py-12 grid md:grid-cols-3 gap-8">
        <div>
          <div className="font-semibold text-lg">
            <span className="text-[color:var(--brand-blue)]">Access</span>{" "}
            <span className="text-[color:var(--brand-red)]">Health</span>
          </div>
          <p className="text-sm mt-3">
            Warm, homely, and professional care for the whole family.
          </p>
        </div>

        <div>
          <h4 className="font-semibold">Contact</h4>
          <p className="mt-3 text-sm">
            123 Clinic Road, Harare<br/>
            +263 (0) 77 000 0000<br/>
            hello@accesshealth.co.zw<br/>
            <strong>Hours:</strong> Mon–Fri 08:00–18:00, Sat 09:00–13:00
          </p>
        </div>

        <div>
          <h4 className="font-semibold">Quick Links</h4>
          <ul className="mt-3 text-sm space-y-2">
            <li><a href="/services" className="hover:underline">Services</a></li>
            <li><a href="/team" className="hover:underline">Meet the Team</a></li>
            <li><a href="/resources" className="hover:underline">Resources</a></li>
            <li><a href="/contact" className="hover:underline">Book an Appointment</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 pb-8">
        © {new Date().getFullYear()} Access Health. All rights reserved.
      </div>
    </footer>
  )
}
