export const themes = {
  green: {
    background: '#d4edda',
    text: '#155724',
    waveColor: [0, 0.5, 0] as [number, number, number],
    primary: '#00ff00',
  },
  pink: {
    background: '#f8d7da',
    text: '#721c24',
    waveColor: [1, 0.5, 0.5] as [number, number, number],
    primary: '#ff69b4',
  },
  blackAndWhite: {
    background: '#ffffff',
    text: '#000000',
    waveColor: [1, 1, 1] as [number, number, number],
    primary: '#ffffff',
  },
  red: {
    background: '#f8d7da',
    text: '#721c24',
    waveColor: [1, 0, 0] as [number, number, number],
    primary: '#ff0000',
  },
  blue: {
    background: '#cce5ff',
    text: '#004085',
    waveColor: [0, 0, 1] as [number, number, number],
    primary: '#0000ff',
  },
} as const;