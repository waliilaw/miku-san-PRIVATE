export const themes = {
    pink: {
      background: "#f8d7da",
      text: "#721c24",
      waveColor: [1, 0.5, 0.5] as [number, number, number],
      primary: "#ff69b4",
      gradient: "from-pink-500 to-purple-500",
    },
    green: {
      background: "#d4edda",
      text: "#155724",
      waveColor: [0, 0.5, 0] as [number, number, number],
      primary: "#48bb78",
      gradient: "from-green-400 to-emerald-500",
    },
    blackAndWhite: {
      background: "#ffffff",
      text: "#000000",
      waveColor: [1, 1, 1] as [number, number, number],
      primary: "#000000",
      gradient: "from-gray-600 to-gray-900",
    },
    red: {
      background: "#f8d7da",
      text: "#721c24",
      waveColor: [1, 0, 0] as [number, number, number],
      primary: "#e53e3e",
      gradient: "from-red-500 to-pink-500",
    },
    blue: {
      background: "#cce5ff",
      text: "#004085",
      waveColor: [0, 0, 1] as [number, number, number],
      primary: "#3182ce",
      gradient: "from-blue-500 to-indigo-500",
    },
    cyber: {
      background: "#000000",
      text: "#ffffff",
      waveColor: [0.22, 0.77, 0.73] as [number, number, number],
      primary: "#39c5bb",
      gradient: "from-[#39c5bb] to-pink-400",
    },
    purple: {
      background: "#e9d8fd",
      text: "#44337a",
      waveColor: [0.5, 0, 0.5] as [number, number, number],
      primary: "#9f7aea",
      gradient: "from-purple-500 to-indigo-500",
    },
    orange: {
      background: "#feebc8",
      text: "#7b341e",
      waveColor: [1, 0.5, 0] as [number, number, number],
      primary: "#ed8936",
      gradient: "from-orange-500 to-yellow-500",
    },
  } as const
  
  export type ThemeType = keyof typeof themes
  
  