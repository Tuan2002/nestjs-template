import {
  Hr,
  Link,
  Section,
  Text,
} from '@react-email/components';

interface FooterProps {
  companyName?: string;
  supportEmail?: string;
  unsubscribeUrl?: string;
}

export const Footer = ({ 
  companyName = 'VNC Soft',
  supportEmail = 'support@vncsoft.com',
  unsubscribeUrl 
}: FooterProps) => {
  return (
    <>
      <Hr style={hr} />
      <Section style={footerSection}>
        <Text style={footerText}>
          This email was sent by {companyName}. If you have any questions, please contact us at{' '}
          <Link href={`mailto:${supportEmail}`} style={link}>
            {supportEmail}
          </Link>
        </Text>
        {unsubscribeUrl && (
          <Text style={footerText}>
            Don't want to receive these emails? You can{' '}
            <Link href={unsubscribeUrl} style={link}>
              unsubscribe here
            </Link>
          </Text>
        )}
        <Text style={copyrightText}>
          © {new Date().getFullYear()} {companyName}. All rights reserved.
        </Text>
      </Section>
    </>
  );
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const footerSection = {
  paddingTop: '20px',
  textAlign: 'center' as const,
};

const footerText = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0 0 10px 0',
};

const copyrightText = {
  color: '#9ca3af',
  fontSize: '12px',
  lineHeight: '16px',
  margin: '10px 0 0 0',
};

const link = {
  color: '#4338ca',
  textDecoration: 'underline',
};
