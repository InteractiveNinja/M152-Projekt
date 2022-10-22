import { FileTypes } from '../types/FileTypes';

// Max Support File Size for WebAssembly Memory
const MAX_FILE_BYTES = 2147483648;

export function isValideFile(file: File): boolean {
	const fileExt = getFileExtension(file);
	if (!fileExt) {
		return false;
	}

	return fileExt in FileTypes;
}

export function getFileExtension(file: File) {
	return file.name.split('.').pop();
}

export function getFileTypeExtension(fileType: FileTypes) {
	return fileType.split('/').pop();
}

export function isFilesizeAccepted(file: File) {
	return file.size <= MAX_FILE_BYTES;
}
