import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
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
        {/* Header */}
        <Section style={header}>
          <Text style={logoText}>
            <span style={logoTea}>TEA</span>
            <span style={logoVibe}>VIBE</span>
          </Text>
        </Section>

        {/* Body */}
        <Section style={bodySection}>
          <Heading style={h1}>Welcome to {APP_NAME}, {name}!</Heading>
          <Text style={heroText}>
            Thank you for joining {APP_NAME}! Your account has been successfully created and you&apos;re
            all set to explore our premium tea collection.
          </Text>

          <Section style={benefitsBox}>
            <Text style={benefitsTitle}>What&apos;s next?</Text>
            <Text style={benefitItem}>&#127861; Browse our exclusive tea collection</Text>
            <Text style={benefitItem}>&#127873; Enjoy special member-only discounts</Text>
            <Text style={benefitItem}>&#128230; Track your orders in real-time</Text>
            <Text style={benefitItem}>&#11088; Share your tea experiences with reviews</Text>
          </Section>

          <Text style={text}>
            If you have any questions, our support team is always here to help. Happy tea shopping!
          </Text>
        </Section>

        {/* Footer */}
        <Section style={footer}>
          <Row>
            <Column style={{ width: '50%' }}>
              <Text style={footerLogoText}>
                <span style={footerLogoTea}>TEA</span>
                <span style={footerLogoVibe}>VIBE</span>
              </Text>
            </Column>
            <Column align="right" style={{ width: '50%', verticalAlign: 'middle' }}>
              <Text style={footerLinks}>
                <a href={`${SERVER_URL}/about`} style={footerLink}>About Us</a>
                {'  |  '}
                <a href={`${SERVER_URL}/contact`} style={footerLink}>Contact</a>
                {'  |  '}
                <a href={`${SERVER_URL}/help`} style={footerLink}>Help Center</a>
              </Text>
            </Column>
          </Row>
          <Text style={footerText}>
            &copy; 2025 {APP_NAME}, a Premium Tea Company. &nbsp;Larnaca, Cyprus &nbsp;&#183;&nbsp; All rights reserved.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default RegisterWelcomeEmail;

// Brand colors
const DARK_GREEN = '#1e3a2f';
const GOLD = '#c2a24e';
const BEIGE = '#f3ede4';
const BORDER = '#ddd5c8';
const TEXT_MUTED = '#6b7280';
const FONT_STACK = "Arial, Helvetica, sans-serif";

const main = {
  backgroundColor: BEIGE,
  margin: '0 auto',
  fontFamily: FONT_STACK,
};

const container = {
  margin: '0 auto',
  maxWidth: '600px',
  backgroundColor: '#ffffff',
  border: `1px solid ${BORDER}`,
};

const header = {
  backgroundColor: DARK_GREEN,
  padding: '28px 32px',
  textAlign: 'center' as const,
};

const logoText = {
  margin: '0',
  fontSize: '28px',
  fontWeight: '700' as const,
  letterSpacing: '3px',
  textAlign: 'center' as const,
};

const logoTea = {
  color: '#ffffff',
};

const logoVibe = {
  color: GOLD,
};

const bodySection = {
  padding: '36px 40px 24px',
};

const h1 = {
  color: DARK_GREEN,
  fontSize: '26px',
  fontWeight: '700' as const,
  margin: '0 0 16px',
  padding: '0',
  lineHeight: '34px',
};

const heroText = {
  color: DARK_GREEN,
  fontSize: '16px',
  lineHeight: '26px',
  marginBottom: '28px',
};

const benefitsBox = {
  background: BEIGE,
  borderLeft: `4px solid ${GOLD}`,
  borderRadius: '4px',
  marginBottom: '28px',
  padding: '24px 24px 8px',
};

const benefitsTitle = {
  fontSize: '18px',
  fontWeight: '600' as const,
  marginBottom: '12px',
  color: DARK_GREEN,
};

const benefitItem = {
  fontSize: '15px',
  lineHeight: '26px',
  marginBottom: '6px',
  color: DARK_GREEN,
};

const text = {
  color: TEXT_MUTED,
  fontSize: '14px',
  lineHeight: '22px',
  margin: '0',
};

const footer = {
  backgroundColor: DARK_GREEN,
  padding: '24px 32px 16px',
};

const footerLogoText = {
  margin: '0 0 4px',
  fontSize: '18px',
  fontWeight: '700' as const,
  letterSpacing: '2px',
};

const footerLogoTea = {
  color: '#ffffff',
};

const footerLogoVibe = {
  color: GOLD,
};

const footerLinks = {
  margin: '0',
  fontSize: '12px',
  textAlign: 'right' as const,
};

const footerLink = {
  color: GOLD,
  textDecoration: 'none',
};

const footerText = {
  fontSize: '11px',
  color: '#a8b8af',
  lineHeight: '18px',
  textAlign: 'left' as const,
  margin: '12px 0 0',
  borderTop: `1px solid rgba(255,255,255,0.15)`,
  paddingTop: '12px',
};
