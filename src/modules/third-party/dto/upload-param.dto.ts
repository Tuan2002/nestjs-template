import { FileType } from "@/base/enums";

export type UploadParamDto = {
  fileKey: string;
  fileType: FileType;
  fileSize: number;
};