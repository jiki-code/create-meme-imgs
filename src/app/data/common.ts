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
  },
  {
    id: "11",
    title: "Surprised Pikachu",
    url: "https://i.imgflip.com/2kbn1e.jpg"
  },
  {
    id: "12",
    title: "Is This a Pigeon?",
    url: "https://i.imgflip.com/1o00in.jpg"
  },
  {
    id: "13",
    title: "One Does Not Simply",
    url: "https://i.imgflip.com/1bij.jpg"
  },
  {
    id: "14",
    title: "Success Kid",
    url: "https://i.imgflip.com/1bhk.jpg"
  },
  {
    id: "15",
    title: "Futurama Fry",
    url: "https://i.imgflip.com/1bgw.jpg"
  }
];



export const waterMark: string = "laoho.tv";

export const colorBackground: string[] = [
  "#c9c9c9",
  "#29b6f7ff",
  "#12e671ff",
  "#f97316",
  "#333",
  "#e4e710ff",
  "#f12525ff",
  "#f851d4ff",
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

interface Option<T extends string | number> {
  label: string;
  value: T;
}


export const languageList: Option<string>[] = [
  { label: "Vietnamese", value: "vi" },
  { label: "English", value: "en" },
];

export const fontList: Option<string>[] = [
  { label: "Arial", value: "Arial, sans-serif" },
  { label: "Times New Roman", value: "'Times New Roman', serif" },
  { label: "Courier New", value: "'Courier New', monospace" },
  { label: "Georgia", value: "Georgia, serif" },
  { label: "Verdana", value: "Verdana, sans-serif" },
  { label: "Impact", value: "Impact, sans-serif" },
  { label: "Comic Sans", value: "'Comic Sans MS', cursive" },
  { label: "Trebuchet MS", value: "'Trebuchet MS', sans-serif" },
  { label: "Arial Black", value: "'Arial Black', sans-serif" },
  { label: "Palatino", value: "Palatino, serif" },
  { label: "Garamond", value: "Garamond, serif" },
  { label: "Bookman", value: "Bookman, serif" },
  { label: "Tahoma", value: "Tahoma, sans-serif" },
  { label: "Franklin Gothic", value: "'Franklin Gothic Medium', sans-serif" },
  { label: "Lucida Sans", value: "'Lucida Sans Unicode', sans-serif" },
  { label: "Century Gothic", value: "'Century Gothic', sans-serif" },
  { label: "Impact Arial Black", value: "'Impact, Arial Black, sans-serif" },

];



