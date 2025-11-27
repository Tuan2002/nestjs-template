
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text
} from '@react-email/components';
import dayjs from 'dayjs';
import { Footer, Header } from '../components';
import {
  container,
  divider,
  greeting,
  main,
  noteText,
  paragraph,
  section
} from '../styles/common';

const errorBox = {
  backgroundColor: '#fef2f2',
  border: '2px solid #ef4444',
  borderRadius: '8px',
  padding: '20px',
  margin: '20px 0',
};

const errorTitle = {
  color: '#991b1b',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 15px 0',
};

const reasonBox = {
  backgroundColor: '#fff',
  border: '1px solid #fca5a5',
  borderRadius: '6px',
  padding: '15px',
  margin: '15px 0',
};

const reasonText = {
  color: '#333',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0',
};

const infoBox = {
  backgroundColor: '#eff6ff',
  borderLeft: '4px solid #3b82f6',
  borderRadius: '4px',
  padding: '15px',
  margin: '20px 0',
};

interface OrgRejectedEmailProps {
  organizationName: string;
  ownerName: string;
  rejectedAt: Date;
  reason: string;
}

export const OrganizationRejectedEmail = ({
  organizationName,
  ownerName,
  rejectedAt,
  reason,
}: OrgRejectedEmailProps) => {
  const previewText = `Update on your organization registration`;
  const supportEmail = 'support@vncsoft.com';

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Header title="Organization Registration Update" />
          <Section style={section}>
            <Text style={greeting}>
              Hi {ownerName},
            </Text>
            <Text style={paragraph}>
              Thank you for your interest in registering your organization with CertChain.
              After careful review, we regret to inform you that your registration for
              <strong> {organizationName}</strong> could not be approved at this time.
            </Text>
            <Section style={errorBox}>
              <Text style={errorTitle}>
                Registration Details
              </Text>
              <Text style={paragraph}>
                <strong>Organization:</strong> {organizationName}
                <br />
                <strong>Reviewed on:</strong> {dayjs(rejectedAt).format('MMMM D, YYYY')}
              </Text>
              <Section style={reasonBox}>
                <Text style={reasonText}>
                  <strong>Reason:</strong>
                  <br />
                  {reason}
                </Text>
              </Section>
            </Section>
            <Hr style={divider} />
            <Section style={infoBox}>
              <Text style={paragraph}>
                <strong>What you can do next:</strong>
              </Text>
              <Text style={paragraph}>
                • Review the reason for rejection carefully
                <br />
                • Address the issues mentioned above
                <br />
                • Prepare the necessary documentation
                <br />
                • Submit a new registration application
              </Text>
            </Section>
            <Text style={paragraph}>
              We understand this may be disappointing, but we're here to help. If you have any
              questions about the decision or need clarification on how to address the concerns
              raised, please don't hesitate to reach out to our support team.
            </Text>
            <Text style={noteText}>
              Contact us at{' '}
              <a href={`mailto:${supportEmail}`} style={{ color: '#3b82f6' }}>
                {supportEmail}
              </a>{' '}
              for assistance with your reapplication.
            </Text>
          </Section>
          <Footer />
        </Container>
      </Body>
    </Html>
  );
};