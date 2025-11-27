
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
  section,
  warningText
} from '../styles/common';

const successBox = {
  backgroundColor: '#f0fdf4',
  border: '2px solid #22c55e',
  borderRadius: '8px',
  padding: '20px',
  margin: '20px 0',
};

const successTitle = {
  color: '#166534',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 15px 0',
};

const infoRow = {
  margin: '10px 0',
};

const infoLabel = {
  color: '#666',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0',
};

const infoValue = {
  color: '#333',
  fontSize: '16px',
  fontWeight: 'normal',
  margin: '5px 0 0 0',
  fontFamily: 'monospace',
  backgroundColor: '#f8f9fa',
  padding: '8px 12px',
  borderRadius: '4px',
  border: '1px solid #e9ecef',
};

interface OrgApprovedEmailProps {
  organizationName: string;
  ownerName: string;
  approvedAt: Date;
  account: string;
  password: string;
}

export const OrganizationApprovedEmail = ({
  organizationName,
  ownerName,
  approvedAt,
  account,
  password,
}: OrgApprovedEmailProps) => {
  const previewText = `Your organization has been approved!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Header title="Organization Approved" />
          <Section style={section}>
            <Text style={greeting}>
              Hi {ownerName},
            </Text>
            <Text style={paragraph}>
              Great news! Your organization registration has been approved.
            </Text>
            <Section style={successBox}>
              <Text style={successTitle}>
                Welcome to CertChain!
              </Text>
              <Text style={paragraph}>
                <strong>Organization:</strong> {organizationName}
                <br />
                <strong>Approved on:</strong> {dayjs(approvedAt).format('MMMM D, YYYY')}
              </Text>
            </Section>
            <Hr style={divider} />
            <Text style={paragraph}>
              <strong>Your Account Credentials</strong>
            </Text>
            <Section style={infoRow}>
              <Text style={infoLabel}>Account / Email:</Text>
              <Text style={infoValue}>{account}</Text>
            </Section>
            <Section style={infoRow}>
              <Text style={infoLabel}>Temporary Password:</Text>
              <Text style={infoValue}>{password}</Text>
            </Section>
            {/* <Section style={buttonContainer}>
              <Button href={loginUrl} style={loginButton}>
                Login Now
              </Button>
            </Section> */}
            <Text style={warningText}>
              <strong>Important Security Notice:</strong> Please change your password immediately
              after your first login. This temporary password should not be shared with anyone.
            </Text>
            <Hr style={divider} />
            <Text style={paragraph}>
              <strong>Getting Started:</strong>
            </Text>
            <Text style={paragraph}>
              • Log in to your account using the credentials above
              <br />
              • Complete your organization profile
              <br />
              • Set up your team members
              <br />
              • Start issuing certificates
            </Text>
            <Text style={noteText}>
              If you have any questions or need assistance getting started, our support team is
              here to help!
            </Text>
          </Section>
          <Footer />
        </Container>
      </Body>
    </Html>
  );
};