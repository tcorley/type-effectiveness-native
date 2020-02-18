export type Result = {
  title: string;
  path: string;
  multiplier: number;
};

const results: Result[] = [
  {
    title: 'Super Weak to',
    path: 'superWeak',
    multiplier: 4
  },
  {
    title: 'Weak to',
    path: 'weak',
    multiplier: 2
  },
  {
    title: 'Immune to',
    path: 'immune',
    multiplier: 0
  },
  {
    title: 'Resistant against',
    path: 'resistant',
    multiplier: 0.5
  },
  {
    title: 'Super Resistant against',
    path: 'superResistant',
    multiplier: 0.25
  },
  {
    title: 'Damaged Normally by',
    path: 'normal',
    multiplier: 1
  }
];

export default results;
