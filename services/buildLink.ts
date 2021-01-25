import dynamicLinks from '@react-native-firebase/dynamic-links';

export async function buildLink(name: string) {
  const link = await dynamicLinks().buildLink({
    link: `https://www.furnishmypad.com/${name}`,
    // domainUriPrefix is created in your Firebase console
    domainUriPrefix: `https://links.furnishmypad.com/test/${name}`,
    // optional setup which updates Firebase analytics campaign
    // "banner". This also needs setting up before hand
    analytics: {
      campaign: 'banner',
    },
  });

  return link;
}

