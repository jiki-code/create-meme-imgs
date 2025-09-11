export interface Meme {
  id: string;
  title: string;
  url: string;
}

export const memes: Meme[] = [
  {
    id: "1",
    title: "Drake Hotline Bling",
    url: "https://i.imgflip.com/30b1gx.jpg"
  },
  {
    id: "2",
    title: "Distracted Boyfriend",
    url: "https://i.imgflip.com/1ur9b0.jpg"
  },
  {
    id: "3",
    title: "Two Buttons",
    url: "https://i.imgflip.com/1g8my4.jpg"
  },
  {
    id: "4",
    title: "Change My Mind",
    url: "https://i.imgflip.com/24y43o.jpg"
  },
  {
    id: "5",
    title: "UNO Draw 25",
    url: "https://i.imgflip.com/3lmzyx.jpg"
  },
  {
    id: "6",
    title: "Expanding Brain",
    url: "https://i.imgflip.com/1jwhww.jpg"
  },
  {
    id: "7",
    title: "Left Exit 12 Off Ramp",
    url: "https://i.imgflip.com/22bdq6.jpg"
  },
  {
    id: "8",
    title: "Batman Slapping Robin",
    url: "https://i.imgflip.com/9ehk.jpg"
  },
  {
    id: "9",
    title: "Running Away Balloon",
    url: "https://i.imgflip.com/261o3j.jpg"
  },
  {
    id: "10",
    title: "Mocking Spongebob",
    url: "https://i.imgflip.com/1otk96.jpg"
  }
]

export const waterMark: string = "laoho.tv";

export const colorBackground: string[] = [
  "#c9c9c9",
  "#539fc2ff",
  "#10b981",
  "#f97316",
  "#be895dff",
  "#333",
  "#eef079ff",
];

export const acceptedImageTypes: string[] = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/svg+xml",
  "image/bmp",
  "image/tiff",
  "image/x-icon",
];

export const languageList: any = [
  { label: "Vietnamese", value: "vi" },
  { label: "English", value: "en" },
];

