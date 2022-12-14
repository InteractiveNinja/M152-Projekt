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
	return file.name.toLowerCase().split('.').pop();
}

export function getFileTypeExtension(fileType: FileTypes) {
	return fileType.toLowerCase().split('/').pop();
}

export function isFilesizeAccepted(file: File) {
	return file.size <= MAX_FILE_BYTES;
}

export function isFileOfType(file: File, fileType: FileTypes) {
	return getFileExtension(file) == getFileTypeExtension(fileType);
}

export function isAudioType(file: FileTypes) {
	return (
		file === FileTypes.flac ||
		file === FileTypes.mp3 ||
		file === FileTypes.ogg ||
		file === FileTypes.wav ||
		file == FileTypes.aac
	);
}

export function getFileTypeFromFile(file: File): FileTypes {
	const fileExtension = getFileExtension(file) ?? '';
	// Wie man aus einem per Enum key den Value rausholt der immer noch getyped ist:
	// https://stackoverflow.com/a/66117678
	return FileTypes[fileExtension as keyof typeof FileTypes];
}
