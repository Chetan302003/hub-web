import { Link } from 'react-router-dom';
import { PolicyPageLayout } from '@/components/layout/PolicyPageLayout';

const contactEmail = 'myhub@chetanmahajan.site';

export default function PrivacyPolicy() {
  return (
    <PolicyPageLayout
      title="MY HUB Tracker Privacy Policy"
      effectiveDate="15/02/2026"
      lastUpdated="18/11/2026"
    >
      <p>
        MY HUB Tracker ("we," "our," or "us") respects your privacy and is committed to protecting
        any personal information we collect. This Privacy Policy explains what information we
        collect, how we use it, and how you can control your personal information in connection
        with your use of the MY HUB Tracker, a job and telemetry tracking service for Euro Truck
        Simulator 2 (ETS2) and American Truck Simulator (ATS), including our website, tracker
        client, and Discord server.
      </p>
      <p>
        This Privacy Policy applies only to our online activities through the MY HUB Tracker
        website, tracker client, and related services. It does not apply to information collected
        offline or through other websites or channels.
      </p>
      <p>
        By creating an account and using the MY HUB Tracker, you consent to this Privacy Policy
        and agree to the collection and use of information in accordance with its terms.
      </p>

      <section className="space-y-3">
        <h2 className="font-heading text-xl font-bold text-foreground">1. Information We Collect</h2>
        <p>
          To operate the tracker and provide its features, we may collect the following types of
          information:
        </p>
        <h3 className="font-bold text-foreground">Basic Account Information</h3>
        <ul className="list-disc space-y-1 pl-6">
          <li>Email address (for Login purposes)</li>
          <li>Discord username and Discord User ID (if you log in or link your account with Discord)</li>
          <li>Steam ID and/or TruckersMP ID (if you link them)</li>
          <li>In-game username and profile details you choose to add</li>
          <li>Virtual Trucking Company (VTC) name (if applicable)</li>
          <li>API keys or access tokens generated for your tracker client</li>
        </ul>
        <h3 className="font-bold text-foreground">Job and Telemetry Data</h3>
        <p>
          When you use the tracker client while playing, it reads data from the game and sends it
          to our servers. This may include:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Job details: source and destination cities, companies, cargo, and cargo weight</li>
          <li>Distance driven, job duration, and route information</li>
          <li>Income, expenses, fuel usage, and fines</li>
          <li>Truck and trailer details, and damage taken</li>
          <li>Speed, speeding events, and other driving events</li>
          <li>In-game location and position (for live map and live job features)</li>
          <li>Game version, game (ETS2 or ATS), and active mods where reported by the client</li>
        </ul>
        <h3 className="font-bold text-foreground">Gameplay Statistics</h3>
        <p>Based on the data above, we may calculate and store:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Hours played in ETS2 and ATS</li>
          <li>Total jobs completed, total distance, and total earnings</li>
          <li>Driving scores, ratings, and achievements</li>
          <li>Leaderboard rankings</li>
        </ul>
        <h3 className="font-bold text-foreground">Usage and Technical Data</h3>
        <p>When you use the tracker website or client, we may automatically collect:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Device, operating system, and browser type</li>
          <li>IP address</li>
          <li>Login times and session activity</li>
          <li>Error logs and performance data</li>
        </ul>
        <h3 className="font-bold text-foreground">Log Files</h3>
        <p>
          Like most websites, we use standard server log files. These may record IP addresses,
          browser type, Internet Service Provider (ISP), date and time stamps, referring and exit
          pages, and the number of clicks. We use this information to analyze trends, administer
          the site, understand how the tracker is used, and keep it secure.
        </p>
        <h3 className="font-bold text-foreground">Cookies and Similar Technologies</h3>
        <p>
          We use cookies and local storage to keep you logged in, remember your preferences, and
          understand how the website is used. You can disable cookies in your browser settings,
          but some parts of the tracker may not work properly without them.
        </p>
        <h3 className="font-bold text-foreground">Information You Provide Directly</h3>
        <p>
          If you contact us, we may receive your name, email address, the contents of your message
          and any attachments, and any other information you choose to provide.
        </p>
        <h3 className="font-bold text-foreground">Communication Records</h3>
        <p>We may retain communication records related to the tracker, including:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Support requests and emails you send us</li>
          <li>Direct messages or notifications sent by our bot</li>
          <li>Announcements and administrative communications</li>
        </ul>
        <h3 className="font-bold text-foreground">Behavioral Data</h3>
        <ul className="list-disc space-y-1 pl-6">
          <li>Activity within the tracker</li>
          <li>Reports of cheating, fraudulent data, or misuse of the tracker (if applicable)</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-xl font-bold text-foreground">
          2. How We Use Your Information
        </h2>
        <p>We use your information solely to operate and improve the MY HUB Tracker. Specifically, we may use your information for:</p>
        <h3 className="font-bold text-foreground">Account Management</h3>
        <ul className="list-disc space-y-1 pl-6">
          <li>Creating and securing your account</li>
          <li>Verifying your login and authenticating your tracker client</li>
          <li>Managing your profile and settings</li>
        </ul>
        <h3 className="font-bold text-foreground">Tracking and Statistics</h3>
        <ul className="list-disc space-y-1 pl-6">
          <li>Recording, validating, and displaying your jobs and driving data</li>
          <li>Calculating totals, scores, and progress</li>
          <li>Showing live job status and location on the live map</li>
          <li>Syncing your data across sessions and devices</li>
        </ul>
        <h3 className="font-bold text-foreground">Safety and Compliance</h3>
        <ul className="list-disc space-y-1 pl-6">
          <li>Enforcing our Terms of Service</li>
          <li>Detecting cheating, edited, or fraudulent job data</li>
          <li>Preventing abuse or misuse of the tracker</li>
        </ul>
        <h3 className="font-bold text-foreground">Communication</h3>
        <ul className="list-disc space-y-1 pl-6">
          <li>Sending service announcements and updates</li>
          <li>Sending account-related emails or Discord notifications</li>
          <li>Providing support</li>
        </ul>
        <h3 className="font-bold text-foreground">Community Features</h3>
        <ul className="list-disc space-y-1 pl-6">
          <li>Maintaining leaderboards</li>
          <li>Displaying public profiles and statistics, where enabled</li>
          <li>Recognizing achievements</li>
        </ul>
        <h3 className="font-bold text-foreground">Improvement</h3>
        <ul className="list-disc space-y-1 pl-6">
          <li>Fixing bugs and improving performance</li>
          <li>Understanding how features are used</li>
          <li>Developing new tracker features</li>
        </ul>
        <p>We do not sell or rent your personal data.</p>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-xl font-bold text-foreground">
          3. Data Sharing and Disclosure
        </h2>
        <p>
          MY HUB Tracker does not sell, trade, or transfer your personal information to outside
          parties. We may share information only in the following limited circumstances:
        </p>
        <h3 className="font-bold text-foreground">Public and Community Visibility</h3>
        <p>
          Some data, such as your username, job history, statistics, live location, and
          leaderboard position, may be visible to other users or to members of your VTC, depending
          on the features and privacy settings you use.
        </p>
        <h3 className="font-bold text-foreground">Service Providers</h3>
        <p>We may use trusted third-party services necessary to operate the tracker, such as:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Discord (for login, communication, and bot functionality)</li>
          <li>Website hosting providers</li>
          <li>Database and authentication providers</li>
          <li>Email delivery providers</li>
        </ul>
        <h3 className="font-bold text-foreground">Legal Requirements</h3>
        <p>
          We may disclose information if required by law, court order, or governmental authority,
          or to protect the rights, safety, and integrity of MY HUB Tracker and its users.
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
          <li>Operate the MY HUB Tracker and keep your account active</li>
          <li>Store your job history and statistics</li>
          <li>Comply with legal obligations</li>
        </ul>
        <p>
          Live location data is used for real-time features and is not kept longer than needed for
          them. Other data may be anonymized or deleted when no longer required.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-xl font-bold text-foreground">6. Your Rights and Choices</h2>
        <p>You have the following rights regarding your information:</p>
        <h3 className="font-bold text-foreground">Access and Update</h3>
        <p>You may request access to or correction of your information by contacting the MY HUB Management Team.</p>
        <h3 className="font-bold text-foreground">Opt-Out</h3>
        <p>
          Use of the tracker is voluntary. You may stop using the tracker client, revoke your API
          key, or stop using the service at any time.
        </p>
        <h3 className="font-bold text-foreground">Data Deletion</h3>
        <p>
          You may request deletion of your account and personal data, including your job history.
          Upon verified request, we will remove your information from our records, except where
          retention is legally required.
        </p>
        <h3 className="font-bold text-foreground">Additional Rights Under GDPR (EEA and UK Users)</h3>
        <p>If you are in the European Economic Area or the United Kingdom, you also have the right to:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Access: request a copy of your personal data</li>
          <li>Rectification: ask us to correct inaccurate or incomplete data</li>
          <li>Erasure: ask us to erase your personal data, under certain conditions</li>
          <li>Restriction: ask us to restrict how we process your data, under certain conditions</li>
          <li>Objection: object to our processing of your data, under certain conditions</li>
          <li>Portability: ask us to transfer your data to you or to another organization, under certain conditions</li>
        </ul>
        <h3 className="font-bold text-foreground">Additional Rights Under CCPA (California Residents)</h3>
        <p>If you are a California resident, you have the right to:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Request disclosure of the categories and specific pieces of personal data we have collected about you</li>
          <li>Request deletion of the personal data we have collected about you</li>
          <li>Request that we do not sell your personal data (we do not sell it)</li>
        </ul>
        <p>
          To exercise any of these rights, contact us using the details in the Contact Information
          section. We will respond to verified requests within one month.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-xl font-bold text-foreground">
          7. Third-Party Links and Integrations
        </h2>
        <p>
          MY HUB Tracker may integrate with third-party services such as Discord, Steam,
          TruckersMP, and other trucking simulation platforms and community tools. These external
          platforms operate under their own privacy policies. MY HUB Tracker is not responsible
          for their data practices.
        </p>
        <p>We encourage you to review their privacy policies separately.</p>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-xl font-bold text-foreground">
          8. Children's Privacy
        </h2>
        <p>
          MY HUB Tracker is not intended for children under the age of 13, and we do not knowingly
          collect personal information from them. We encourage parents and guardians to monitor
          their children's online activity. If you believe a child has provided personal
          information to us, please contact us and we will make reasonable efforts to remove it
          promptly.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-xl font-bold text-foreground">
          9. Changes to This Privacy Policy
        </h2>
        <p>
          MY HUB Tracker may update this Privacy Policy from time to time to reflect changes in
          our practices or services.
        </p>
        <p>
          Users will be notified of significant changes through the website, Discord
          announcements, or official communication channels. Continued use of the tracker after
          such updates constitutes acceptance of the revised Privacy Policy.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-xl font-bold text-foreground">10. Contact Information</h2>
        <p>
          If you have any questions, concerns, or data requests regarding this Privacy Policy,
          please contact the MY HUB Management Team.
        </p>
        <p>
          Reach Out To Us
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>
            Website:{' '}
            <Link to="/contact" className="text-primary underline">
              Contact Us
            </Link>
          </li>
          <li>
            Discord:{' '}
            <a
              href="https://discord.gg/yZrEbynww"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline"
            >
              https://discord.gg/yZrEbynww
            </a>
          </li>
          <li>
            Email: Send an email to{' '}
            <a href={`mailto:${contactEmail}`} className="text-primary underline">
              {contactEmail}
            </a>
            .
          </li>
        </ul>
      </section>

      <p>
        By using the MY HUB Tracker, you acknowledge that you have read, understood, and agreed to
        this Privacy Policy.
      </p>
    </PolicyPageLayout>
  );
}