/*
 * Maximum file sizes for different types of files in bytes.
 * These values are used to validate file uploads in the application.
 *
 * Note: The sizes are defined as constants to ensure consistency across the application.
 *
 * - MAX_IMAGE_SIZE: Maximum size for image files (e.g., JPEG, PNG).
 * - MAX_VIDEO_SIZE: Maximum size for video files (e.g., MP4, AVI).
 * - MAX_AUDIO_SIZE: Maximum size for audio files (e.g., MP3, WAV).
 * - MAX_DOCUMENT_SIZE: Maximum size for document files (e.g., PDF, DOCX).
 * - MAX_ARCHIVE_SIZE: Maximum size for archive files (e.g., ZIP, RAR).
 * - MAX_OTHER_SIZE: Maximum size for other types of files.
 */
export enum FileTypeSize {
  MAX_IMAGE_SIZE = 10 * 1024 * 1024, // 10 MB
  MAX_DOCUMENT_SIZE = 20 * 1024 * 1024, // 20 MB
  MAX_VIDEO_SIZE = 300 * 1024 * 1024, // 300 MB
  MAX_AUDIO_SIZE = 100 * 1024 * 1024, // 100 MB
  MAX_ARCHIVE_SIZE = 500 * 1024 * 1024, // 500 MB
  MAX_OTHER_SIZE = 100 * 1024 * 1024, // 100 MB
}
