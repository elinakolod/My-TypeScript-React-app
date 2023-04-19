export interface Course extends newCourse {
	id: string;
	creationDate: string;
}

export interface newCourse {
	title: string;
	description: string;
	duration: number;
	authors: string[];
}

export interface Author extends newAuthor {
	id: string;
}

export interface newAuthor {
	name: string;
}
