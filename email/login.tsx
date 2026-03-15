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

export const LoginEmail = () => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>You are now logged in to {APP_NAME}</Preview>
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
          <Heading style={h1}>You Are Logged In</Heading>
          <Text style={heroText}>
            You have successfully logged in to {APP_NAME} from a known device.
          </Text>

          <Section style={noticeBox}>
            <Text style={noticeText}>{APP_NAME}</Text>
            <Text style={noticeSubText}>Successful login detected</Text>
          </Section>

          <Text style={text}>
            If you didn&apos;t request this email, there&apos;s nothing to worry about — you can safely ignore it.
            If you believe your account may be compromised, please contact our support team immediately.
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

export default LoginEmail;

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
  textAlign: 'center' as const,
};

const heroText = {
  color: DARK_GREEN,
  fontSize: '16px',
  lineHeight: '26px',
  textAlign: 'center' as const,
  marginBottom: '28px',
};

const noticeBox = {
  background: BEIGE,
  borderLeft: `4px solid ${GOLD}`,
  borderRadius: '4px',
  marginBottom: '28px',
  padding: '28px 24px',
  textAlign: 'center' as const,
};

const noticeText = {
  fontSize: '24px',
  fontWeight: '700' as const,
  textAlign: 'center' as const,
  color: DARK_GREEN,
  margin: '0 0 6px',
  letterSpacing: '2px',
};

const noticeSubText = {
  fontSize: '13px',
  textAlign: 'center' as const,
  color: TEXT_MUTED,
  margin: '0',
};

const text = {
  color: TEXT_MUTED,
  fontSize: '14px',
  lineHeight: '22px',
  margin: '0',
  textAlign: 'center' as const,
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
