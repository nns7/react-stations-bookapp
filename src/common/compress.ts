import imageCompression from "browser-image-compression";

export type compressImageType = {
  maxSizeMB: number;
  useWebWorker: boolean;
  initialQuality: number;
};

export const compressImage = async (
  file: File,
  options: compressImageType = {
    maxSizeMB: 1,
    useWebWorker: true,
    initialQuality: 0.85,
  }
): Promise<File> => {
  try {
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  } catch (err) {
    return Promise.reject(new Error(`画像の圧縮に失敗しました。 ${err}`));
  }
};
