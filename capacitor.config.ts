import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'kyc-dashboard',
   webDir: 'out',   // this MUST match next export folder
  server: {
    androidScheme: 'https'
  }
};

export default config;
