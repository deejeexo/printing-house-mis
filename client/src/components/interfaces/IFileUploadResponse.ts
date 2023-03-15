export interface IFileUploadReponse {
  success: boolean;
  status: number;
  id: string;
  key: string;
  name: string;
  link: string;
  expires: string;
  expiry: string;
  downloads: number;
  maxdownloads: number;
  autoDelete: boolean;
  mimeType: string;
  created: string;
  modified: string;
}
