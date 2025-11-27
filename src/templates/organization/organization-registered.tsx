
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import { Footer, Header } from '../components';
import {
  container,
  divider,
  greeting,
  main,
  noteText,
  paragraph,
  section,
} from '../styles/common';

const infoBox = {
  textAlign: 'center' as const,
  backgroundColor: '#eff6ff',
  border: '2px solid #3b82f6',
  borderRadius: '8px',
  padding: '20px',
  margin: '20px 0',
};

const infoTitle = {
  color: '#1e40af',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 10px 0',
};

const infoText = {
  color: '#333',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '5px 0',
};

interface OrgRegisteredEmailProps {
  organizationName: string;
  ownerName: string;
}

export const OrganizationRegisteredEmail = ({
  organizationName,
  ownerName,
}: OrgRegisteredEmailProps) => {
  const previewText = `Your organization registration has been received`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Header title="Organization Registration Received" />
          <Section style={section}>
            <Text style={greeting}>
              Hi {ownerName},
            </Text>
            <Text style={paragraph}>
              Thank you for registering your organization with CertChain! We have successfully
              received your registration for:
            </Text>
            <Section style={infoBox}>
              <Text style={infoTitle}>
                Organization Name
              </Text>
              <Text style={infoText}>
                {organizationName}
              </Text>
            </Section>
            <Text style={paragraph}>
              Your registration is currently being reviewed by our team. This process typically
              takes 1-3 business days. We will notify you via email once your organization has
              been approved or if we need any additional information.
            </Text>
            <Hr style={divider} />
            <Text style={paragraph}>
              <strong>What happens next?</strong>
            </Text>
            <Text style={paragraph}>
              • Our team will verify your organization details
              <br />
              • You will receive an email notification with the review result
              <br />
              • Upon approval, you'll get your account credentials to access the platform
            </Text>
            <Text style={noteText}>
              If you have any questions or need to update your information, please contact our
              support team.
            </Text>
          </Section>
          <Footer />
        </Container>
      </Body>
    </Html>
  );
};