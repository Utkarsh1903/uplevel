import { usePageTitle } from '../hooks/usePageTitle';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

const Section = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-lg font-bold text-white mb-3">{title}</h2>
    <div className="text-slate-400 text-sm leading-relaxed space-y-3">{children}</div>
  </div>
);

export default function TermsOfService() {
  usePageTitle('Terms of Service');

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
          <h1 className="text-3xl font-extrabold text-white mb-2">Terms of Service</h1>
          <p className="text-slate-500 text-sm font-mono">Last updated: April 2025</p>
        </div>

        <div className="glass rounded-2xl p-8">

          <Section title="1. Acceptance of Terms">
            <p>
              By accessing or using UpLevel ("the Service", "the Platform") at uplevel.co.in, you
              ("User", "you") unconditionally agree to be bound by these Terms of Service ("Terms").
              If you do not agree to any part of these Terms, you must immediately discontinue use
              of the Service.
            </p>
            <p>
              UpLevel is operated by Utkarsh Srivastava and Pranjal Srivastava ("we", "us", "our",
              "Operators"), based in India. These Terms constitute a legally binding agreement between
              you and the Operators.
            </p>
            <p>
              We reserve the right to update, modify, or replace these Terms at any time at our sole
              discretion. Continued use of the Service following any changes constitutes your
              acceptance of the revised Terms. It is your responsibility to review these Terms
              periodically.
            </p>
          </Section>

          <Section title="2. Description of Service">
            <p>
              UpLevel is a career development platform designed to help Indian software engineers
              transition from service companies to product companies. The Service includes, but is
              not limited to: a DSA topic tracker, structured career roadmaps, curated learning
              resources, a daily grind room, community leaderboard, and interview preparation content.
            </p>
            <p>
              We reserve the right to modify, suspend, discontinue, or add any part of the Service
              at any time without prior notice and without liability to you. We do not guarantee that
              the Service will be available at all times or free from errors.
            </p>
          </Section>

          <Section title="3. User Accounts">
            <p>
              Access to the Service requires sign-in via a valid Google account. By signing in, you
              represent that all information you provide is accurate, current, and complete. You are
              solely responsible for all activity that occurs under your account.
            </p>
            <p>
              You must not share your account credentials with any other person. We are not liable
              for any loss or damage arising from unauthorised use of your account.
            </p>
            <p>
              We reserve the right to suspend, restrict, or permanently terminate your account at
              our sole discretion, with or without notice, for any reason including but not limited
              to violation of these Terms, suspicious activity, or misuse of the platform.
            </p>
          </Section>

          <Section title="4. Premium Access & Payment">
            <p>
              Certain features of the Service ("Premium Features") require a one-time payment of
              ₹499 (Indian Rupees). Payment is collected manually by the Operators after you submit
              a Premium access request. There are no automatic charges, recurring billing, or
              subscriptions of any kind.
            </p>
            <p>
              Premium access is activated manually by us after payment confirmation. We reserve the
              right to refuse or cancel any Premium request at our sole discretion.
            </p>
            <p>
              <span className="text-white font-semibold">No Refunds.</span> All payments are
              final and non-refundable. Once Premium access has been activated on your account, no
              refund will be issued under any circumstances, including but not limited to
              dissatisfaction with the Service, account termination, or discontinuation of the
              platform.
            </p>
            <p>
              We reserve the right to change the pricing of Premium access at any time. Price changes
              will not affect users who have already purchased Premium access.
            </p>
            <p>
              The "first 100 users get Premium free" offer is entirely at our discretion. We reserve
              the right to modify, limit, or withdraw this offer at any time without notice.
            </p>
          </Section>

          <Section title="5. Acceptable Use">
            <p>You agree not to:</p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li>Use the Service for any unlawful or fraudulent purpose</li>
              <li>Attempt to gain unauthorised access to any part of the Service or its infrastructure</li>
              <li>Scrape, reproduce, resell, or redistribute any content from the platform without our express written permission</li>
              <li>Upload or transmit viruses, malware, or any other harmful code</li>
              <li>Harass, abuse, or harm other users of the platform</li>
              <li>Use automated tools, bots, or scripts to access or interact with the Service</li>
              <li>Circumvent any access restrictions or premium gating mechanisms</li>
              <li>Reverse engineer, decompile, or attempt to extract source code from the Service</li>
            </ul>
            <p>
              Violation of any acceptable use policy may result in immediate account termination
              without notice or refund.
            </p>
          </Section>

          <Section title="6. Intellectual Property">
            <p>
              All content on UpLevel — including but not limited to articles, roadmaps, cheatsheets,
              STAR templates, salary scripts, code snippets, graphics, and any other material — is
              the exclusive intellectual property of the Operators or our licensors, and is protected
              under applicable Indian and international intellectual property laws.
            </p>
            <p>
              You are granted a limited, non-exclusive, non-transferable, revocable licence to access
              and use the content solely for your personal, non-commercial learning. This licence
              does not grant you any right to copy, reproduce, modify, distribute, sell, sublicense,
              or create derivative works from any content on the platform.
            </p>
            <p>
              Any unauthorised use of our intellectual property may result in account termination and
              legal action.
            </p>
          </Section>

          <Section title="7. User-Generated Content">
            <p>
              Any content you submit to the platform (notes, logs, profile information) remains
              your property. However, by submitting content, you grant us a worldwide, royalty-free,
              perpetual licence to use, store, and process such content solely to operate and
              improve the Service.
            </p>
          </Section>

          <Section title="8. Disclaimers & No Warranty">
            <p>
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND,
              EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY,
              FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
            </p>
            <p>
              We make no representation or warranty that the Service will be uninterrupted,
              error-free, secure, or free of viruses or other harmful components.
            </p>
            <p>
              <span className="text-white font-semibold">Career Outcomes Disclaimer.</span> We do
              not guarantee, promise, or represent that use of UpLevel will result in job placement,
              interview success, salary increases, or any specific career outcome. All outcomes
              depend entirely on individual effort, aptitude, market conditions, and employer
              decisions that are beyond our control. Any success stories shared on the platform are
              individual results and are not typical.
            </p>
          </Section>

          <Section title="9. Limitation of Liability">
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE OPERATORS SHALL NOT BE LIABLE
              FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES
              ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF OR INABILITY TO USE THE SERVICE.
            </p>
            <p>
              In no event shall our total aggregate liability to you for all claims arising from or
              related to the Service exceed the total amount you have paid us in the twelve (12)
              months immediately preceding the event giving rise to the claim, or ₹499, whichever
              is lower.
            </p>
            <p>
              This limitation applies regardless of the form of action, whether in contract, tort,
              negligence, strict liability, or otherwise, and even if we have been advised of the
              possibility of such damages.
            </p>
          </Section>

          <Section title="10. Indemnification">
            <p>
              You agree to indemnify, defend, and hold harmless the Operators, their affiliates,
              officers, agents, and successors from any claims, liabilities, damages, losses, and
              expenses (including reasonable legal fees) arising out of or in any way connected with
              your access to or use of the Service, your violation of these Terms, or your
              infringement of any third-party rights.
            </p>
          </Section>

          <Section title="11. Third-Party Links & Services">
            <p>
              The Service may contain links to third-party websites, tools, or services (such as
              LeetCode, YouTube, or external articles). We have no control over and assume no
              responsibility for the content, privacy policies, or practices of any third-party
              services. Accessing third-party links is entirely at your own risk.
            </p>
          </Section>

          <Section title="12. Termination">
            <p>
              We may terminate or suspend your access to the Service immediately, without prior
              notice or liability, for any reason, including if you breach these Terms. Upon
              termination, your right to use the Service will immediately cease.
            </p>
            <p>
              You may terminate your account at any time by contacting us. Termination does not
              entitle you to a refund of any amounts paid.
            </p>
            <p>
              Provisions of these Terms that by their nature should survive termination shall
              survive, including ownership provisions, warranty disclaimers, indemnification, and
              limitations of liability.
            </p>
          </Section>

          <Section title="13. Governing Law & Dispute Resolution">
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India,
              without regard to its conflict of law provisions.
            </p>
            <p>
              Any dispute arising from or relating to these Terms or the Service shall first be
              attempted to be resolved through good-faith negotiation. If unresolved, disputes shall
              be subject to the exclusive jurisdiction of the competent courts in India.
            </p>
          </Section>

          <Section title="14. Severability">
            <p>
              If any provision of these Terms is found to be unenforceable or invalid under
              applicable law, that provision will be limited or eliminated to the minimum extent
              necessary, and the remaining provisions of these Terms will continue in full force
              and effect.
            </p>
          </Section>

          <Section title="15. Contact Us">
            <p>
              For any questions, concerns, or legal notices regarding these Terms, please contact
              us at{' '}
              <a href="mailto:sri.utkarsh1903@gmail.com" className="text-indigo-400 hover:underline">
                sri.utkarsh1903@gmail.com
              </a>
            </p>
          </Section>

        </div>

        <p className="text-center text-slate-600 text-xs font-mono mt-8">
          // uplevel.co.in · built for indian engineers
        </p>
      </main>
    </div>
  );
}
