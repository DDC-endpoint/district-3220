/**
 * The District Media Crew. Source: CONTENT.md §12.
 *
 * The old page gave each service a name and an image and nothing more, so
 * there are no service descriptions here. `formOption` is the matching
 * checkbox on the old request form, which names some services differently.
 */
export const MEDIA_CREW = {
  about:
    'Interact District 3220’s own media team. Any club can request it for an event, free or at low cost, and get work to the standard of a professional media outlet.',
  runBy:
    'Managed by the District Director of the Media Crew and staffed by volunteers from participating clubs.',
  logo: '/images/branding/media-crew-white-logo.png',
  pattern: '/images/branding/media-crew-header.jpg',
};

export const MEDIA_SERVICES = [
  { name: 'Photography', formOption: 'Photography', image: '/images/media-crew/media-photography.jpg', alt: 'A photographer holding a camera at sunset' },
  { name: 'Videography', formOption: 'Videography & Aftermovie', image: '/images/media-crew/media-videography.jpg', alt: 'A video camera with a shotgun microphone' },
  { name: 'Live Streaming', formOption: 'Livestream', image: '/images/media-crew/media-livestreaming.jpg', alt: 'A live streaming camera at an event' },
  { name: 'Designing', formOption: 'Graphic Designing', image: '/images/media-crew/media-designing.jpg', alt: 'A designer working at a laptop' },
  { name: 'Compering', formOption: 'Compering', image: '/images/media-crew/media-compering.jpg', alt: 'A compère addressing an audience from a podium' },
  { name: 'Photo Booths', formOption: 'Photobooth', image: '/images/media-crew/media-photo-booths.jpg', alt: 'A hand holding printed photo booth strips' },
] as const;

/** The request form's checkbox options, in the old form's order. */
export const SERVICE_OPTIONS = [
  'Photography',
  'Videography & Aftermovie',
  'Compering',
  'Graphic Designing',
  'Livestream',
  'Photobooth',
];
