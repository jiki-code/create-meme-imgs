export const loadImageFromFile = (file: File): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("Invalid file type"))
      return
    }

    const reader = new FileReader();
    reader.onload  = () => {
      const img = new Image()
      img.onload = () => resolve(img)
      img.onerror = reject
      img.src = reader.result as string

    }
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export function getImageSrcFromFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("Invalid file type"));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string); // Trả về chuỗi base64
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function urlToBase64(url: string): Promise<string> {
  const response = await fetch(url);
  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export const calculateStageSize = (img: HTMLImageElement) => {
  const maxWidth = 750
  const maxHeight = 625
  const aspectRatio = img.width / img.height

  let newWidth = maxWidth
  let newHeight = maxWidth / aspectRatio

  if (newHeight > maxHeight) {
    newHeight = maxHeight
    newWidth = maxHeight * aspectRatio
  }

  return { width: newWidth, height: newHeight }
}
