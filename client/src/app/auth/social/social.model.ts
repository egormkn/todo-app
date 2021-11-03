import { IconDefinition, faFacebookF, faGoogle, faVk } from '@fortawesome/free-brands-svg-icons';

export type SocialServiceType = 'facebook' | 'vkontakte' | 'google';

export interface SocialService {
  type: SocialServiceType;
  title: string;
  icon: IconDefinition;
  isEnabled: boolean;
}

export const services: SocialService[] = [
  {
    type: 'facebook',
    title: 'Facebook',
    icon: faFacebookF,
    isEnabled: false,
  },
  {
    type: 'vkontakte',
    title: 'Vkontakte',
    icon: faVk,
    isEnabled: false,
  },
  {
    type: 'google',
    title: 'Google',
    icon: faGoogle,
    isEnabled: true,
  },
];
