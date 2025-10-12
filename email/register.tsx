import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';

import { APP_NAME, SERVER_URL } from '@/lib/constants';

interface SignupWelcomeEmailProps {
  name: string;
}

export const RegisterWelcomeEmail = ({ name }: SignupWelcomeEmailProps) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>Welcome to {APP_NAME}! Your account has been created successfully</Preview>
      <Container style={container}>
        <Section style={logoContainer}>
          <Img src={`${SERVER_URL}/images/logo.jpeg`} width="120" height="120" alt="TeaVibe" />
        </Section>
        <Heading style={h1}>Welcome to {APP_NAME}, {name}!</Heading>
        <Text style={heroText}>
          Thank you for joining {APP_NAME}! Your account has been successfully created and you&apos;re all set to
          explore our premium tea collection.
        </Text>

        <Section style={benefitsBox}>
          <Text style={benefitsTitle}>What&apos;s next?</Text>
          <Text style={benefitItem}>🍵 Browse our exclusive tea collection</Text>
          <Text style={benefitItem}>🎁 Enjoy special member-only discounts</Text>
          <Text style={benefitItem}>📦 Track your orders in real-time</Text>
          <Text style={benefitItem}>⭐ Share your tea experiences with reviews</Text>
        </Section>

        <Text style={text}>
          If you have any questions, our support team is always here to help. Happy tea shopping!
        </Text>

        <Section>
          <Row style={footerLogos}>
            <Column style={{ width: '66%' }}>
              <Img src={`${SERVER_URL}/images/logo.jpeg`} width="80" height="80" alt="TeaVibe" />
            </Column>
            <Column align="right">
              <Link href="/">
                <Img
                  src={`${SERVER_URL}/static/slack-twitter.png`}
                  width="32"
                  height="32"
                  alt="Twitter"
                  style={socialMediaIcon}
                />
              </Link>
              <Link href="/">
                <Img
                  src={`${SERVER_URL}/static/slack-facebook.png`}
                  width="32"
                  height="32"
                  alt="Facebook"
                  style={socialMediaIcon}
                />
              </Link>
              <Link href="/">
                <Img
                  src={`${SERVER_URL}/static/slack-linkedin.png`}
                  width="32"
                  height="32"
                  alt="LinkedIn"
                  style={socialMediaIcon}
                />
              </Link>
            </Column>
          </Row>
        </Section>

        <Section>
          <Link style={footerLink} href={`${SERVER_URL}/about`} target="_blank" rel="noopener noreferrer">
            About Us
          </Link>
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <Link style={footerLink} href={`${SERVER_URL}/contact`} target="_blank" rel="noopener noreferrer">
            Contact
          </Link>
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <Link style={footerLink} href={`${SERVER_URL}/help`} target="_blank" rel="noopener noreferrer">
            Help Center
          </Link>
          <Text style={footerText}>
            &copy; 2025 {APP_NAME}, a Premium Tea Company. <br />
            Larnaca, Cyprus <br />
            <br />
            All rights reserved.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default RegisterWelcomeEmail;

const footerText = {
  fontSize: '12px',
  color: '#b7b7b7',
  lineHeight: '15px',
  textAlign: 'left' as const,
  marginBottom: '50px',
};

const footerLink = {
  color: '#b7b7b7',
  textDecoration: 'underline',
};

const footerLogos = {
  marginBottom: '32px',
  paddingLeft: '8px',
  paddingRight: '8px',
};

const socialMediaIcon = {
  display: 'inline',
  marginLeft: '8px',
};

const main = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
};

const container = {
  margin: '0 auto',
  padding: '0px 20px',
};

const logoContainer = {
  marginTop: '32px',
};

const h1 = {
  color: '#1d1c1d',
  fontSize: '36px',
  fontWeight: '700',
  margin: '30px 0',
  padding: '0',
  lineHeight: '42px',
};

const heroText = {
  fontSize: '20px',
  lineHeight: '28px',
  marginBottom: '30px',
};

const benefitsBox = {
  background: 'rgb(245, 244, 245)',
  borderRadius: '4px',
  marginBottom: '30px',
  padding: '30px 20px',
};

const benefitsTitle = {
  fontSize: '20px',
  fontWeight: '600',
  marginBottom: '16px',
  color: '#1d1c1d',
};

const benefitItem = {
  fontSize: '16px',
  lineHeight: '28px',
  marginBottom: '8px',
  color: '#000',
};

const text = {
  color: '#000',
  fontSize: '14px',
  lineHeight: '24px',
};
