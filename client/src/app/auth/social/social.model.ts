import { IconDefinition, faFacebookF, faGoogle, faVk } from '@fortawesome/free-brands-svg-icons';

export interface SocialService {
  slug: string;
  title: string;
  icon: IconDefinition;
  isEnabled: boolean;
}

export const socialServices: SocialService[] = [
  {
    slug: 'facebook',
    title: 'Facebook',
    icon: faFacebookF,
    isEnabled: false,
  },
  {
    slug: 'vk',
    title: 'Vkontakte',
    icon: faVk,
    isEnabled: false,
  },
  {
    slug: 'google',
    title: 'Google',
    icon: faGoogle,
    isEnabled: false,
  },
];
