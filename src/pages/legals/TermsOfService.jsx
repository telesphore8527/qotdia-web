import {
  FiAlertTriangle,
  FiBookOpen,
  FiCheckCircle,
  FiMail,
  FiRefreshCw,
  FiSlash,
  FiSmartphone,
  FiMapPin,
} from 'react-icons/fi';
import { SITE } from '../../config/site';
import { ContactCard, LegalLayout, LegalSection } from './LegalLayout';
import Seo from '../../components/Seo';

export default function TermsOfService() {
  return (
    <LegalLayout title="Terms of Service" subtitle={`Last updated: ${SITE.legalLastUpdated}`}>
      <Seo title="Terms of Use | Qotdia" description="The terms and conditions for using Qotdia." path="/terms" />
      <LegalSection icon={FiCheckCircle} title="1. Acceptance of terms">
        <p>
          By installing or using {SITE.name} ({SITE.url}), you agree to these terms. If you do not
          agree, please do not use the app. {SITE.name} is published by {SITE.creator}, an
          independent developer based in {SITE.country}.
        </p>
      </LegalSection>

      <LegalSection icon={FiSmartphone} title="2. The service">
        <p>
          {SITE.name} lets you read a daily quote, explore quotes by theme or author, save
          favorites and use the app offline. The service is provided free of charge and may evolve
          over time. Features can be added, changed or removed.
        </p>
      </LegalSection>

      <LegalSection icon={FiBookOpen} title="3. Quotes and content">
        <p>
          Quotes belong to their respective authors and are provided for informational and
          inspirational purposes. Some quotes are attributed to well-known people and their
          attribution may not always be verifiable.
        </p>
        <p>
          The {SITE.name} name, logo, design and code are the property of {SITE.creator}. You may
          share individual quotes with the in-app share tools. If you are a rights holder and want
          a quote reviewed or removed, contact us.
        </p>
      </LegalSection>

      <LegalSection icon={FiSlash} title="4. Acceptable use">
        <p>You agree not to:</p>
        <ul>
          <li>Attack, overload or try to gain unauthorized access to the service</li>
          <li>Bypass rate limits or access controls</li>
          <li>Copy the service at scale or resell its content without permission</li>
          <li>Use the app for unlawful purposes</li>
        </ul>
        <p>
          Developers who want programmatic access should use the official API offering and follow
          its terms.
        </p>
      </LegalSection>

      <LegalSection icon={FiAlertTriangle} title="5. Availability and disclaimer">
        <p>
          {SITE.name} is provided “as is” and “as available”, without warranties of any kind. We do
          not guarantee that the service will be uninterrupted or error-free, or that the content
          will suit your particular needs.
        </p>
        <p>
          Your favorites are stored on your device only. If you clear your browser data or
          uninstall the app, they are deleted and we cannot recover them. Use the export feature in
          Settings to keep a backup.
        </p>
      </LegalSection>

      <LegalSection icon={FiAlertTriangle} title="6. Limitation of liability">
        <p>
          To the extent permitted by law, {SITE.creator} is not liable for any indirect or
          consequential damage, or for any loss of data, resulting from your use of {SITE.name}.
        </p>
      </LegalSection>

      <LegalSection icon={FiRefreshCw} title="7. Changes and termination">
        <p>
          We may update these terms from time to time. The date at the top of this page shows the
          latest version, and continued use of the app means you accept the updated terms. We may
          suspend access for anyone who misuses the service. You can stop using {SITE.name} at any
          time by uninstalling it.
        </p>
      </LegalSection>

      <LegalSection icon={FiMapPin} title="8. Governing law">
        <p>
          These terms are governed by the laws of {SITE.country}. Any dispute will first be handled
          in good faith by contacting us directly.
        </p>
      </LegalSection>

      <LegalSection icon={FiMail} title="9. Contact">
        <ContactCard
          subject="Qotdia – Terms question"
          description="Questions about these terms or a content request? Get in touch."
        />
      </LegalSection>
    </LegalLayout>
  );
}
