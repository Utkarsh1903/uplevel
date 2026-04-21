import { usePageTitle } from '../hooks/usePageTitle';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-lg font-bold text-white mb-3">{title}</h2>
    <div className="text-slate-400 text-sm leading-relaxed space-y-3">{children}</div>
  </div>
);

export default function PrivacyPolicy() {
  usePageTitle('Privacy Policy');

  return (
    <div className="min-h-screen bg-mesh" style={{ color: 'var(--c-text-1)' }}>
      <nav className="flex items-center justify-between px-6 py-4 max-w-4xl mx-auto">
        <Link to="/" className="flex items-center gap-2.5">
          <Logo size={28} />
          <span className="font-bold text-white text-lg tracking-tight">UpLevel</span>
        </Link>
        <Link to="/" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
          ← Back to home
        </Link>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-10 fade-in">
        <div className="mb-10">
          <h1 className="text-3xl font-extrabold text-white mb-2">Privacy Policy</h1>
          <p className="text-slate-500 text-sm font-mono">Last updated: April 2025</p>
        </div>

        <div className="glass rounded-2xl p-8">

          <Section title="1. Introduction">
            <p>
              UpLevel ("we", "us", "our", "the Platform") operated by Utkarsh Srivastava and
              Pranjal Srivastava, is committed to handling your personal information responsibly.
              This Privacy Policy explains what data we collect, why we collect it, how we use it,
              and your rights with respect to it.
            </p>
            <p>
              By using UpLevel at uplevel.co.in, you acknowledge that you have read and understood
              this Privacy Policy and consent to the collection and use of your information as
              described herein. If you do not agree, please discontinue use of the Service.
            </p>
            <p>
              We reserve the right to modify this Privacy Policy at any time. Changes will be
              effective immediately upon posting. Continued use of the Service constitutes your
              acceptance of the updated policy.
            </p>
          </Section>

          <Section title="2. Information We Collect">
            <p>We collect the following categories of information:</p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                <span className="text-white">Account Information</span> — your name, email address,
                and profile photo, obtained via Google Sign-In at the time of account creation.
              </li>
              <li>
                <span className="text-white">Profile Information</span> — current role, target role,
                current company, and years of experience that you voluntarily provide in your profile.
              </li>
              <li>
                <span className="text-white">Progress Data</span> — DSA topics marked as done or
                learning, roadmap phase completion, daily grind session logs including problems
                solved, study minutes, mood, and optional notes.
              </li>
              <li>
                <span className="text-white">LeetCode Statistics</span> — Easy, Medium, and Hard
                solve counts fetched from your public LeetCode profile, only when you explicitly
                provide your LeetCode username and initiate a sync.
              </li>
              <li>
                <span className="text-white">Premium Request Information</span> — name, contact
                details (WhatsApp number, email, or LinkedIn), and any message you submit when
                requesting Premium access.
              </li>
              <li>
                <span className="text-white">Usage & Technical Data</span> — pages visited, features
                used, browser type, device type, and IP address, collected automatically via Vercel
                hosting infrastructure.
              </li>
            </ul>
          </Section>

          <Section title="3. How We Use Your Information">
            <p>We use the information we collect for the following purposes:</p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>To provide, operate, and maintain the Service</li>
              <li>To personalise your dashboard, progress tracking, and recommendations</li>
              <li>To display your rank and profile on the community leaderboard (only if you opt in)</li>
              <li>To contact you regarding your Premium access request via the contact method you provided</li>
              <li>To analyse aggregate, anonymised usage patterns to improve the platform</li>
              <li>To detect, prevent, and address technical issues, abuse, and fraud</li>
              <li>To enforce our Terms of Service</li>
              <li>To comply with applicable legal obligations</li>
            </ul>
            <p>
              We do not sell, rent, trade, or otherwise transfer your personal information to any
              third party for their own marketing or commercial purposes.
            </p>
          </Section>

          <Section title="4. Legal Basis for Processing">
            <p>
              We process your personal data on the following legal bases under applicable Indian
              law (including the Information Technology Act, 2000 and related rules):
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li><span className="text-white">Consent</span> — you have given clear consent by choosing to use the Service and sign in</li>
              <li><span className="text-white">Contractual necessity</span> — processing is necessary to fulfil our service obligations to you</li>
              <li><span className="text-white">Legitimate interests</span> — to operate, improve, and secure the platform</li>
            </ul>
          </Section>

          <Section title="5. Third-Party Service Providers">
            <p>
              We share data with the following third-party providers solely to operate the Service.
              Each provider is contractually bound to protect your data and use it only as directed:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>
                <span className="text-white">Google OAuth (Google LLC)</span> — used for
                authentication. We receive your name, email, and profile photo from Google.
                Google's{' '}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">Privacy Policy</a>{' '}
                governs data processed on their end.
              </li>
              <li>
                <span className="text-white">Supabase</span> — our backend database and
                authentication infrastructure. Your data is stored on Supabase's servers (hosted
                on AWS). Their{' '}
                <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">Privacy Policy</a>{' '}
                applies.
              </li>
              <li>
                <span className="text-white">Vercel Inc.</span> — our hosting and deployment
                platform. Standard server access logs including IP addresses may be collected by
                Vercel. Their{' '}
                <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">Privacy Policy</a>{' '}
                applies.
              </li>
              <li>
                <span className="text-white">LeetCode</span> — we fetch data from your public
                LeetCode profile via their API only when you explicitly provide your username and
                click Sync. We do not have access to your LeetCode account credentials.
              </li>
            </ul>
            <p>
              We are not responsible for the privacy practices of any third-party services. We
              encourage you to review their privacy policies independently.
            </p>
          </Section>

          <Section title="6. Community Leaderboard">
            <p>
              The community leaderboard is strictly opt-in. Only if you explicitly enable "Show me
              on the Leaderboard" in Settings will your display name, avatar, and aggregate score
              be visible to other logged-in users of the platform.
            </p>
            <p>
              You may opt out at any time from Settings. Your information will be removed from the
              public leaderboard immediately upon opting out. Detailed progress data (individual
              topics, logs, notes) is never publicly visible regardless of leaderboard status.
            </p>
          </Section>

          <Section title="7. Data Retention">
            <p>
              We retain your personal data for as long as your account is active or as necessary
              to provide the Service. If you request deletion of your account, we will delete or
              anonymise your personal data within 30 days, except where we are required to retain
              it for legal, compliance, or fraud prevention purposes.
            </p>
            <p>
              Aggregate, anonymised usage data may be retained indefinitely as it cannot be used
              to identify any individual user.
            </p>
          </Section>

          <Section title="8. Data Security">
            <p>
              We implement commercially reasonable technical and organisational measures to protect
              your personal data against unauthorised access, alteration, disclosure, or destruction.
              These include:
            </p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li>All data is transmitted over HTTPS/TLS encryption</li>
              <li>Row Level Security (RLS) ensures each user can only access their own data</li>
              <li>No passwords are stored — authentication is handled entirely by Google OAuth</li>
              <li>Database access is restricted to authenticated, authorised service roles only</li>
            </ul>
            <p>
              However, no method of transmission over the internet or electronic storage is 100%
              secure. We cannot guarantee absolute security of your data, and you use the Service
              at your own risk.
            </p>
          </Section>

          <Section title="9. Children's Privacy">
            <p>
              The Service is not directed at individuals under the age of 18. We do not knowingly
              collect personal information from minors. If we become aware that a minor has provided
              us with personal data without parental consent, we will delete it promptly. If you
              believe this has occurred, please contact us immediately.
            </p>
          </Section>

          <Section title="10. Your Rights">
            <p>Subject to applicable law, you have the following rights regarding your personal data:</p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li><span className="text-white">Access</span> — request a copy of the personal data we hold about you</li>
              <li><span className="text-white">Correction</span> — request correction of inaccurate or incomplete data</li>
              <li><span className="text-white">Deletion</span> — request deletion of your account and associated personal data</li>
              <li><span className="text-white">Opt-out</span> — opt out of the leaderboard at any time via Settings</li>
              <li><span className="text-white">Withdraw consent</span> — disconnect your LeetCode integration at any time</li>
            </ul>
            <p>
              To exercise any of these rights, contact us at the email below. We will respond to
              verified requests within 30 days. We may require you to verify your identity before
              processing your request.
            </p>
          </Section>

          <Section title="11. Cookies & Local Storage">
            <p>
              UpLevel uses browser local storage (not cookies) to store your theme preference
              (dark/light mode) and session tokens managed by Supabase Auth. We do not use
              third-party tracking cookies or advertising cookies of any kind.
            </p>
          </Section>

          <Section title="12. Limitation of Liability for Data Breaches">
            <p>
              While we take reasonable precautions to protect your data, in the event of an
              unauthorised breach beyond our reasonable control, our liability shall be limited
              to the extent permitted under applicable Indian law. We shall not be liable for
              indirect, consequential, or punitive damages arising from any data breach.
            </p>
          </Section>

          <Section title="13. Governing Law">
            <p>
              This Privacy Policy is governed by the laws of India, including the Information
              Technology Act, 2000, and the Information Technology (Reasonable Security Practices
              and Procedures and Sensitive Personal Data or Information) Rules, 2011.
            </p>
            <p>
              Any disputes arising from this Privacy Policy shall be subject to the exclusive
              jurisdiction of competent courts in India.
            </p>
          </Section>

          <Section title="14. Contact Us">
            <p>
              For any privacy-related questions, access requests, or concerns, please contact us at:
            </p>
            <p>
              <span className="text-white">Email: </span>
              <a href="mailto:sri.utkarsh1903@gmail.com" className="text-indigo-400 hover:underline">
                sri.utkarsh1903@gmail.com
              </a>
            </p>
            <p>
              We aim to respond to all legitimate privacy enquiries within 7 business days.
            </p>
          </Section>

        </div>

        <p className="text-center text-slate-600 text-xs font-mono mt-8">
          // uplevel.co.in · your data stays yours
        </p>
      </main>
    </div>
  );
}
