import {
  Heading,
  Img,
  Section,
} from '@react-email/components';


const logoSection = {
  paddingBottom: '20px',
  textAlign: 'center' as const,
};

const logo = {
  margin: '0 auto',
};

const headerSection = {
  textAlign: 'center' as const,
  paddingBottom: '30px',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0',
  padding: '0',
};

interface HeaderProps {
  title?: string;
  logoUrl?: string;
}

export const Header = ({ 
  title = 'VNC Soft', 
  logoUrl = 'https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png' 
}: HeaderProps) => {
  return (
    <>
      <Section style={logoSection}>
        <Img
          src={logoUrl}
          width="50"
          height="50"
          alt={title}
          style={logo}
        />
      </Section>
      <Section style={headerSection}>
        <Heading style={h1}>{title}</Heading>
      </Section>
    </>
  );
};

