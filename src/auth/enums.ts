export class User {
    id: number;
    isAdmin: boolean;
}

export class Article {
    id: number;
    isPublished: boolean;
    authorId: number;
}


export enum Action {
    Manage = 'manage',
    Create = 'create',
    Read = 'read',
    Update = 'update',
    Delete = 'delete',
}


export enum Permission {
    CREATE_CAT = 'CREATE_CAT',
    UPDATE_CAT = 'UPDATE_CAT',
    DELETE_CAT = 'DELETE_CAT',
  }
  