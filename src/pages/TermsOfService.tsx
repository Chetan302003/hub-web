import { Link } from 'react-router-dom';
import { PolicyPageLayout } from '@/components/layout/PolicyPageLayout';

const contactEmail = 'myhub@chetanmahajan.site';

export default function TermsOfService() {
  return (
    <PolicyPageLayout
      title="MY HUB Tracker Terms of Service"
      effectiveDate="25/09/2025"
      lastUpdated="18/11/2026"
    >
      <p>
        Welcome to MY HUB Tracker, a job and telemetry tracking service for Euro Truck Simulator 2
        (ETS2) and American Truck Simulator (ATS). MY HUB Tracker helps virtual truckers record
        their jobs, follow their statistics, and share their progress with the community.
      </p>
      <p>
        By creating an account, using our website, installing or using our tracker client, or
        joining our Discord server, you agree to the following Terms of Service ("ToS"). Please
        read these terms carefully. If you do not agree, do not continue to use MY HUB Tracker.
      </p>

      <section className="space-y-3">
        <h2 className="font-heading text-xl font-bold text-foreground">1. Acceptance of Terms</h2>
        <p>
          By accessing this website, creating an account, or using any MY HUB Tracker service
          (including the tracker client, live map, and Discord bot), you agree to comply with and
          be bound by these Terms of Service and our Privacy Policy.
        </p>
        <p>
          Violation of any terms may lead to warnings, suspension, or permanent removal of your
          account.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-xl font-bold text-foreground">2. Eligibility Requirements</h2>
        <h3 className="font-bold text-foreground">Age Requirement</h3>
        <p>You must be at least 14 years old to create an account and use the tracker.</p>
        <h3 className="font-bold text-foreground">Game Requirements</h3>
        <p>
          To use the tracker client you must own a legitimate copy of Euro Truck Simulator 2
          (ETS2) and/or American Truck Simulator (ATS).
        </p>
        <h3 className="font-bold text-foreground">Account Information</h3>
        <p>
          You agree to provide accurate information when registering and to keep it up to date.
          You may not create accounts on behalf of others or hold multiple accounts to avoid a
          suspension.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-xl font-bold text-foreground">3. Use of the Tracker</h2>
        <h3 className="font-bold text-foreground">Tracker Client and API Keys</h3>
        <p>
          The tracker client reads data from your game and sends it to our servers. Your API key
          or access token is personal to you. You must not share it, sell it, or allow another
          person to use it.
        </p>
        <h3 className="font-bold text-foreground">Accuracy and Fair Use</h3>
        <p>You agree not to:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Edit, fake, or manipulate job data, distance, income, or other statistics</li>
          <li>Use cheats, exploits, or modified clients to gain false rankings</li>
          <li>Overload, scrape, or attempt to disrupt or reverse engineer the service</li>
          <li>Attempt to access accounts or data that do not belong to you</li>
        </ul>
        <p>
          We may reject, correct, or remove data that we believe is inaccurate or fraudulent,
          and adjust related statistics and leaderboards.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-xl font-bold text-foreground">4. User Conduct</h2>
        <p>All users agree to follow MY HUB’s Code of Conduct, including but not limited to:</p>
        <h3 className="font-bold text-foreground">Respectful Communication</h3>
        <p>Users must interact respectfully in:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Discord channels</li>
          <li>Profiles, comments, and any other public areas of the tracker</li>
          <li>Community events</li>
        </ul>
        <p>
          Discriminatory language, harassment, threats, hate speech, or abusive behavior is
          strictly prohibited.
        </p>
        <h3 className="font-bold text-foreground">In-Game Behavior</h3>
        <p>
          Users are expected to follow the rules of the platforms they play on (including
          TruckersMP, where applicable), drive responsibly, and avoid trolling or intentional
          disruption of other players.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-xl font-bold text-foreground">5. Discord Server Rules</h2>
        <h3 className="font-bold text-foreground">Support and Updates</h3>
        <p>
          Our Discord server is used for announcements, support, and bot features. Joining it is
          recommended so you can receive updates about the tracker.
        </p>
        <h3 className="font-bold text-foreground">Prohibited Content</h3>
        <p>The following is strictly forbidden:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>NSFW content</li>
          <li>Illegal content</li>
          <li>Spam or mass mentions</li>
          <li>Malicious links</li>
        </ul>
        <p>
          Additional rules may be listed within the Discord server and are considered part of
          these Terms.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-xl font-bold text-foreground">6. User Content</h2>
        <p>
          Parts of MY HUB Tracker may let you post information such as profile details, usernames,
          notes, comments, or VTC information ("Content"). Content reflects the views of the
          person who posted it, not those of MY HUB Tracker. We do not review Content before it
          appears, and to the extent permitted by law we are not liable for it.
        </p>
        <p>You confirm that your Content:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Is yours to post, and does not infringe the rights of any third party</li>
          <li>Is not defamatory, offensive, indecent, or otherwise unlawful</li>
          <li>Does not invade anyone’s privacy</li>
          <li>Is not used to advertise, solicit business, or carry out unlawful activity</li>
        </ul>
        <p>
          You grant MY HUB Tracker a non-exclusive license to use, reproduce, and display your
          Content in order to operate the service. We may monitor and remove any Content that
          we consider inappropriate or that breaches these Terms.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-xl font-bold text-foreground">7. Intellectual Property and License</h2>
        <p>
          Unless otherwise stated, MY HUB Tracker and its licensors own the intellectual property
          rights in the website, tracker client, branding, and material provided through the
          service. You may use them for your own personal use, subject to these Terms.
        </p>
        <p>You must not:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Republish, sell, rent, or sub-license material from MY HUB Tracker</li>
          <li>Reproduce, duplicate, copy, or redistribute our material or software without permission</li>
        </ul>
        <h3 className="font-bold text-foreground">Third-Party Trademarks</h3>
        <p>
          Euro Truck Simulator 2 and American Truck Simulator belong to SCS Software. Steam is a
          trademark of Valve Corporation, Discord is a trademark of Discord Inc., and TruckersMP
          belongs to its respective owners. MY HUB Tracker is an independent community project
          and is not affiliated with, endorsed by, or sponsored by any of them.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-xl font-bold text-foreground">8. Cookies</h2>
        <p>
          We use cookies and similar technologies to keep you logged in, remember your
          preferences, and understand how the website is used. By using MY HUB Tracker, you agree
          to the use of cookies as described in our Privacy Policy.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-xl font-bold text-foreground">9. Links and Framing</h2>
        <p>
          You may link to our website, provided the link is not deceptive, does not falsely
          suggest that we sponsor or endorse you or your products, and fits the context of your
          site. You may not use our logo or artwork for linking without our permission.
        </p>
        <p>
          Without our prior written permission, you may not create frames around our pages that
          alter their visual presentation or appearance. We may ask you to remove any link to our
          website at any time, and you agree to do so promptly.
        </p>
        <p>
          We are not responsible for the content of websites that link to us or that we link to.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-xl font-bold text-foreground">
          10. Gaming Accounts and Responsibility
        </h2>
        <h3 className="font-bold text-foreground">Account Security</h3>
        <p>Users are responsible for securing their:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>MY HUB Tracker account and API keys</li>
          <li>Steam account</li>
          <li>Discord account</li>
          <li>TruckersMP account (if linked)</li>
        </ul>
        <p>MY HUB Tracker is not responsible for compromised accounts.</p>
        <h3 className="font-bold text-foreground">Ban Accountability</h3>
        <p>
          Users are responsible for any bans or penalties received on TruckersMP, Steam, or
          related platforms as a result of their own actions.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-xl font-bold text-foreground">11. Privacy</h2>
        <p>
          MY HUB Tracker collects the information necessary to operate the service, including:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Account details such as email, Discord username and ID, and Steam or TruckersMP ID</li>
          <li>Job, telemetry, and gameplay statistics</li>
          <li>Usage and technical data</li>
        </ul>
        <p>
          Please read our Privacy Policy for full details on what we collect and how we use it.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-xl font-bold text-foreground">12. Modifications to Terms</h2>
        <p>
          MY HUB Tracker reserves the right to modify or update these Terms of Service at any
          time.
        </p>
        <p>
          Significant changes will be announced via the website, Discord, or official
          communication channels. Continued use after updates constitutes acceptance of the
          revised Terms.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-xl font-bold text-foreground">
          13. Suspension and Termination
        </h2>
        <h3 className="font-bold text-foreground">Voluntary Termination</h3>
        <p>
          You may stop using MY HUB Tracker and request deletion of your account at any time by
          contacting the Management Team.
        </p>
        <h3 className="font-bold text-foreground">Involuntary Termination</h3>
        <p>MY HUB Tracker reserves the right to suspend or remove accounts that:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Violate these Terms</li>
          <li>Submit false or manipulated data</li>
          <li>Engage in misconduct or abuse of the service or community</li>
        </ul>
        <p>
          Affected users may appeal by contacting the Management Team, if permitted by the
          Management Team.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-xl font-bold text-foreground">
          14. Disclaimer of Warranties
        </h2>
        <p>
          MY HUB Tracker is a community-based service provided for entertainment purposes only,
          on an "as is" and "as available" basis.
        </p>
        <p>We do not guarantee:</p>
        <ul className="list-disc space-y-1 pl-6">
          <li>That the information on the website or the statistics shown are complete or accurate</li>
          <li>Continuous, uninterrupted, or error-free service availability</li>
          <li>That your data will never be lost, so you should not rely on the tracker as your only record</li>
          <li>Rewards or specific rankings</li>
        </ul>
        <p>
          To the maximum extent permitted by law, we exclude all representations, warranties, and
          conditions relating to the service. Nothing in these Terms limits or excludes liability
          for death or personal injury, fraud, or anything that cannot be limited or excluded
          under applicable law.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-xl font-bold text-foreground">
          15. Limitation of Liability
        </h2>
        <p>
          To the extent permitted by law, MY HUB Tracker is not liable for:
        </p>
        <ul className="list-disc space-y-1 pl-6">
          <li>Gameplay-related losses or in-game consequences</li>
          <li>Loss of data, statistics, or leaderboard positions</li>
          <li>Discord-related disputes</li>
          <li>Platform or third-party outages</li>
          <li>Indirect or consequential damages</li>
        </ul>
        <p>
          As the service is provided free of charge, we are not liable for any loss or damage of
          any nature, except where the law does not allow us to exclude it. All users assume
          responsibility for their actions within gaming platforms and community spaces.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-xl font-bold text-foreground">16. Governing Law</h2>
        <p>
          These Terms are governed by the laws of India. Any dispute arising from them is subject
          to the jurisdiction of the courts of India, unless local consumer law gives you the
          right to bring a claim elsewhere.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="font-heading text-xl font-bold text-foreground">17. Contact Information</h2>
        <p>
          For questions regarding these Terms, please contact the MY HUB Management Team through
          our official Discord server.
        </p>
        <p>
          For any complaints, concerns, or queries regarding our services, users may contact the
          Management Team using the email below.
        </p>
        <div className="rounded-xl border border-border/50 bg-bg/50 p-6">
          <h3 className="mb-3 font-heading text-lg font-semibold text-foreground">Reach Out To Us</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <span className="font-bold text-primary">•</span>
              <span>
                Website:{' '}
                <Link to="/contact" className="text-primary hover:underline">
                  Contact Us
                </Link>
              </span>
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
          By using MY HUB Tracker, you acknowledge that you have read, understood, and agreed to
          these Terms of Service.
        </p>
      </div>
    </PolicyPageLayout>
  );
}