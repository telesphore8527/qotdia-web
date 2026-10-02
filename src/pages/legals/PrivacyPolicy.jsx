import {
  FiBell,
  FiDatabase,
  FiGlobe,
  FiMail,
  FiRefreshCw,
  FiServer,
  FiShield,
  FiSliders,
  FiUsers,
} from 'react-icons/fi';
import { SITE } from '../../config/site';
import { ContactCard, LegalLayout, LegalSection } from './LegalLayout';
import Seo from '../../components/Seo';

export default function PrivacyPolicy() {
  return (
    <LegalLayout title="Privacy Policy" subtitle={`Last updated: ${SITE.legalLastUpdated}`}>
      <Seo title="Privacy Policy | Qotdia" description="How Qotdia handles your data. Read our privacy policy." path="/privacy" />

      <div className="legal-highlight">
        <FiShield size={20} className="legal-highlight__icon" aria-hidden="true" />
        <p>
          <strong>In short:</strong> {SITE.name} has no accounts and no analytics. Your
          favorites and settings stay on your device. We do not collect personal data about you.
        </p>
      </div>

      <LegalSection icon={FiDatabase} title="1. Data stored on your device">
        <p>
          {SITE.name} stores the following information locally in your browser, using IndexedDB
          (localForage) and localStorage:
        </p>
        <ul>
          <li>Your saved favorite quotes</li>
          <li>Your preferences: theme, language and notification settings</li>
          <li>Cached quotes for offline reading</li>
          <li>Your local reading streak</li>
        </ul>
        <p>
          This data is <strong>never sent to us</strong>. You can export your favorites or clear
          the cache from Settings. Clearing your browser data or uninstalling the app removes
          everything.
        </p>
      </LegalSection>

      <LegalSection icon={FiServer} title="2. Data processed by our server">
        <p>
          To load new quotes, the app sends requests to the {SITE.name} API. Like any web server,
          it may record standard technical information for each request:
        </p>
        <ul>
          <li>IP address</li>
          <li>Date and time of the request</li>
          <li>Requested endpoint and browser type</li>
        </ul>
        <p>
          We use this only to keep the service secure, apply rate limits, prevent abuse and fix
          errors. We keep it only as long as needed for these purposes. We do not use it to
          identify you, build a profile or show advertising.
        </p>
      </LegalSection>

      <LegalSection icon={FiBell} title="3. Notifications">
        <p>
          The daily quote reminder is optional. It is scheduled locally by your browser, and it
          only works after you grant permission. You can turn it off in Settings or in your
          browser's site settings at any time.
        </p>
      </LegalSection>

      <LegalSection icon={FiGlobe} title="4. Cookies and third parties">
        <p>
          {SITE.name} does not use advertising or tracking cookies, and it does not include
          third-party analytics or advertising tools.
        </p>
        <p>
          The app and API are delivered through a hosting provider, which may process technical
          data (such as your IP address) to serve the content. The API is also offered to
          developers through RapidAPI. That access is separate from this app and is governed by
          RapidAPI's own terms and privacy policy.
        </p>
      </LegalSection>

      <LegalSection icon={FiSliders} title="5. Your choices">
        <p>
          Because your personal content lives on your device, you control it directly: view,
          export or delete your favorites and cache from Settings. For any question about data
          handled by our server, contact us and we will respond.
        </p>
      </LegalSection>

      <LegalSection icon={FiUsers} title="6. Children">
        <p>
          {SITE.name} is a general-audience app and is not directed at young children. We do not
          knowingly collect personal data from anyone, including children.
        </p>
      </LegalSection>

      <LegalSection icon={FiRefreshCw} title="7. Changes to this policy">
        <p>
          If this policy changes, we will update the date at the top of this page. Significant
          changes will also be announced in the app.
        </p>
      </LegalSection>

      <LegalSection icon={FiMail} title="8. Contact">
        <ContactCard
          subject="Qotdia – Privacy question"
          description={`Questions about this policy? Contact ${SITE.creator}, the publisher of ${SITE.name}.`}
        />
      </LegalSection>
    </LegalLayout>
  );
}
