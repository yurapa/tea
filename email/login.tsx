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

export const LoginEmail = () => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>Confirm your email address</Preview>
      <Container style={container}>
        <Section style={logoContainer}>
          <Img src={`${SERVER_URL}/images/logo.jpeg`} width="120" height="120" alt="TeaVibe" />
        </Section>
        <Heading style={h1}>Welcome to {APP_NAME}</Heading>
        <Text style={heroText}>
          Your confirmation code is below - enter it in your open browser window and we'll help you get signed in.
        </Text>

        <Section style={codeBox}>
          <Text style={confirmationCodeText}>TeaVibe</Text>
        </Section>

        <Text style={text}>
          If you didn't request this email, there's nothing to worry about, you can safely ignore it.
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
                  alt="Slack"
                  style={socialMediaIcon}
                />
              </Link>
              <Link href="/">
                <Img
                  src={`${SERVER_URL}/static/slack-facebook.png`}
                  width="32"
                  height="32"
                  alt="Slack"
                  style={socialMediaIcon}
                />
              </Link>
              <Link href="/">
                <Img
                  src={`${SERVER_URL}/static/slack-linkedin.png`}
                  width="32"
                  height="32"
                  alt="Slack"
                  style={socialMediaIcon}
                />
              </Link>
            </Column>
          </Row>
        </Section>

        <Section>
          <Link style={footerLink} href="https://slackhq.com" target="_blank" rel="noopener noreferrer">
            Our blog
          </Link>
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <Link style={footerLink} href="https://slack.com/legal" target="_blank" rel="noopener noreferrer">
            Policies
          </Link>
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <Link style={footerLink} href="https://slack.com/help" target="_blank" rel="noopener noreferrer">
            Help center
          </Link>
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <Link
            style={footerLink}
            href="https://slack.com/community"
            target="_blank"
            rel="noopener noreferrer"
            data-auth="NotApplicable"
            data-linkindex="6"
          >
            Slack Community
          </Link>
          <Text style={footerText}>
            &copy; 2025 TeaVibe LTD, a Salesforce company. <br />
            Larnaca, Cyprus <br />
            <br />
            All rights reserved.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default LoginEmail;

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

const codeBox = {
  background: 'rgb(245, 244, 245)',
  borderRadius: '4px',
  marginBottom: '30px',
  padding: '40px 10px',
};

const confirmationCodeText = {
  fontSize: '30px',
  textAlign: 'center' as const,
  verticalAlign: 'middle',
};

const text = {
  color: '#000',
  fontSize: '14px',
  lineHeight: '24px',
};
