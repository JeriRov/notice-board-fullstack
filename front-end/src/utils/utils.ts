export type EncodedFile = string | ArrayBuffer | null;
export const fileToBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;
      resolve(base64String);
    };

    reader.onerror = error => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};

export const queryBuilder = (query: string, params: Record<string, string>) => {
  const url = new URL(query);
  Object.keys(params).forEach(key => {
    if (url.searchParams.has(key)) {
      url.searchParams.set(key, params[key]);
    } else {
      url.searchParams.append(key, params[key]);
    }
  });

  return `${url.searchParams.toString()}`;
};
