import {AuthConfig} from 'angular-oauth2-oidc';

export const authCodeFlowConfig: AuthConfig = {
  issuer: 'http://localhost:8081/realms/FSA',
  redirectUri: window.location.origin + '/',
  clientId: 'fsa-client',
  scope: 'openid',
  showDebugInformation: true,
  requireHttps: false,
};
