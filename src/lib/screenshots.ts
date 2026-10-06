import macReleases from '../assets/screenshots/mac-releases.jpg';
import macAi from '../assets/screenshots/mac-ai.jpg';
import reviews from '../assets/reviews.png';
import experiments from '../assets/experiments.png';

/** Homepage screenshot gallery; also listed as `screenshot` in the SoftwareApplication JSON-LD. */
export const SCREENSHOTS = [
  {
    image: macReleases,
    alt: 'LaunchBuddy on Mac showing the release board for version 7.2.0, with backlog tasks, release date, status, changelog, and a Push to ASC button',
    kicker: 'Release planning',
    title: 'Every version gets its own board.',
    caption:
      'Tasks for the release sit next to its date, status, and changelog. With Pro, push the changelog to App Store Connect once it reads right.',
    pro: false,
  },
  {
    image: reviews,
    alt: 'LaunchBuddy App Store review inbox on Mac listing customer reviews with star ratings, countries, dates, and Replied badges',
    kicker: 'App Store reviews',
    title: 'Every review in one inbox.',
    caption:
      'Ratings, countries, and reply status for each app. Draft a reply with AI, edit it, and send it after you approve.',
    pro: true,
  },
  {
    image: macAi,
    alt: 'LaunchBuddy AI on Mac with recommended playbooks for preparing a release, triaging feedback and reviews, and analyzing App Store performance',
    kicker: 'LaunchBuddy AI',
    title: 'Playbooks that ask before they change anything.',
    caption:
      'Prepare a release, triage feedback, or read your App Store analytics. Each proposed change waits in an approval queue.',
    pro: true,
  },
  {
    image: experiments,
    alt: 'ASO experiment in LaunchBuddy comparing the baseline and variant App Store title, subtitle, and keyword field',
    kicker: 'ASO experiments',
    title: 'Write down what you changed on the App Store.',
    caption:
      'Log the baseline and variant title, subtitle, and keywords, then get a reminder to check how the experiment did.',
    pro: true,
  },
];
