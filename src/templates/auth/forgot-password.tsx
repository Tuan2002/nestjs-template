import {
  Body,
  Button,
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
  buttonContainer,
  codeContainer,
  codeText,
  container,
  divider,
  greeting,
  main,
  noteText,
  paragraph,
  section,
  warningText
} from '../styles/common';

const resetCode = {
  color: '#dc2626',
  fontSize: '24px',
  fontWeight: 'bold',
  letterSpacing: '4px',
  margin: '0',
  fontFamily: 'monospace',
};

const resetButton = {
  backgroundColor: '#dc2626',
  borderRadius: '5px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '200px',
  padding: '12px 0',
  margin: '0 auto',
};

interface ForgotPasswordEmailProps {
  username: string;
  magicLink: string;
  code?: string;
}

export const ForgotPasswordEmail = ({
  username,
  magicLink,
  code,
}: ForgotPasswordEmailProps) => {
  const previewText = `Reset your CertChain account password`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Header title="Reset Account Password" />
          <Section style={section}>
            <Text style={greeting}>
              Hi {username},
            </Text>
            <Text style={paragraph}>
              We received a request to reset the password for your CertChain account.
              If you made this request, click the button below to create a new password.
            </Text>
            <Section style={buttonContainer}>
              <Button href={magicLink} style={resetButton}>
                Reset Password
              </Button>
            </Section>
            <Text style={paragraph}>
              If the button above doesn't work, you can also copy and paste the following link
              into your browser:
            </Text>
            <Text style={codeText}>
              {magicLink}
            </Text>
            {code && (
              <>
                <Hr style={divider} />
                <Text style={paragraph}>
                  You can also use this code:
                </Text>
                <Section style={codeContainer}>
                  <Text style={resetCode}>
                    {code}
                  </Text>
                </Section>
              </>
            )}
            <Text style={warningText}>
              This password reset link will expire in 30 minutes
              for security reasons. If you didn't request a password reset, please ignore this email
              and your password will remain unchanged.
            </Text>
            <Text style={noteText}>
              If you continue to have problems, please contact our support team for assistance.
            </Text>
          </Section>
          <Footer />
        </Container>
      </Body>
    </Html>
  );
};
