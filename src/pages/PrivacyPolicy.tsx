import { PolicyPageLayout } from '@/components/layout/PolicyPageLayout';

const contactEmail = 'myhub@chetanmahajan.site';

export default function PrivacyPolicy() {
  return (
    <PolicyPageLayout
      title="MY HUB Privacy Policy"
      effectiveDate="15/02/2026"
      lastUpdated="16/02/2026"
    >
        <p>
          MY HUB ("we," "our," or "us") respects your privacy and is committed to protecting any
          personal information we collect. This Privacy Policy explains what information we collect,
          how we use it, and how you can control your personal information in connection with your
          participation in MY HUB and its associated services, including our Discord server and
          booking system.
        </p>
        <p>
          By joining MY HUB and engaging in our activities, you agree to the collection and use of
          information in accordance with this Privacy Policy.
        </p>

        <section className="space-y-3">
          <h2 className="font-heading text-xl font-bold text-foreground">1. Information We Collect</h2>
          <p>
            To manage and support MY HUB community activities, we may collect the following types of
            information:
          </p>
          <h3 className="font-bold text-foreground">Basic Account Information</h3>
          <ul className="list-disc space-y-1 pl-6">
            <li>Discord username and Discord User ID</li>
            <li>In-game username</li>
            <li>Virtual Trucking Company (VTC) name (if applicable)</li>
            <li>Email address (if provided for event confirmations or booking notifications)</li>
          </ul>
          <h3 className="font-bold text-foreground">Gameplay Information</h3>
          <p>To manage participation and validate experience, we may track:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Hours played in Euro Truck Simulator 2 (ETS2)</li>
            <li>Hours played in American Truck Simulator (ATS)</li>
            <li>Convoy participation</li>
            <li>Event attendance</li>
            <li>In-game performance and compliance with community rules</li>
          </ul>
          <h3 className="font-bold text-foreground">Booking and Event Data</h3>
          <p>When using the MY HUB event booking system, we may store:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Slot number and slot label</li>
            <li>VTC booking details</li>
            <li>Member count</li>
            <li>Event name</li>
            <li>Approval or rejection status</li>
            <li>Administrative notes related to bookings</li>
          </ul>
          <h3 className="font-bold text-foreground">Communication Records</h3>
          <p>We may retain communication records within our Discord server, including:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Text messages</li>
            <li>Direct messages sent by our bot</li>
            <li>Event-related announcements</li>
            <li>Administrative communications</li>
          </ul>
          <h3 className="font-bold text-foreground">Behavioral Data</h3>
          <ul className="list-disc space-y-1 pl-6">
            <li>Attendance records</li>
            <li>Activity within MY HUB events</li>
            <li>Reports of misconduct (if applicable)</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-xl font-bold text-foreground">
            2. How We Use Your Information
          </h2>
          <p>We use your information solely to operate and improve the MY HUB experience. Specifically, we may use your information for:</p>
          <h3 className="font-bold text-foreground">Community Management</h3>
          <ul className="list-disc space-y-1 pl-6">
            <li>Verifying eligibility</li>
            <li>Approving applications</li>
            <li>Managing membership</li>
          </ul>
          <h3 className="font-bold text-foreground">Event Coordination</h3>
          <ul className="list-disc space-y-1 pl-6">
            <li>Organizing convoys and events</li>
            <li>Managing slot bookings</li>
            <li>Sending confirmations and updates</li>
          </ul>
          <h3 className="font-bold text-foreground">Safety and Compliance</h3>
          <ul className="list-disc space-y-1 pl-6">
            <li>Enforcing our Terms of Service</li>
            <li>Handling disciplinary actions</li>
            <li>Preventing abuse or misuse of the booking system</li>
          </ul>
          <h3 className="font-bold text-foreground">Communication</h3>
          <ul className="list-disc space-y-1 pl-6">
            <li>Sending announcements</li>
            <li>Sending booking confirmations via Discord or email</li>
            <li>Providing support</li>
          </ul>
          <h3 className="font-bold text-foreground">Community Engagement</h3>
          <ul className="list-disc space-y-1 pl-6">
            <li>Recognizing achievements</li>
            <li>Maintaining leaderboards</li>
            <li>Highlighting event participation</li>
          </ul>
          <p>We do not sell or rent your personal data.</p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-xl font-bold text-foreground">
            3. Data Sharing and Disclosure
          </h2>
          <p>
            MY HUB does not sell, trade, or transfer your personal information to outside parties.
            We may share information only in the following limited circumstances:
          </p>
          <h3 className="font-bold text-foreground">Service Providers</h3>
          <p>We may use trusted third-party services necessary to operate MY HUB, such as:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Discord (for communication and bot functionality)</li>
            <li>Website hosting providers</li>
            <li>Database providers</li>
          </ul>
          <h3 className="font-bold text-foreground">Legal Requirements</h3>
          <p>
            We may disclose information if required by law, court order, or governmental authority,
            or to protect the rights, safety, and integrity of MY HUB and its community.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-xl font-bold text-foreground">4. Data Security</h2>
          <p>
            We implement reasonable technical and administrative security measures to protect your
            personal information from unauthorized access, misuse, or alteration. However, no online
            platform can guarantee absolute security.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-xl font-bold text-foreground">5. Data Retention</h2>
          <p>We retain personal information only as long as necessary to:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Operate MY HUB services</li>
            <li>Manage bookings and events</li>
            <li>Comply with legal obligations</li>
          </ul>
          <p>Data may be anonymized or deleted when no longer required.</p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-xl font-bold text-foreground">6. Your Rights and Choices</h2>
          <p>You have the following rights regarding your information:</p>
          <h3 className="font-bold text-foreground">Access and Update</h3>
          <p>You may request access to or correction of your information by contacting MY HUB Leadership.</p>
          <h3 className="font-bold text-foreground">Opt-Out</h3>
          <p>Participation in MY HUB is voluntary. You may leave the community at any time.</p>
          <h3 className="font-bold text-foreground">Data Deletion</h3>
          <p>
            You may request deletion of your personal data. Upon verified request, we will remove
            your information from our records, except where retention is legally required.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-xl font-bold text-foreground">
            7. Third-Party Links and Integrations
          </h2>
          <p>
            MY HUB may integrate with third-party services related to trucking simulation platforms
            and community tools. These external platforms operate under their own privacy policies.
            MY HUB is not responsible for their data practices.
          </p>
          <p>We encourage you to review their privacy policies separately.</p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-xl font-bold text-foreground">
            8. Changes to This Privacy Policy
          </h2>
          <p>
            MY HUB may update this Privacy Policy from time to time to reflect changes in our
            practices or services.
          </p>
          <p>
            Members will be notified of significant changes through Discord announcements or
            official communication channels. Continued participation in MY HUB after such updates
            constitutes acceptance of the revised Privacy Policy.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-xl font-bold text-foreground">9. Contact Information</h2>
          <p>
            If you have any questions, concerns, or data requests regarding this Privacy Policy,
            please contact MY HUB Leadership through our official Discord server.
          </p>
          <div className="rounded-xl border border-border/50 bg-bg/50 p-6">
            <h3 className="mb-3 font-heading text-lg font-semibold text-foreground">Reach Out To Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="font-bold text-primary">•</span>
                <span>Website: Contact the Management Team using the email below.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-primary">•</span>
                <span>
                  Discord:{' '}
                  <a
                    href="https://discord.gg/yZrEbynww"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    https://discord.gg/yZrEbynww
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-primary">•</span>
                <span>
                  Email: Send an email to{' '}
                  <a href={`mailto:${contactEmail}`} className="text-primary hover:underline">
                    {contactEmail}
                  </a>
                  .
                </span>
              </li>
            </ul>
          </div>
        </section>

        <div className="mt-12 border-t border-border/50 pt-8 text-center">
          <p className="font-semibold text-foreground">
            By participating in MY HUB, you acknowledge that you have read, understood, and agreed
            to this Privacy Policy.
          </p>
        </div>
    </PolicyPageLayout>
  );
}
