// Off-duty — the personality layer. Present, but never louder than the work.

export const interests = [
  {
    label: 'JRPGs & tabletop',
    text:
      'Long-form systems with real consequences. The Dungeon Master Campaign Suite exists because ' +
      'I got tired of running a campaign out of six browser tabs.',
  },
  {
    label: 'Anime & fantasy',
    text:
      'Worldbuilding done well is just systems design with better art direction — internal rules, ' +
      'consistent consequences, and a story that respects the audience.',
  },
  {
    label: 'Building things',
    text:
      'Most of what I know came from starting a project that was slightly too hard and refusing to ' +
      'abandon it halfway.',
  },
]

// Revealed by the hidden input sequence. Deliberately playful — it is an easter
// egg, not a credential, and it is labeled as one.
export const characterSheet = {
  class: 'Full-Stack Developer / Operations Lead',
  origin: 'United States Marine Corps',
  alignment: 'Lawful Constructive',
  stats: [
    { label: 'Discipline', value: 18 },
    { label: 'Communication', value: 17 },
    { label: 'Systems Thinking', value: 16 },
    { label: 'Debugging', value: 15 },
    { label: 'Patience', value: 15 },
    { label: 'Sleep', value: 8 },
  ],
  passives: [
    'Advantage on incident response rolls',
    'Immune to fear (deployment day)',
    'Cannot be surprised by a 403',
  ],
}
