import { FileTypes } from '../types/FileTypes';

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
